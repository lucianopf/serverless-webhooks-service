import { getHandlersDefinitions } from './src/handlers'

const PROJECT_NAME = 'serverless-webhooks-service'

module.exports = {
  org: 'lucianopf',
  app: PROJECT_NAME,
  console: true,
  service: PROJECT_NAME,
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    httpApi: {
      cors: true,
    },
    environment: {
      PROJECT_NAME,
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:*',
            ],
            Resource: [
              `arn:aws:dynamodb:us-east-1:*:table/${PROJECT_NAME}*`,
            ]
          }
        ] 
      }
    }
  },
  functions: getHandlersDefinitions(),
  resources: {},
  plugins: [
    'serverless-plugin-typescript',
    'serverless-offline',
  ],
}
