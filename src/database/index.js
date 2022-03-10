const dynamoose = require('dynamoose')

const {
  NODE_ENV,
} = process.env

if (NODE_ENV === 'test' || NODE_ENV === 'development') {
  dynamoose.aws.ddb.local()
}

const Applications = require('./applications')

module.exports = {
  Applications,
}