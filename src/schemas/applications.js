const yup = require('yup')

const createApplications = yup.object({
  app_id: yup.string().defined().required(),
  name: yup.string().nullable(),
  secret: yup.string().nullable(),
}).noUnknown()

const showApplications = yup.object({
  id: yup.string().defined().required(),
}).noUnknown()

module.exports = {
  createApplications,
  showApplications,
}