const applicationService = require('../services/applications')

async function create (event) {
  const { body: rawBody } = event
  const body = JSON.parse(rawBody)

  return applicationService.create(body)
}

async function show (event) {
  return 'showing application'
}

module.exports = {
  create,
  show,
}
