const { mapHandlers } = require('../utils/handlers')

const applications = require('./applications')
const configs = require('./configs')

function getHandlersDefinitions () {
  const applicationHandlers = mapHandlers(applications, 'applications')
  const configHandlers = mapHandlers(configs, 'configs')

  return {
    ...applicationHandlers,
    ...configHandlers,
  }
}

module.exports = {
  getHandlersDefinitions,
}
