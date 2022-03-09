const applications = require('./applications')

const verbsMap = {
  'list': 'GET',
  'show': 'GET',
  'create': 'POST',
  'update': 'PATCH',
}

const pathsMap = {
  'list': '',
  'show': '/{id}',
  'create': '',
  'update': '/{id}',
}

function mapHandlers (handler, prefix) {
  console.log(__dirname)
  return Object.keys(handler)
    .map(action => ({
      [`${prefix}-${action}`]: {
        handler: `src/handlers/${prefix}.${action}`,
        events: [
          {
            httpApi: {
              path: `/${prefix}${pathsMap[action]}`,
              method: verbsMap[action],
            },
          },
        ],
      },
    }))
    .reduce((result, acc) => {
      return { ...result, ...acc }
    }, {})
}

function getHandlersDefinitions () {
  const applicationHandlers = mapHandlers(applications, 'applications')

  return {
    ...applicationHandlers,
  }
}

module.exports = {
  getHandlersDefinitions,
}
