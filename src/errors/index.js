class ValidationError extends Error {
  constructor(errors) {
    super()
    this.name = 'ValidationError'
    this.type = 'ValidationError'
    this.errors = errors 
  }
}

module.exports = {
  ValidationError,
}
