import * as MS3Interface from '../../../ms3/ms3-v1-api-interface';
import * as OAS30Interface from '../../../oas/oas-30-api-interface';
import schemaToDataType from '../../schemas-to-dataTypes';
import securitySchemasToMS3 from './security-schemas-to-ms3';
import AproVersion from '../../../apro_version';
import { reduce, filter, find as _find, each, map, difference } from 'lodash';
import { v4 } from 'uuid';

class MS3toOAS30toMS3 {
  ms3API: MS3Interface.API = {
    entityTypeName: 'api',
    apro_version: AproVersion,
    settings: {
      title: '',
      version: '',
      baseUri: ''
    },
    examples: [],
    dataTypes: []
  };

  constructor(private oasAPI: OAS30Interface.API, private loadedSchemas: any[], private loadedExamples: any[]) {}

  static create(oasAPI: OAS30Interface.API, loadedSchemas: any[], loadedExamples: any[]) {
    return new MS3toOAS30toMS3(oasAPI, loadedSchemas, loadedExamples);
  }

  convert() {
    this.ms3API.settings = this.convertSettings();
    if (this.oasAPI.components && this.oasAPI.components.securitySchemes) {
      this.ms3API.securitySchemes = securitySchemasToMS3(this.oasAPI.components.securitySchemes);
    }
    this.ms3API.resources = this.convertPaths();

    if (this.oasAPI.security) {
      this.ms3API.settings.securedBy = this.getSecuredBy(this.oasAPI.security);
    }

    return this.ms3API;
  }

  getSecuredBy(securitySchemas: OAS30Interface.SecurityRequirement[]): string[] {
    return map(securitySchemas, (schema) => {
      const foundSchema = _find(this.ms3API.securitySchemes, {name: Object.keys(schema)[0]});
      return foundSchema.__id;
    });
  }

  convertSettings() {
    const info = this.oasAPI.info;

    const settings: MS3Interface.Settings = {
      title: info.title,
      baseUri: 'http://base.uri',
      version: info.version
    };

    if (this.oasAPI.servers && this.oasAPI.servers.length && this.oasAPI.servers[0].url) {
      settings.baseUri = this.oasAPI.servers[0].url;
    }

    if (info.description) settings.description = info.description;

    return settings;
  }

  convertOperations(operations: OAS30Interface.PathItemObject | any): MS3Interface.Method[] {
    const methodsKeys = ['get', 'post', 'put', 'delete', 'options', 'head', 'patch'];
    return methodsKeys.reduce((methodsArray: MS3Interface.Method[], methodKey: string) => {
      const operation: OAS30Interface.Operation = operations[methodKey];
      if (!operation) {
        methodsArray.push({
          active: false,
          name: methodKey.toUpperCase(),
          description: '',
          queryParameters: [],
          headers: [],
          selectedTraits: [],
          responses: []
        });
        return methodsArray;
      }
      const method: MS3Interface.Method = this.convertOperation(operation, methodKey);
      methodsArray.push(method);
      return methodsArray;
    }, []);
  }

  convertOperation(operation: OAS30Interface.Operation, name: string): MS3Interface.Method {
    const method: MS3Interface.Method = {
      name: name.toUpperCase(),
      active: true
    };

    if (operation.security) method.securedBy = this.getSecuredBy(operation.security);
    if (operation.description) method.description = operation.description;
    const parameters: any = this.getParameters(operation.parameters);

    if (parameters.queryParameters) method.queryParameters = parameters.queryParameters;
    if (parameters.headers) method.headers = parameters.headers;
    if (operation.requestBody) method.body = this.convertRequestBody(<OAS30Interface.RequestBodyObject>operation.requestBody);
    if (operation.responses) method.responses = this.convertResponses(<OAS30Interface.ResponsesObject>operation.responses);

    return method;
  }

  convertRequestBody(requestBody: OAS30Interface.RequestBodyObject): MS3Interface.Body[] {
    return reduce(requestBody.content, (resultArray: any, value: any, key: string) => {
      const convertedBody: MS3Interface.Body = {
         contentType: <MS3Interface.contentType>key
      };

      if (value.schema && value.schema.$ref) {
        const splitArr: string[] = value.schema.$ref.split('/');
        const name: string = splitArr.pop();
        convertedBody.type = this.getRefId(name, 'schemas');
      } else if (value.schema) {
        convertedBody.type = v4();
        value.schema.__id = convertedBody.type;
        this.ms3API.dataTypes.push(value.schema);
      }

      if (value.examples && value.examples.$ref) {
        const splitArr: string[] = value.examples.$ref.split('/');
        const name: string = splitArr.pop();
        convertedBody.selectedExamples.push(this.getRefId(name, 'examples'));
      } else if (value.examples) {
        convertedBody.selectedExamples = this.convertExamples(<OAS30Interface.Example>value.examples);
      }

      resultArray.push(convertedBody);
      return resultArray;
    }, []);
  }

/**
 * Get by $ref new or existing id of the included entity in resulting Ms3 API
 */
  getRefId(name: string, entity: 'schemas' | 'examples') {
    let ID = '';

    if (!this.oasAPI.components || !this.oasAPI.components[entity])
      throw new Error(`Missing ${name} in ${entity} components`);

    this.oasAPI.components[entity] = reduce(this.oasAPI.components[entity], (result: any, value: any, key: string) => {
      if (key == name) {
        if (!value.__id) {
          value.__id = v4();
        }
        ID = value.__id;
        if (entity == 'schemas') this.getSchemas(value, key);
        if (entity == 'examples') this.getExamples(value, key);
      }
      result[key] = value;
      return result;
    }, {});
    return ID;
  }

