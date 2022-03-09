const applicationService = require('../services/applications')

async function create (event) {}

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