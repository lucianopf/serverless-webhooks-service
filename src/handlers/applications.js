const applicationService = require('../services/applications')

async function create (event) {
  const { body: rawBody } = event
  const body = JSON.parse(rawBody)

  return applicationService.create(body)
}

async function list (event) {
  return applicationService.list()
}

async function show (event) {
  return 'showing application'
}

async function update (event) {}


module.exports = {
  create,
  list,
  show,
  update,
}