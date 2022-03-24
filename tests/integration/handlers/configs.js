const configHandler = require('../../../src/handlers/configs')
const { Configs } = require('../../../src/database')

const APP_ID = 'config_handler_1'

const cleanConfigs = async () => {
  const configs = await Configs.query('app_id').eq(APP_ID).exec()
  const configIds = configs.map(({ id }) => id)
  return Promise.all(
    configIds.map(id => Configs.delete(id).catch())
  )
}

describe('Config handler', () => {
  beforeEach(() => {
    return cleanConfigs()
  })

  describe('create',() => {
    it('creating using required attributes', async () => {
      const {
        body,
        statusCode,
      } = await configHandler.create({
        body: JSON.stringify({
          app_id: APP_ID,
          name: 'config 1',
          url: 'https://test.com/webhooks',
          method: 'POST',
          events: ['users'],
        }),
      })

      const response = JSON.parse(body)

      expect(statusCode).toBe(201)
      expect(response.code).toBe('created')
      expect(response.data).toHaveProperty('app_id', APP_ID)
      expect(response.data).toHaveProperty('id')
      expect(response.data).toHaveProperty('created_at')
      expect(response.data).toHaveProperty('updated_at')
      expect(response.data).toHaveProperty('status', 'active')
      expect(response.data).toHaveProperty('method', 'POST')
      expect(response.data).toHaveProperty('retries_max', 10)
      expect(response.data).toHaveProperty('failure_count', 0)
      expect(response.data).toHaveProperty('retries_strategy', 'linear')
      expect(response.data).toHaveProperty('retries_delay', 60)
      expect(response.data).toHaveProperty('url', 'https://test.com/webhooks')
      expect(response.data).toHaveProperty('name', 'config 1')
      expect(response.data).toHaveProperty('events', ['users'])
    })

    it('creating without required attributes', async () => {
      const {
        body,
        statusCode,
      } = await configHandler.create({
        body: `{}`,
      })

      const response = JSON.parse(body)

      expect(statusCode).toBe(400)
      expect(response.code).toBe('bad_request')
      expect(response.message).toBe('app_id must be defined,app_id is a required field,url must be defined,url is a required field,method must be defined,method is a required field')
    })

    it('creating with required and optional attrivutes', async () => {
      const {
        body,
        statusCode,
      } = await configHandler.create({
        body: JSON.stringify({
          app_id: APP_ID,
          name: 'config 1',
          url: 'https://test.com/webhooks',
          method: 'POST',
          events: ['users'],
          retries_max: 3,
          retries_delay: 120,
          retries_strategy: 'exponential',
        }),
      })

      const response = JSON.parse(body)

      expect(statusCode).toBe(201)
      expect(response.code).toBe('created')
      expect(response.data).toHaveProperty('app_id', APP_ID)
      expect(response.data).toHaveProperty('id')
      expect(response.data).toHaveProperty('created_at')
      expect(response.data).toHaveProperty('updated_at')
      expect(response.data).toHaveProperty('status', 'active')
      expect(response.data).toHaveProperty('method', 'POST')
      expect(response.data).toHaveProperty('retries_max', 3)
      expect(response.data).toHaveProperty('failure_count', 0)
      expect(response.data).toHaveProperty('retries_strategy', 'exponential')
      expect(response.data).toHaveProperty('retries_delay', 120)
      expect(response.data).toHaveProperty('url', 'https://test.com/webhooks')
      expect(response.data).toHaveProperty('name', 'config 1')
      expect(response.data).toHaveProperty('events', ['users'])
    })

    it('creating with invalid params', async () => {
      const {
        body,
        statusCode,
      } = await configHandler.create({
        body: JSON.stringify({
          app_id: APP_ID,
          name: 'config 1',
          url: 'https://test.com/webhooks',
          method: 'POST',
          events: 'users',
        }),
      })

      const response = JSON.parse(body)

      expect(statusCode).toBe(400)
      expect(response.code).toBe('bad_request')
      expect(response.message).toContain('events must be a `array` type, but the final value was: `null` (cast from the value `"users"`).')
    })

    it('creating with invalid JSON', async () => {
      const {
        body,
        statusCode,
      } = await configHandler.create({
        body: `invalid JSON`,
      })

      const response = JSON.parse(body)

      expect(statusCode).toBe(500)
      expect(response.code).toBe('internal_server_error')
      expect(response.message).toBe('Internal server error')
    })
  })

  describe('show',() => {
    let config

    beforeEach(async () => {
      const configResponse = await configHandler.create({
        body: JSON.stringify({
          app_id: APP_ID,
          name: 'config 1',
          url: 'https://test.com/webhooks',
          method: 'POST',
          events: ['users'],
        }),
      })

      config = JSON.parse(configResponse.body).data
    })

    it('show existing id', async () => {
      const response = await configHandler.show({
        pathParameters: {
          id: config.id,
        },
      })

      const body = JSON.parse(response.body)

      expect(response.statusCode).toBe(200)
      expect(body.code).toBe('sucess')
      expect(body.data).toHaveProperty('app_id', APP_ID)
      expect(body.data).toHaveProperty('id')
      expect(body.data).toHaveProperty('created_at')
      expect(body.data).toHaveProperty('updated_at')
      expect(body.data).toHaveProperty('status', 'active')
      expect(body.data).toHaveProperty('method', 'POST')
      expect(body.data).toHaveProperty('retries_max', 10)
      expect(body.data).toHaveProperty('failure_count', 0)
      expect(body.data).toHaveProperty('retries_strategy', 'linear')
      expect(body.data).toHaveProperty('retries_delay', 60)
      expect(body.data).toHaveProperty('url', 'https://test.com/webhooks')
      expect(body.data).toHaveProperty('name', 'config 1')
      expect(body.data).toHaveProperty('events', ['users'])
    })

    it('show non existing id', async () => {
      const response = await configHandler.show({
        pathParameters: {
          id: 'fake_non_existing_application',
        },
      })

      const body = JSON.parse(response.body)

      expect(response.statusCode).toBe(404)
      expect(body.code).toBe('not_found')
    })

    it('show with invalid id', async () => {
      const response = await configHandler.show({
        pathParameters: {
          id: null,
        },
      })

      const body = JSON.parse(response.body)

      expect(response.statusCode).toBe(400)
      expect(body.code).toBe('bad_request')
      expect(body).toHaveProperty('message')
      
    })
  })

  describe('list',() => {
    let config

    beforeEach(async () => {
      const configResponse = await configHandler.create({
        body: JSON.stringify({
          app_id: APP_ID,
          name: 'config 1',
          url: 'https://test.com/webhooks',
          method: 'POST',
          events: ['users'],
        }),
      })

      config = JSON.parse(configResponse.body).data
    })

    it('list existing app_id', async () => {
      const response = await configHandler.list({
        queryStringParameters: {
          app_id: APP_ID,
        },
      })

      const body = JSON.parse(response.body)

      expect(response.statusCode).toBe(200)
      expect(body.code).toBe('sucess')
      expect(body.data).toHaveLength(1)
      expect(body.data[0]).toHaveProperty('app_id', APP_ID)
      expect(body.data[0]).toHaveProperty('id')
      expect(body.data[0]).toHaveProperty('created_at')
      expect(body.data[0]).toHaveProperty('updated_at')
      expect(body.data[0]).toHaveProperty('status', 'active')
      expect(body.data[0]).toHaveProperty('method', 'POST')
      expect(body.data[0]).toHaveProperty('retries_max', 10)
      expect(body.data[0]).toHaveProperty('failure_count', 0)
      expect(body.data[0]).toHaveProperty('retries_strategy', 'linear')
      expect(body.data[0]).toHaveProperty('retries_delay', 60)
      expect(body.data[0]).toHaveProperty('url', 'https://test.com/webhooks')
      expect(body.data[0]).toHaveProperty('name', 'config 1')
      expect(body.data[0]).toHaveProperty('events', ['users'])
    })

    it('list app_id without configs', async () => {
      const response = await configHandler.list({
        queryStringParameters: {
          app_id: 'fake_non_existing_application',
        },
      })

      const body = JSON.parse(response.body)

      expect(response.statusCode).toBe(200)
      expect(body.code).toBe('sucess')
      expect(body.data).toHaveLength(0)
    })

    it('list with invalid id', async () => {
      const response = await configHandler.show({
        queryStringParameters: {
          app_id: null,
        },
      })

      const body = JSON.parse(response.body)

      expect(response.statusCode).toBe(400)
      expect(body.code).toBe('bad_request')
      expect(body).toHaveProperty('message')
      
    })
  })
})
