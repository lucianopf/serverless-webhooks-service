const { getHandlersDefinitions } = require('./src/handlers')

module.exports = {
  org: 'lucianopf',
  app: 'serverless-webhooks-service',
  console: true,
  service: 'serverless-webhooks-service',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    httpApi: {
      cors: true,
    },
  },
  functions: getHandlersDefinitions(),
  resources: {},
  plugins: [
    'serverless-offline'
  ],
}
