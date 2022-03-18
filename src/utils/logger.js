const {
  LOG_LEVEL = 'all',
} = process.env


const levels = {
  error: 1,
  info: 2,
  debug: 3,
  all: 4,
}

const makeLogger = (name) => {
  const defaultLog = { name }

  const log = (level) => (data) => console.log(JSON.stringify({ ...defaultLog, level, ...data }))
  const nop = () => undefined

  return {
    error: levels[LOG_LEVEL] >= 1 ? log('error') : nop,
    info: levels[LOG_LEVEL] >= 2 ? log('info') : nop,
    debug: levels[LOG_LEVEL] >= 3 ? log('debug') : nop,
  }
}

module.exports = makeLogger