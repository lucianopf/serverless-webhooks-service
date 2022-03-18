const codes = {
  200: 'sucess',
  201: 'created',
  400: 'bad_request',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not_found',
  500: 'internal_server_error',
}

const messages = {
  200: 'Sucess',
  201: 'Created',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  500: 'Internal server error',
}

function sucess ({
  body = {},
  code,
  statusCode = 200,
}) {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      code: codes[statusCode] || code,
      data: body,
    }),
  }
}

function error ({
  code,
  message,
  statusCode = 500,
} = {}) {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      code: codes[statusCode] || code,
      message: message || messages[statusCode],
    }),
  }
}

module.exports = {
  codes,
  error,
  messages,
  sucess,
}