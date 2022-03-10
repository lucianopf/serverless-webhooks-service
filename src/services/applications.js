const { Applications } = require('../database')

async function create (payload) {
  return Applications.create(payload)
}

async function list () {
  return [{ foo: 'ao', bar: true }]
}

module.exports = {
  create,
  list,
}