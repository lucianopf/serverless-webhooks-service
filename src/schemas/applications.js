const yup = require('yup')

const createApplications = yup.object({
  app_id: yup.string().defined().required(),
  name: yup.string().nullable(),
  secret: yup.string().nullable(),
}).noUnknown()

module.exports = {
  createApplications,
}