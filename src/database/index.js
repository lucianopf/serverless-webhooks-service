const dynamoose = require('dynamoose')

const {
  NODE_ENV,
} = process.env

if (NODE_ENV === 'test' || NODE_ENV === 'development') {
  dynamoose.aws.sdk.config.update({
    accessKeyId: 'AKID',
    secretAccessKey: 'SECRET',
    region: 'us-east-1',
  })
  dynamoose.aws.ddb.local()
}

const Applications = require('./applications')
const Configs = require('./configs')
const Webhooks = require('./webhooks')

module.exports = {
  Applications,
  Configs,
  Webhooks,
}
