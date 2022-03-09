async function create (requester, payload) {
  return 'created'
}

async function list (requester) {
  return [{ foo: 'ao', bar: true }]
}

module.exports = {
  create,
  list,
}