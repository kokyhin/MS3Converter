import MS3toOAS from './../ms3/ms3-to-oas/index';
import * as ApiInterfaces from './../ms3/ms3-v1-api-interface';
import * as OASInterfaces from './../oas/oas-30-api-interface';
import ConvertorOptions from './../common/convertor-options-interface';
import { exists } from 'fs';
import { promisify } from 'util';
import * as rmdir from 'rmdir';
import * as path from 'path';
import { v4 } from 'uuid';
import * as mkdirp from 'mkdirp2';
import AproVersion from '../apro_version';

const fileExistsPromise = promisify(exists);
const rmdirPromise = promisify(rmdir);
const mkdirPromise = promisify(mkdirp);

const project: ApiInterfaces.API = {
  settings: {
    title: 'params',
    baseUri: 'http://params',
  },
  dataTypes: [
    {
      'name': 'ArrayInclude',
      'type': 'array',
      'example': 'ExampleArray',
      'maxItems': 3,
      'minItems': 1,
      'uniqueItems': true,
      'items': {
        'includes': 'c6710947-1eed-472d-a4f3-c4807c24fe6b'
      },
      '__id': 'e26ffe29-1c82-4852-a472-5f0271955793'
    },
    {
      'name': 'ObjectSchema',
      'type': 'object',
      'properties': [
        {
          'name': 'StringProperty',
          'type': 'string',
          'description': 'Description here',
          'example': 'Terry',
          'default': 'Ted',
          'pattern': 'Pattern Here',
          'minLength': 3,
          'maxLength': 10,
          'enum': [
            'Ted',
            'Bob'
          ],
          'required': true
        },
        {
          'name': 'BooleanProperty',
          'type': 'boolean',
          'description': 'Description here',
          'example': false,
          'default': true,
          'required': true
        },
        {
          'name': 'isNumber',
          'type': 'number'
        },
        {
          'name': 'isDateOnly',
          'type': 'date-only'
        },
        {
          'name': 'nil',
          'type': 'nil'
        },
        {
          'name': 'default-3',
          'mode': 'include',
          'includes': 'c6710947-1eed-472d-a4f3-c4807c24fe6b'
        },
        {
          'name': 'def-4',
          'mode': 'include',
          'includes': '1'
        }
      ],
      '__id': 'b204580e-7b57-44b4-85fd-075fca5d68c8'
    },
    {
      'name': 'nilTop',
      'type': 'nil',
      '__id': '1'
    },
    {
      'name': 'arrayOfNil',
      'type': 'array',
      'items': {
        'type': 'nil'
      },
      '__id': '2'
    },
    {
      'name': 'arrayRefNil',
      'type': 'array',
      'items': {
        'includes': '1'
      },
      '__id': '3'
    },
    {
      'name': 'ArraySchema',
      'type': 'array',
      'example': '13',
      'maxItems': 1,
      'minItems': 1,
      'uniqueItems': true,
      'items': {
        'type': 'integer',
        'description': '1',
        'example': 3,
        'default': 2,
        'format': 'int32',
        'minimum': 1,
        'maximum': 3,
        'multipleOf': 12
      },
      '__id': 'c6710947-1eed-472d-a4f3-c4807c24fe6b'
    }
  ],
  apro_version: AproVersion,
  entityTypeName: 'api'
};

test('MS3 schemas should be converted to OAS successfully', async() => {
  const expectedResult: OASInterfaces.API = {
    openapi: '3.0',
    info: {
      title: 'params',
      description: 'API description',
      version: '3.0'
    },
    servers: [{
      url: 'http://params'
    }],
    paths: {},
    components: {
      schemas: {
        'ArrayInclude': {
          'title': 'ArrayInclude',
          'type': 'array',
          'example': 'ExampleArray',
          'maxItems': 3,
          'minItems': 1,
          'uniqueItems': true,
          'items': {
            '$ref': '#/components/schemas/ArraySchema'
          },
        },
        'arrayRefNil': {
          'title': 'arrayRefNil',
          'type': 'array',
        },
        'ArraySchema': {
          'title': 'ArraySchema',
          'type': 'array',
          'example': '13',
          'maxItems': 1,
          'minItems': 1,
          'uniqueItems': true,
          'items': {
            'type': 'integer',
            'description': '1',
            'example': 3,
            'default': 2,
            'format': 'int32',
            'minimum': 1,
            'maximum': 3,
            'multipleOf': 12
          }
        },
        'ObjectSchema' : {
          'title': 'ObjectSchema',
          'type': 'object',
          'required': [
            'StringProperty',
            'BooleanProperty',
          ],
          'properties': {
            'StringProperty': {
              'type': 'string',
              'description': 'Description here',
              'example': 'Terry',
              'default': 'Ted',
              'pattern': 'Pattern Here',
              'minLength': 3,
              'maxLength': 10,
              'enum': [
                'Ted',
                'Bob'
              ]
            },
            'BooleanProperty': {
              'type': 'boolean',
              'description': 'Description here',
              'example': false,
              'default': true
            },
            'isNumber': {
              'type': 'integer'
            },
            'isDateOnly': {
              'type': 'date'
            },
            'ArraySchema': {
              '$ref': '#/components/schemas/ArraySchema'
            }
          }
        },
        'arrayOfNil': {
          'title': 'arrayOfNil',
          'type': 'array'
        }
      },
    }
  };
  expect(JSON.parse( <string> await MS3toOAS.create(project).convert() )).toEqual(expectedResult);
});

test('MS3 schemas should be converted to OAS with references && external files should be created in "/schemas" folder', async() => {
  const expectedResult: OASInterfaces.API = {
    openapi: '3.0',
    info: {
      title: 'params',
      description: 'API description',
      version: '3.0'
    },
    servers: [{
      url: 'http://params'
    }],
    paths: {},
    components: {
      schemas: {
        'ArrayInclude': {
          '$ref': './schemas/ArrayInclude.json#ArrayInclude'
        },
        'arrayRefNil': {
          '$ref': './schemas/arrayRefNil.json#arrayRefNil'
        },
        'ArraySchema': {
          '$ref': './schemas/ArraySchema.json#ArraySchema'
        },
        'ObjectSchema' : {
          '$ref': './schemas/ObjectSchema.json#ObjectSchema'
        },
        'arrayOfNil': {
          '$ref': './schemas/arrayOfNil.json#arrayOfNil'
        }
      },
    }
  };

  const destinationForTestResults = path.join(__dirname, '..', '..', '.tmp', 'ms3-datatypes-to-oas', v4());
  const config: ConvertorOptions = {
    fileFormat: 'json',
    asSingleFile: false,
    destinationPath: destinationForTestResults
  };

  await mkdirPromise(destinationForTestResults);
  expect(JSON.parse( <string> await MS3toOAS.create(project, config).convert() )).toEqual(expectedResult);

  const mainFileExist = await fileExistsPromise(path.join(destinationForTestResults, 'api.json'));
  const schemasFolderExist = await fileExistsPromise(path.join(destinationForTestResults, 'schemas', 'ArrayInclude.json'));
  await rmdirPromise(path.join(__dirname, '..', '..', '.tmp', 'ms3-datatypes-to-oas'));

  expect(mainFileExist && schemasFolderExist).toEqual(true);
});
