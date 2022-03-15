import dynamoose from 'dynamoose'

const {
  NODE_ENV,
} = process.env

if (NODE_ENV === 'test' || NODE_ENV === 'development') {
  dynamoose.aws.ddb.local()
}

import Applications from './applications'

export {
  Applications,
}
