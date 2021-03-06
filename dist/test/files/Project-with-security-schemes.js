"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../apro_version");
const originalProject = {
    'apro_version': apro_version_1.default,
    'securitySchemes': [
        {
            'name': 'auth 1.0',
            'type': 'OAuth 1.0',
            'description': '',
            'annotations': [],
            'settings': {
                'scopes': [],
                'requestTokenUri': 'http://hey.there',
                'authorizationUri': 'http://hey.there',
                'tokenCredentialsUri': 'http://hey.there'
            },
            'describedBy': {
                'headers': [],
                'queryParameters': [],
                'responses': [
                    {
                        'code': '101',
                        'description': '',
                        'body': [],
                        'headers': [
                            {
                                'displayName': 'dsdsdsd',
                                'description': '',
                                'type': 'integer',
                                'repeat': false,
                                'required': true
                            }
                        ],
                        'annotations': []
                    }
                ]
            },
            '__id': '84b76bc7-b514-4878-b7aa-9545bbdadf62'
        },
        {
            'name': '2.0',
            'type': 'OAuth 2.0',
            'description': '',
            'annotations': [],
            'settings': {
                'scopes': [],
                'accessTokenUri': 'http://hey.there',
                'authorizationGrants': [
                    'client_credentials'
                ]
            },
            'describedBy': {
                'headers': [],
                'queryParameters': [],
                'responses': []
            },
            '__id': '5e949bcb-551a-4172-8d45-2aacdb72160d'
        },
        {
            'name': 'basic',
            'type': 'Basic Authentication',
            'description': '',
            'annotations': [],
            'settings': {
                'scopes': []
            },
            'describedBy': {
                'headers': [],
                'queryParameters': [
                    {
                        'displayName': 'name',
                        'description': '',
                        'type': 'number',
                        'repeat': false,
                        'required': false
                    }
                ],
                'responses': []
            },
            '__id': '0fe78439-1a74-4436-8428-9f48366ce31a'
        },
        {
            'name': 'digest',
            'type': 'Digest Authentication',
            'description': '',
            'annotations': [],
            'settings': {
                'scopes': []
            },
            'describedBy': {
                'headers': [],
                'queryParameters': [],
                'responses': []
            },
            '__id': '4961f1e0-4953-4ed5-8d1d-8d04d76bcedd'
        },
        {
            'name': 'pass through',
            'type': 'Pass Through',
            'description': '',
            'annotations': [],
            'settings': {
                'scopes': []
            },
            'describedBy': {
                'headers': [],
                'queryParameters': [],
                'responses': []
            },
            '__id': '6d635af0-e1a3-49f7-8500-39ef61edc46f'
        }
    ],
    'settings': {
        'baseUri': 'http://schemes',
        'title': 'sanitize security schemes'
    },
    'entityTypeName': 'api'
};
exports.originalProject = originalProject;
const resultProject = {
    'apro_version': apro_version_1.default,
    'securitySchemes': [
        {
            'name': 'auth 1.0',
            'type': 'OAuth 1.0',
            'settings': {
                'requestTokenUri': 'http://hey.there',
                'authorizationUri': 'http://hey.there',
                'tokenCredentialsUri': 'http://hey.there'
            },
            'describedBy': {
                'responses': [
                    {
                        'code': '101',
                        'headers': [
                            {
                                'displayName': 'dsdsdsd',
                                'type': 'integer',
                                'repeat': false,
                                'required': true
                            }
                        ]
                    }
                ]
            },
            '__id': '84b76bc7-b514-4878-b7aa-9545bbdadf62'
        },
        {
            'name': '2.0',
            'type': 'OAuth 2.0',
            'settings': {
                'accessTokenUri': 'http://hey.there',
                'authorizationGrants': [
                    'client_credentials'
                ]
            },
            'describedBy': {},
            '__id': '5e949bcb-551a-4172-8d45-2aacdb72160d'
        },
        {
            'name': 'basic',
            'type': 'Basic Authentication',
            'settings': {},
            'describedBy': {
                'queryParameters': [
                    {
                        'displayName': 'name',
                        'type': 'number',
                        'repeat': false,
                        'required': false
                    }
                ]
            },
            '__id': '0fe78439-1a74-4436-8428-9f48366ce31a'
        },
        {
            'name': 'digest',
            'type': 'Digest Authentication',
            'settings': {},
            'describedBy': {},
            '__id': '4961f1e0-4953-4ed5-8d1d-8d04d76bcedd'
        },
        {
            'name': 'pass through',
            'type': 'Pass Through',
            'settings': {},
            'describedBy': {},
            '__id': '6d635af0-e1a3-49f7-8500-39ef61edc46f'
        }
    ],
    'settings': {
        'baseUri': 'http://schemes',
        'title': 'sanitize security schemes'
    },
    'entityTypeName': 'api'
};
exports.resultProject = resultProject;
//# sourceMappingURL=Project-with-security-schemes.js.map