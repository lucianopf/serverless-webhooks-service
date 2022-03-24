const webhooksService = require('../../../src/services/webhooks')
const { Webhooks } = require('../../../src/database')

const APP_ID = 'webhooks_service_1'
const CONFIG_ID = 'webhooks_config_1'

const cleanWebhooks = async () => {
  const webhooks = await Webhooks.query('app_id').eq(APP_ID).exec()
  const webhookIds = webhooks.map(({ id }) => id)
  return Promise.all(
    webhookIds.map(id => Webhooks.delete(id).catch())
  )
}

describe('Webhooks service', () => {
  beforeEach(cleanWebhooks)

  describe('create',() => {
    it('creating using all required attributes', async () => {
      const response = await webhooksService.create({
        app_id: APP_ID,
        config_id: CONFIG_ID,
        event_type: 'user.created',
        payload: JSON.stringify({
          name: 'luciano',
          status: 'active',
        }),
      })

      expect(response).toHaveProperty('app_id', APP_ID)
      expect(response).toHaveProperty('config_id', CONFIG_ID)
      expect(response).toHaveProperty('retries_count', 0)
      expect(response).toHaveProperty('payload', '{"name":"luciano","status":"active"}')
      expect(response).toHaveProperty('event_type', 'user.created')
      expect(response).toHaveProperty('id')
      expect(response).toHaveProperty('created_at')
      expect(response).toHaveProperty('updated_at')
    })

    it('creating enforcing id', async () => {
      try {
        await webhooksService.create({
          app_id: APP_ID,
          config_id: CONFIG_ID,
          event_type: 'user.created',
          payload: JSON.stringify({
            name: 'luciano',
            status: 'active',
          }),
          id: 'arbitrary id'
        })
      } catch (error) {
        expect(error).toHaveProperty('name', 'ConditionalCheckFailedException')
        expect(error.message).toContain('The conditional request failed')
      }
    })

    it('creating without app_id', async () => {
      try {
        await webhooksService.create({})
      } catch (error) {
        expect(error).toHaveProperty('name', 'ValidationError')
        expect(error.message).toContain('app_id is a required property but has no value when trying to save document')
      }
    })
  })

  describe('list',() => {
    let webhook

    beforeEach(async () => {
      webhook = await webhooksService.create({
        app_id: APP_ID,
        config_id: CONFIG_ID,
        event_type: 'user.created',
        payload: JSON.stringify({
          name: 'luciano',
          status: 'active',
        }),
      })
    })

    afterAll(cleanWebhooks)

    it('list existing webhooks', async () => {
      const responses = await webhooksService.list(APP_ID)

      expect(responses).toHaveLength(1)

      const [ response ] = responses

      expect(response).toHaveProperty('id', webhook.id)
      expect(response).toHaveProperty('app_id', APP_ID)
      expect(response).toHaveProperty('config_id', CONFIG_ID)
      expect(response).toHaveProperty('retries_count', 0)
      expect(response).toHaveProperty('payload', '{"name":"luciano","status":"active"}')
      expect(response).toHaveProperty('event_type', 'user.created')
      expect(response).toHaveProperty('created_at')
      expect(response).toHaveProperty('updated_at')
      expect(response).toHaveProperty('status', 'pending')
    })

    it('list non existing app_id', async () => {
      const response = await webhooksService.list('invalid_random_id')
     
      expect(response).toHaveLength(0)
      expect(JSON.stringify(response)).toBe('[]')
    })
  })
})
