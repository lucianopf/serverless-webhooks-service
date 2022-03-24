const service = require('../services/webhooks')
const schemas = require('../schemas/webhooks')
const response = require('../utils/response')
const logger = require('../utils/logger')('webhooks_handler')

async function create (event) {
  try {
    const { body: rawBody } = event
    const body = JSON.parse(rawBody)

    const payload = await schemas.create.validate(
      body,
      { abortEarly: false }
    )

    const webhook = await service.create(payload)

    return response.sucess({
      body: webhook,
      statusCode: 201,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.error({
        statusCode: 400,
        message: error.errors.toString(),
      })
    }

    return response.error() 
  }

}

async function list (event) {
  try {
    const { queryStringParameters } = event

    logger.info({
      from: 'request',
      operation: 'list',
      queryStringParameters,
    })

    const payload = await schemas.list.validate(
      queryStringParameters,
      { abortEarly: false }
    )
    
    const webhooks = await service.list(payload.app_id)
  
    if (!webhooks) {
      return response.error({
        statusCode: 404,
      })
    }

    logger.info({
      from: 'response',
      queryStringParameters,
      webhooks,
    })
  
    return response.sucess({
      body: webhooks,
    })
  } catch (error) {
    logger.error({
      from: 'response',
      operation: 'list',
      error,
      queryStringParameters: event.queryStringParameters,
    })

    if (error.name === 'ValidationError') {
      return response.error({
        statusCode: 400,
        message: error.errors.toString(),
      })
    }

    return response.error() 
  }
}

module.exports = {
  create,
  list,
}
