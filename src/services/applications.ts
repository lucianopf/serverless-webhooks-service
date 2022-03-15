import { Applications } from '../database'

async function create (payload) {
  return Applications.create(payload)
}

async function show (id) {
  return Applications.get(id)
}

export {
  create,
  show,
}
