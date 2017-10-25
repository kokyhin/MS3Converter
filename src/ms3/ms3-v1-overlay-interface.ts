import * as apiInterfaces from './ms3-v1-api-interface';

interface overlaySettings extends apiInterfaces.settings {
  usage?: string,
  extends: string | apiInterfaces.API
}

interface Overlay {
  entityTypeName: apiInterfaces.entityName,
  settings: overlaySettings,
  folder?: string[],
  dataTypes?: apiInterfaces.dataType[],
  resources?: apiInterfaces.resource[],
  securitySchemes?: apiInterfaces.securityScheme[],
  resourcesTypes?: apiInterfaces.resourcesType[],
  traits?: apiInterfaces.trait[],
  documentation?: apiInterfaces.documentation[],
  annotationTypes?: apiInterfaces.annotationType[],
  examples?: apiInterfaces.example[],
  libraries?: apiInterfaces.library[]
}

export { Overlay };