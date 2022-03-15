import { mapHandlers } from '../utils/handlers'

const applications = require('./applications')

function getHandlersDefinitions () {
  const applicationHandlers = mapHandlers(applications, 'applications')

  return {
    ...applicationHandlers,
  }
}

export {
  getHandlersDefinitions,
}
