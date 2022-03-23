const yup = require('yup')

const create = yup.object({
  app_id: yup.string().defined().required(),
  name: yup.string().nullable(),
  url: yup.string().defined().required(),
  method: yup.string().oneOf([
    'POST',
    'PUT',
    'PATCH',
  ]).defined().required(),
  events: yup.array().of(yup.string()),
  retries_max: yup.number(),
  retries_delay: yup.number(),
  retries_strategy: yup.string().oneOf(['linear', 'exponential']),
  failure_count: yup.number(),
  status: yup.string().oneOf([
    'active',
    'blocked',
    'disabled',
    'deleted',
  ]),
}).noUnknown()

const list = yup.object({
  app_id: yup.string().defined().required(),
}).noUnknown()

const show = yup.object({
  id: yup.string().defined().required(),
}).noUnknown()

module.exports = {
  create,
  list,
  show,
}