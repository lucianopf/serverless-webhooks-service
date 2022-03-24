const { Configs } = require('../database')
const {
  ValidationError,
} = require('../errors')

async function create (payload) {
  return Configs.create(payload)
}

async function list (app_id) {
  try {
    const config = await Configs.query('app_id').eq(app_id).exec()

    return config
  } catch (error) {
    if (error.name === 'ValidationException') {
      throw new ValidationError([error.message])
    }

    throw error
  }
}

async function show (id) {
  try {
    const config = await Configs.get(id)

    return config
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
  show,
}
