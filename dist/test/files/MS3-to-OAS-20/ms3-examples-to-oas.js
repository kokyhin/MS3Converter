"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.ms3Examples = {
    settings: {
        title: 'params',
        baseUri: 'http://params',
    },
    apro_version: apro_version_1.default,
    entityTypeName: 'api',
    'examples': [
        {
            'title': 'exampleJSON',
            'content': '{"some": "example","name": "value"}',
            'format': 'json',
            '__id': '855dd9bc-150c-44bd-a94a-b368f8857b6e'
        },
        {
            'title': 'exampleTXT',
            'content': 'example in txt',
            'format': 'txt',
            '__id': '865dd9bc-150c-44bd-a94a-b368f8857b6e'
        },
        {
            'title': 'exampleXML',
            'content': '<xml><example attr="hey">Some Value</example></xml>',
            'format': 'xml',
            '__id': 'b02085eb-b1c7-4189-9242-3ce91d6e8157'
        },
    ]
};
exports.oasExamples = {
    swagger: '2.0',
    info: {
        title: 'params',
        version: '2.0'
    },
    schemes: [
        'https'
    ],
    host: 'params',
    basePath: '/',
    paths: {}
};
//# sourceMappingURL=ms3-examples-to-oas.js.map