const service = require('../services/configs')
const schemas = require('../schemas/configs')
const response = require('../utils/response')
const logger = require('../utils/logger')('config_handler')

async function create (event) {
  try {
    const { body: rawBody } = event
    const body = JSON.parse(rawBody)

    const payload = await schemas.create.validate(
      body,
      { abortEarly: false }
    )

    const config = await service.create(payload)

    return response.sucess({
      body: config,
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
    
    const config = await service.list(payload.app_id)
  
    if (!config) {
      return response.error({
        statusCode: 404,
      })
    }

    logger.info({
      from: 'response',
      queryStringParameters,
      config,
    })
  
    return response.sucess({
      body: config,
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

async function show (event) {
  try {
    const { pathParameters } = event

    logger.info({
      from: 'request',
      operation: 'show',
      pathParameters,
    })

    const payload = await schemas.show.validate(
      pathParameters,
      { abortEarly: false }
    )
    
    const config = await service.show(payload.id)
  
    if (!config) {
      return response.error({
        statusCode: 404,
      })
    }

    logger.info({
      from: 'response',
      pathParameters,
      config,
    })
  
    return response.sucess({
      body: config,
    })
  } catch (error) {
    logger.error({
      from: 'response',
      operation: 'show',
      error,
      pathParameters: event.pathParameters,
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
  show,
}
