import * as ApiBlueprint from '../../../../blueprint/interfaces/blueprint-interface';

const source: ApiBlueprint.API = {
  metadata: {
    markdownEntity: 'special',
    format: '1A',
    host: 'http://Somehost'
  },
  name: 'some_name',
  overview: 'Some overview',
  description: 'API Description goes here',
  resourceGroup: {
    keyword: 'Resources',
    identifier: 'resource group',
    markdownEntity: 'header',
    nestedSections: [
      {
        keyword: '/clients/{id}',
        identifier: 'resource',
        markdownEntity: 'header',
        description: 'Clients endpoint',
        nestedSections: {
          parameters: {
            keyword: 'Parameters',
            identifier: 'parameters',
            markdownEntity: 'list',
            parameterList: [
              {
                title: 'id',
                type: 'string',
                description: 'Id of a Client',
                enum: true,
                members: ['A', 'B', 'C']
              }
            ]
          },
          actions: [
            {
              keyword: 'POST',
              description: 'action description',
              markdownEntity: 'header',
              nestedSections: {
                parameters: {
                  keyword: 'Parameters',
                  identifier: 'parameters',
                  markdownEntity: 'list',
                  parameterList: [
                    {
                      title: 'ID',
                      type: 'string',
                      description: 'new ID',
                      enum: true,
                      members: ['A', 'B', 'C']
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    ]
  }
};

const expected: string = `FORMAT: 1A
HOST: http://Somehost

#some_name
API Description goes here

# /clients/{id}
Clients endpoint

+ Parameters

  + id (enum[string]) - Id of a Client

    + Members
      + \`A\`
      + \`B\`
      + \`C\`

## [POST]
action description

+ Parameters

  + ID (enum[string]) - new ID

    + Members
      + \`A\`
      + \`B\`
      + \`C\`
`;

export { source, expected };