const service = require('../services/applications')
const schemas = require('../schemas/applications')
const response = require('../utils/response')

async function create (event) {
  try {
    const { body: rawBody } = event
    const body = JSON.parse(rawBody)

    const payload = await schemas.createApplications.validate(
      body,
      { abortEarly: false }
    )

    const application = await service.create(payload)

    return response.sucess({
      body: application,
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

async function show (event) {
  try {
    const { pathParameters } = event

    const payload = await schemas.showApplications.validate(
      pathParameters,
      { abortEarly: false }
    )
    
    const application = await service.show(payload.id)
  
    if (!application) {
      return response.error({
        statusCode: 404,
      })
    }
  
    return response.sucess({
      body: application,
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

module.exports = {
  create,
  show,
}
