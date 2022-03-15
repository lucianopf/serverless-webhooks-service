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

    if (error.name === 'ConditionalCheckFailedException') {
      return response.error({
        statusCode: 400,
        message: error.toString(),
      })
    }

    return response.error() 
  }

}

async function show (event) {
  return 'showing application'
}

module.exports = {
  create,
  show,
}
