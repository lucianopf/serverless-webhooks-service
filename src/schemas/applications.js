const yup = require('yup')

const create = yup.object({
  app_id: yup.string().defined().required(),
  name: yup.string().nullable(),
  secret: yup.string().nullable(),
}).noUnknown()

const show = yup.object({
  id: yup.string().defined().required(),
}).noUnknown()

module.exports = {
  create,
  show,
}