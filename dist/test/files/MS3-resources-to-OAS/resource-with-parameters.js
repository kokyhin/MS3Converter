"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.originalResourceWithParameters = {
    'settings': {
        'title': 'params',
        'baseUri': 'http://params'
    },
    'apro_version': apro_version_1.default,
    'entityTypeName': 'api',
    'resources': [
        {
            'path': '/res',
            'name': 'res',
            'methods': [
                {
                    'active': true,
                    'name': 'GET',
                    'description': 'desc',
                    'headers': [
                        {
                            'displayName': 'string',
                            'type': 'string',
                            'description': 'description',
                            'pattern': '.*',
                            'default': 'default',
                            'example': 'example string',
                            'repeat': false,
                            'required': true,
                            'enum': [
                                'enum1',
                                'enum2'
                            ],
                            'minLength': 2,
                            'maxLength': 10
                        },
                        {
                            'displayName': 'integer',
                            'type': 'integer',
                            'description': 'description',
                            'default': 1,
                            'example': 5,
                            'repeat': false,
                            'required': true,
                            'enum': [
                                'enum1',
                                'enum2'
                            ],
                            'minimum': 2,
                            'maximum': 1,
                        },
                        {
                            'displayName': 'boolean',
                            'type': 'boolean',
                            'description': 'description',
                            'default': true,
                            'example': false,
                            'repeat': false,
                            'required': true
                        }
                    ],
                    'queryParameters': [
                        {
                            'displayName': 'stringArray',
                            'type': 'string',
                            'description': 'description',
                            'pattern': '.*',
                            'default': 'default',
                            'example': 'example string',
                            'repeat': true,
                            'required': false,
                            'enum': [
                                'enum1',
                                'enum2'
                            ],
                            'minLength': 2,
                            'maxLength': 1,
                        },
                        {
                            'displayName': 'number',
                            'type': 'number',
                            'description': 'description',
                            'default': 1,
                            'example': 5,
                            'repeat': false,
                            'required': true
                        }
                    ]
                },
                {
                    'active': true,
                    'name': 'POST'
                },
                {
                    'active': true,
                    'name': 'PUT'
                },
                {
                    'active': true,
                    'name': 'DELETE'
                }
            ],
            '__id': 'f068746b-acd9-40c8-af83-83a89095b0a0'
        }
    ]
};
exports.resultResourceWithParameters = {
    openapi: '3.0',
    info: {
        title: 'params',
        description: 'API description',
        version: '3.0'
    },
    servers: [{
            url: 'http://params'
        }],
    paths: {
        '/res': {
            get: {
                operationId: 'RES_GET',
                description: 'desc',
                responses: {},
                parameters: [
                    {
                        name: 'string',
                        in: 'header',
                        description: 'description',
                        required: true,
                        schema: {
                            type: 'string',
                            default: 'default',
                            pattern: '.*',
                            enum: [
                                'enum1',
                                'enum2'
                            ],
                            minLength: 2,
                            maxLength: 10
                        }
                    },
                    {
                        name: 'integer',
                        in: 'header',
                        description: 'description',
                        required: true,
                        schema: {
                            type: 'integer',
                            default: 1,
                            enum: [
                                'enum1',
                                'enum2'
                            ],
                            minimum: 2,
                            maximum: 1
                        }
                    },
                    {
                        name: 'boolean',
                        in: 'header',
                        description: 'description',
                        required: true,
                        schema: {
                            type: 'boolean',
                            default: true,
                        }
                    },
                    {
                        name: 'stringArray',
                        in: 'query',
                        description: 'description',
                        required: false,
                        schema: {
                            type: 'array',
                            items: {
                                type: 'string',
                                default: 'default',
                                pattern: '.*',
                                enum: [
                                    'enum1',
                                    'enum2'
                                ],
                                minLength: 2,
                                maxLength: 1,
                            }
                        }
                    },
                    {
                        name: 'number',
                        in: 'query',
                        description: 'description',
                        required: true,
                        schema: {
                            type: 'long',
                            default: 1,
                        }
                    }
                ]
            },
            post: {
                operationId: 'RES_POST',
                responses: {},
            },
            put: {
                operationId: 'RES_PUT',
                responses: {}
            },
            delete: {
                operationId: 'RES_DELETE',
                responses: {}
            }
        }
    },
    components: {}
};
//# sourceMappingURL=resource-with-parameters.js.map