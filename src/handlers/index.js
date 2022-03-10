const { mapHandlers } = require('../utils/handlers')

const applications = require('./applications')

function getHandlersDefinitions () {
  const applicationHandlers = mapHandlers(applications, 'applications')

  return {
    ...applicationHandlers,
  }
}

module.exports = {
  getHandlersDefinitions,
}
