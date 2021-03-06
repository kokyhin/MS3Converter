"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.originalProjectWithSecuritySchemes = {
    'apro_version': apro_version_1.default,
    'settings': {
        'extends': {
            'entityTypeName': 'api',
            'apro_version': apro_version_1.default,
            'settings': {
                'baseUri': 'http://mergeAPI',
                'title': 'Merge API',
            },
            'annotationTypes': [
                {
                    'name': 'annotation',
                    'description': 'desc',
                    'type': 'string'
                }
            ],
            'traits': [
                {
                    'name': 'trait',
                    'headers': [
                        {
                            'displayName': 'number',
                            'type': 'number',
                            'minLength': 2,
                            'maxLength': 10
                        },
                        {
                            'displayName': 'string',
                            'type': 'string',
                            'pattern': '.*',
                            'minLength': 2,
                            'maxLength': 10
                        }
                    ],
                    'responses': [
                        {
                            'code': '101',
                            'description': 'should be overwritten'
                        }
                    ],
                    '__id': 'api-trait-id-1',
                }
            ]
        },
        'baseUri': 'http://mergeEXT',
        'title': 'Merge EXT',
    },
    'entityTypeName': 'api',
    'annotationTypes': [
        {
            'name': 'annotation',
            'description': 'description',
            'type': 'string'
        }
    ],
    'traits': [
        {
            'name': 'trait',
            'description': 'description',
            'queryParameters': [
                {
                    'displayName': 'integer',
                    'type': 'integer',
                    'description': 'description',
                    'default': 1,
                    'minimum': 2,
                    'maximum': 1,
                }
            ],
            'headers': [
                {
                    'displayName': 'number',
                    'type': 'number',
                    'minLength': 2,
                    'maxLength': 10
                },
                {
                    'displayName': 'string',
                    'type': 'integer',
                    'minLength': 3,
                    'maxLength': 11
                }
            ],
            'responses': [
                {
                    'code': '101',
                    'description': 'should overwrite'
                }
            ],
            '__id': 'ext-trait-id-1',
        }
    ]
};
exports.resultProjectWithSecuritySchemes = {
    'apro_version': apro_version_1.default,
    'settings': {
        'baseUri': 'http://mergeEXT',
        'title': 'Merge EXT',
    },
    'annotationTypes': [
        {
            'name': 'annotation',
            'description': 'description',
            'type': 'string'
        }
    ],
    'traits': [
        {
            'name': 'trait',
            'description': 'description',
            'queryParameters': [
                {
                    'displayName': 'integer',
                    'type': 'integer',
                    'description': 'description',
                    'default': 1,
                    'minimum': 2,
                    'maximum': 1,
                }
            ],
            'headers': [
                {
                    'displayName': 'number',
                    'type': 'number',
                    'minLength': 2,
                    'maxLength': 10
                },
                {
                    'displayName': 'string',
                    'type': 'integer',
                    'minLength': 3,
                    'maxLength': 11
                }
            ],
            'responses': [
                {
                    'code': '101',
                    'description': 'should overwrite'
                }
            ],
            '__id': 'ext-trait-id-1',
        }
    ],
    'entityTypeName': 'api'
};
//# sourceMappingURL=merge-extension-with-api-securityschemes.js.map