const yup = require('yup')

const create = yup.object({
  app_id: yup.string().defined().required(),
  config_id: yup.string().defined().required(),
  event_type: yup.string().defined().required(),
  payload: yup.string().defined().required(),
}).noUnknown()

const list = yup.object({
  app_id: yup.string().defined().required(),
}).noUnknown()

module.exports = {
  create,
  list,
  show,
}