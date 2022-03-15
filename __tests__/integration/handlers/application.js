const applicationHandler = require('../../../src/handlers/applications')
const { Applications } = require('../../../src/database')

const APP_ID = 'create_1'

describe('Application handler', () => {
  beforeEach(() => {
    return Applications.delete(APP_ID).catch()
  })

  describe('create',() => {
    it('creating using only app_id', async () => {
      const {
        body,
        statusCode,
      } = await applicationHandler.create({
        body: `{"app_id": "${APP_ID}"}`,
      })

      const response = JSON.parse(body)

      expect(statusCode).toBe(201)
      expect(response.code).toBe('created')
      expect(response.data).toHaveProperty('app_id', APP_ID)
      expect(response.data).toHaveProperty('created_at')
      expect(response.data).toHaveProperty('updated_at')
      expect(response.data).toHaveProperty('status', 'active')
      expect(response.data).toHaveProperty('api_key')
    })

    it('creating without app_id', async () => {
      const {
        body,
        statusCode,
      } = await applicationHandler.create({
        body: `{}`,
      })

      const response = JSON.parse(body)

      expect(statusCode).toBe(400)
      expect(response.code).toBe('bad_request')
      expect(response.message).toBe('app_id must be defined,app_id is a required field')
    })

    it('creating with full payload', async () => {
      const {
        body,
        statusCode,
      } = await applicationHandler.create({
        body: JSON.stringify({
          app_id: APP_ID,
          name: 'full payload example',
          secret: 'super secret secret',
        }),
      })

      const response = JSON.parse(body)

      expect(statusCode).toBe(201)
      expect(response.code).toBe('created')
      expect(response.data).toHaveProperty('app_id', APP_ID)
      expect(response.data).toHaveProperty('created_at')
      expect(response.data).toHaveProperty('updated_at')
      expect(response.data).toHaveProperty('status', 'active')
      expect(response.data).toHaveProperty('api_key')
      expect(response.data).toHaveProperty('name', 'full payload example')
      expect(response.data).toHaveProperty('secret', 'super secret secret')
    })

    it('creating with invalid params', async () => {
      const {
        body,
        statusCode,
      } = await applicationHandler.create({
        body: JSON.stringify({
          app_id: APP_ID,
          name: 'crazy app',
          status: 'admin',
          api_key: 'arbitrary api_key',
        }),
      })

      const response = JSON.parse(body)

      expect(statusCode).toBe(201)
      expect(response.code).toBe('created')
      expect(response.data).toHaveProperty('app_id', APP_ID)
      expect(response.data).toHaveProperty('created_at')
      expect(response.data).toHaveProperty('updated_at')
      expect(response.data).toHaveProperty('status', 'active')
      expect(response.data).toHaveProperty('api_key')
      expect(response.data).toHaveProperty('name', 'crazy app')
    })

    it('creating with an existing app_id', async () => {
      await applicationHandler.create({
        body: JSON.stringify({
          app_id: APP_ID,
        }),
      })

      const {
        body,
        statusCode,
      } = await applicationHandler.create({
        body: JSON.stringify({
          app_id: APP_ID,
        }),
      })

      const response = JSON.parse(body)

      expect(statusCode).toBe(400)
      expect(response.code).toBe('bad_request')
      expect(response.message).toBe('ConditionalCheckFailedException: The conditional request failed')
    })

    it('creating with invalid JSON', async () => {
      const {
        body,
        statusCode,
      } = await applicationHandler.create({
        body: `invalid JSON`,
      })

      const response = JSON.parse(body)

      expect(statusCode).toBe(500)
      expect(response.code).toBe('internal_server_error')
      expect(response.message).toBe('Internal server error')
    })
  })
})
