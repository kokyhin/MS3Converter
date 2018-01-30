"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apro_version_1 = require("../../../apro_version");
exports.originalBasicAndDigestAuth = {
    'settings': {
        'title': 'params',
        'baseUri': 'http://params'
    },
    'apro_version': apro_version_1.default,
    'entityTypeName': 'api',
    'securitySchemes': [
        {
            'name': 'Basic Auth',
            'type': 'Basic Authentication',
            'describedBy': {},
            '__id': 'a3c8a352-2b7f-4955-839d-d980da30ae4f'
        },
        {
            'name': 'Digest Auth',
            'type': 'Digest Authentication',
            'describedBy': {},
            '__id': 'a3c8a352-2b7f-4955-839d-d980da30ae4f'
        }
    ]
};
exports.resultBasicAndDigestAuth = {
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
        securitySchemes: {
            'Basic Auth': {
                type: 'http',
                scheme: 'basic'
            }
        }
    }
};
//# sourceMappingURL=Basic-and-Digest-auth.js.map