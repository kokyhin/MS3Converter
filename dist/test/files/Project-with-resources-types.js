"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../apro_version");
const originalProject = {
    'apro_version': apro_version_1.default,
    'resourcesTypes': [
        {
            'path': '',
            'name': 'type',
            'description': '',
            'pathVariables': [],
            'queryParameters': [],
            'annotations': [],
            'methods': [
                {
                    'active': true,
                    'name': 'GET',
                    'description': '',
                    'queryParameters': [],
                    'headers': [],
                    'responses': [
                        {
                            'code': '200',
                            'description': '',
                            'body': [
                                {
                                    'annotations': [],
                                    'contentType': 'text/plain',
                                    'selectedExamples': [],
                                    'type': ''
                                }
                            ],
                            'headers': [],
                            'annotations': []
                        }
                    ],
                    'annotations': []
                },
                {
                    'active': true,
                    'name': 'POST',
                    'description': '',
                    'queryParameters': [],
                    'headers': [
                        {
                            'displayName': 'dsdsd',
                            'description': '',
                            'type': 'integer',
                            'repeat': false,
                            'required': false
                        }
                    ],
                    'responses': [],
                    'annotations': []
                },
                {
                    'active': false,
                    'name': 'PUT',
                    'description': '',
                    'queryParameters': [],
                    'headers': [],
                    'responses': []
                },
                {
                    'active': false,
                    'name': 'DELETE',
                    'description': '',
                    'queryParameters': [],
                    'headers': [],
                    'responses': []
                },
                {
                    'active': false,
                    'name': 'PATCH',
                    'description': '',
                    'queryParameters': [],
                    'headers': [],
                    'responses': []
                },
                {
                    'active': false,
                    'name': 'OPTIONS',
                    'description': '',
                    'queryParameters': [],
                    'headers': [],
                    'responses': []
                },
                {
                    'active': false,
                    'name': 'HEAD',
                    'description': '',
                    'queryParameters': [],
                    'headers': [],
                    'responses': []
                },
                {
                    'active': false,
                    'name': 'TRACE',
                    'description': '',
                    'queryParameters': [],
                    'headers': [],
                    'responses': []
                }
            ],
            '__id': '8e08b7c1-f820-40d5-af74-16680cd2b243'
        }
    ],
    'settings': {
        'title': 'sanitize resources types',
        'baseUri': 'http://types'
    },
    'entityTypeName': 'api'
};
exports.originalProject = originalProject;
const resultProject = {
    'apro_version': apro_version_1.default,
    'resourcesTypes': [
        {
            'methods': [
                {
                    'active': true,
                    'name': 'GET',
                    'responses': [
                        {
                            'code': '200',
                            'body': [
                                {
                                    'contentType': 'text/plain'
                                }
                            ]
                        }
                    ]
                },
                {
                    'active': true,
                    'name': 'POST',
                    'headers': [
                        {
                            'displayName': 'dsdsd',
                            'type': 'integer',
                            'repeat': false,
                            'required': false
                        }
                    ]
                },
                {
                    'active': false,
                    'name': 'PUT'
                },
                {
                    'active': false,
                    'name': 'DELETE'
                },
                {
                    'active': false,
                    'name': 'PATCH'
                },
                {
                    'active': false,
                    'name': 'OPTIONS'
                },
                {
                    'active': false,
                    'name': 'HEAD'
                },
                {
                    'active': false,
                    'name': 'TRACE'
                }
            ],
            '__id': '8e08b7c1-f820-40d5-af74-16680cd2b243'
        }
    ],
    'settings': {
        'title': 'sanitize resources types',
        'baseUri': 'http://types'
    },
    'entityTypeName': 'api'
};
exports.resultProject = resultProject;
//# sourceMappingURL=Project-with-resources-types.js.map