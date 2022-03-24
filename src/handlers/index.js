const { mapHandlers } = require('../utils/handlers')

const applications = require('./applications')
const configs = require('./configs')
const webhooks = require('./webhooks')

function getHandlersDefinitions () {
  const applicationHandlers = mapHandlers(applications, 'applications')
  const configHandlers = mapHandlers(configs, 'configs')
  const webhookHandlers = mapHandlers(webhooks, 'webhooks')

  return {
    ...applicationHandlers,
    ...configHandlers,
    ...webhookHandlers,
  }
}

module.exports = {
  getHandlersDefinitions,
}