  /**
   * Modify given entity and push it to respective collection of resources(dataTypes, examples) on resulting Ms3 API
   */
  getSchemas(data: any, name: string) {
    const schema: any = {};
    data.name = name;
    if (_find(this.ms3API.dataTypes, {name})) return;
    if (data.$ref) {
      const foundContent = _find(this.loadedSchemas, {name}).content;
      const foundSchema = JSON.parse(foundContent)[name];
      delete foundSchema.title;
      foundSchema.name = name;
      schema[name] = foundSchema;
      this.ms3API.dataTypes.push(schemaToDataType(schema, data.__id));
    } else {
      schema[name] = data;
      this.ms3API.dataTypes.push(schemaToDataType(schema));
    }
  }

  getExamples(data: any, name: string) {
    if (_find(this.ms3API.examples, {title: name})) return;
    let content;
    if (data.externalValue) {
      content = _find(this.loadedExamples, {name}).content;
    } else {
      content = JSON.stringify(data.value);
    }

    const example: MS3Interface.Example = {
      __id: data.__id,
      title: name,
      format: 'json',
      content: content
    };

    this.ms3API.examples.push(example);
  }

  convertResponses(responses: OAS30Interface.ResponsesObject): MS3Interface.Response[] {
    return reduce(responses, (resultArray: any, value: any, key: string) => {
      const convertedResponse: MS3Interface.Response = {
         code: key,
         description: value.description,
      };

      if (value.content) {
        convertedResponse.body = this.convertRequestBody(<OAS30Interface.RequestBodyObject>value);
      }

      if (value.headers) {
        const headers = reduce(value.headers, (result: any, value: any, key: string) => {
          value.name = key;
          result.push(value);
          return result;
        }, []);
        if (headers.length) {
          convertedResponse.headers = this.convertParameters(headers);
        }
      }

      resultArray.push(convertedResponse);
      return resultArray;
    }, []);
  }

  convertExamples(examples: OAS30Interface.Example): string[] {
    return reduce(examples, (resultArray: any, value: any, key: string) => {
      let ID;
      if (!value.$ref) {
        ID = v4();
        this.ms3API.examples.push({
          __id: ID,
          title: key,
          format: 'json',
          content: JSON.stringify(value.value)
        });
      } else if (value.$ref) {
        const splitArr: string[] = value.$ref.split('/');
        const name: string = splitArr.pop();
        ID = this.getRefId(name, 'examples');
      }

      resultArray.push(ID);
      return resultArray;
    }, []);
  }

  getParameters(parameters: OAS30Interface.ParameterObject[]): any {
    const query: OAS30Interface.ParameterObject[] = filter(parameters, ['in', 'query']);
    const header: OAS30Interface.ParameterObject[] = filter(parameters, ['in', 'header']);

    const convertedParameters: any = {};

    if (query && query.length) convertedParameters.queryParameters = this.convertParameters(query);
    if (header && header.length) convertedParameters.headers = this.convertParameters(header);

    return convertedParameters;
  }

  convertParameters(parameters: OAS30Interface.ParameterObject[]) {
    return parameters.map((parameter) => {
      const convertedParameter: MS3Interface.Parameter = {
        displayName: parameter.name,
        type: 'string' // default
      };

      if (parameter.description) convertedParameter.description = parameter.description;
      if (parameter.required) convertedParameter.required = parameter.required;

      if (parameter.schema) {
        const schema: any = parameter.schema;
        if (schema.pattern) convertedParameter.pattern = schema.pattern;
        if (schema.default) convertedParameter.default = schema.default;
        if (schema.maxLength) convertedParameter.maxLength = schema.maxLength;
        if (schema.minLength) convertedParameter.minLength = schema.minLength;
        if (schema.minimum) convertedParameter.minimum = schema.minimum;
        if (schema.maximum) convertedParameter.maximum = schema.maximum;
        if (schema.enum) convertedParameter.enum = schema.enum;
        if (schema.type) {
          if (schema.type == 'array' && schema.items && schema.items.type) {
            convertedParameter.type = schema.items.type;
            convertedParameter.repeat = true;
          } else {
            convertedParameter.type = schema.type;
            if (schema.type == 'long' || schema.type == 'float' || schema.type == 'double') {
              convertedParameter.type = 'number';
            }
          }
        }
      }

      return convertedParameter;
    });
  }

  convertPaths() {
    return reduce(this.oasAPI.paths, (resultResources: any, pathValue: OAS30Interface.PathItemObject, pathKey: string) => {
      const resource: MS3Interface.Resource = {
        __id: v4(),
        path: pathKey,
        methods: this.convertOperations(pathValue)
      };

      if (pathValue.description) resource.description = pathValue.description;
      if (pathValue.parameters) {
        const uri: OAS30Interface.ParameterObject[] = filter(<OAS30Interface.ParameterObject[]>pathValue.parameters, ['in', 'path']);
        resource.pathVariables = this.convertParameters(uri);
      }

      resultResources.push(resource);

      return resultResources;
    }, []);
  }
}

export default function convertOAS30toMS3(oasAPI: OAS30Interface.API, loadedSchemas: any[], loadedExamples: any[]): any {
  return MS3toOAS30toMS3.create(oasAPI, loadedSchemas, loadedExamples).convert();
}