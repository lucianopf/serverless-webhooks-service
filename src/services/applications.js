const { Applications } = require('../database')
const {
  ValidationError,
  NotFoundError,
} = require('../errors')

async function create (payload) {
  const { app_id } = payload

  const existingApplication = await Applications.get(app_id).catch(() => null)

  if (existingApplication) {
    throw new ValidationError(['Application already exists'])
  }

  return Applications.create(payload)
}

async function show (id) {
  try {
    const application = await Applications.get(id)

    return application
  } catch (error) {
    if (error.name === 'ValidationException') {
      throw new ValidationError([error.message])
    }

    throw error
  }
}

module.exports = {
  create,
  show,
}
