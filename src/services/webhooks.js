const { Webhooks } = require('../database')
const {
  ValidationError,
} = require('../errors')

async function create (payload) {
  return Webhooks.create(payload)
}

async function list (app_id) {
  try {
    const webhooks = await Webhooks.query('app_id').eq(app_id).exec()

    return webhooks
  } catch (error) {
    if (error.name === 'ValidationException') {
      throw new ValidationError([error.message])
    }

    throw error
  }
}

module.exports = {
  create,
  list,
}
