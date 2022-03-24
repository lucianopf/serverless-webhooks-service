const configsService = require('../../../src/services/configs')
const { Configs } = require('../../../src/database')

const APP_ID = 'configs_service_1'

const cleanConfigs = async () => {
  const configs = await Configs.query('app_id').eq(APP_ID).exec()
  const configIds = configs.map(({ id }) => id)
  return Promise.all(
    configIds.map(id => Configs.delete(id).catch())
  )
}

describe('Configs service', () => {
  beforeEach(cleanConfigs)

  describe('create',() => {
    it('creating using all required attributes', async () => {
      const response = await configsService.create({
        app_id: APP_ID,
        name: 'config 1',
        url: 'https://test.com/webhooks',
        method: 'POST',
        events: ['users'],
      })

      expect(response).toHaveProperty('app_id', APP_ID)
      expect(response).toHaveProperty('id')
      expect(response).toHaveProperty('created_at')
      expect(response).toHaveProperty('updated_at')
      expect(response).toHaveProperty('status', 'active')
      expect(response).toHaveProperty('method', 'POST')
      expect(response).toHaveProperty('retries_max', 10)
      expect(response).toHaveProperty('failure_count', 0)
      expect(response).toHaveProperty('retries_strategy', 'linear')
      expect(response).toHaveProperty('retries_delay', 60)
      expect(response).toHaveProperty('url', 'https://test.com/webhooks')
      expect(response).toHaveProperty('name', 'config 1')
      expect(response).toHaveProperty('events', ['users'])
    })

    it('creating using required and optional attributes', async () => {
      const response = await configsService.create({
        app_id: APP_ID,
        name: 'config 1',
        url: 'https://test.com/webhooks',
        method: 'POST',
        events: ['users'],
        retries_max: 3,
        retries_delay: 120,
        retries_strategy: 'exponential',
      })

      expect(response).toHaveProperty('app_id', APP_ID)
      expect(response).toHaveProperty('id')
      expect(response).toHaveProperty('created_at')
      expect(response).toHaveProperty('updated_at')
      expect(response).toHaveProperty('status', 'active')
      expect(response).toHaveProperty('method', 'POST')
      expect(response).toHaveProperty('retries_max', 3)
      expect(response).toHaveProperty('failure_count', 0)
      expect(response).toHaveProperty('retries_strategy', 'exponential')
      expect(response).toHaveProperty('retries_delay', 120)
      expect(response).toHaveProperty('url', 'https://test.com/webhooks')
      expect(response).toHaveProperty('name', 'config 1')
      expect(response).toHaveProperty('events', ['users'])
    })

    it('creating enforcing id', async () => {
      try {
        await configsService.create({
          app_id: APP_ID,
          name: 'config 1',
          url: 'https://test.com/webhooks',
          method: 'POST',
          events: ['users'],
          id: 'arbitrary id'
        })
      } catch (error) {
        expect(error).toHaveProperty('name', 'ConditionalCheckFailedException')
        expect(error.message).toContain('The conditional request failed')
      }
    })

    it('creating without app_id', async () => {
      try {
        await configsService.create({})
      } catch (error) {
        expect(error).toHaveProperty('name', 'ValidationError')
        expect(error.message).toContain('app_id is a required property but has no value when trying to save document')
      }
    })
  })

  describe('show',() => {
    let config

    beforeEach(async () => {
      config = await configsService.create({
        app_id: APP_ID,
        name: 'config 1',
        url: 'https://test.com/webhooks',
        method: 'POST',
        events: ['users'],
      })
    })

    afterAll(cleanConfigs)

    it('show existing config', async () => {
      const response = await configsService.show(config.id)      

      expect(response).toHaveProperty('app_id', APP_ID)
      expect(response).toHaveProperty('id', config.id)
      expect(response).toHaveProperty('created_at')
      expect(response).toHaveProperty('updated_at')
      expect(response).toHaveProperty('status', 'active')
      expect(response).toHaveProperty('method', 'POST')
      expect(response).toHaveProperty('retries_max', 10)
      expect(response).toHaveProperty('failure_count', 0)
      expect(response).toHaveProperty('retries_strategy', 'linear')
      expect(response).toHaveProperty('retries_delay', 60)
      expect(response).toHaveProperty('url', 'https://test.com/webhooks')
      expect(response).toHaveProperty('name', 'config 1')
      expect(response).toHaveProperty('events', ['users'])
    })

    it('show non existing app_id', async () => {
      const response = await configsService.show('invalid_random_id')
     
      expect(response).toBe(undefined)
    })

    it('show with invalid app_id', async () => {
      let response = null

      try {
        response = await configsService.show()
      } catch (error) {
        expect(error).toHaveProperty('name', 'ValidationError')
        expect(error).toHaveProperty('type', 'ValidationError')
        expect(error.errors).toContain('The number of conditions on the keys is invalid')
      }

      expect(response).toBe(null)
    })
  })

  describe('list',() => {
    let config

    beforeEach(async () => {
      config = await configsService.create({
        app_id: APP_ID,
        name: 'config 1',
        url: 'https://test.com/webhooks',
        method: 'POST',
        events: ['users'],
      })
    })

    afterAll(cleanConfigs)

    it('list existing config', async () => {
      const responses = await configsService.list(APP_ID)

      expect(responses).toHaveLength(1)

      const [ response ] = responses
      
      expect(response).toHaveProperty('id', config.id)
      expect(response).toHaveProperty('created_at')
      expect(response).toHaveProperty('updated_at')
      expect(response).toHaveProperty('status', 'active')
      expect(response).toHaveProperty('method', 'POST')
      expect(response).toHaveProperty('retries_max', 10)
      expect(response).toHaveProperty('failure_count', 0)
      expect(response).toHaveProperty('retries_strategy', 'linear')
      expect(response).toHaveProperty('retries_delay', 60)
      expect(response).toHaveProperty('url', 'https://test.com/webhooks')
      expect(response).toHaveProperty('name', 'config 1')
      expect(response).toHaveProperty('events', ['users'])
    })

    it('list non existing app_id', async () => {
      const response = await configsService.list('invalid_random_id')
     
      expect(response).toHaveLength(0)
      expect(JSON.stringify(response)).toBe('[]')
    })
  })
})
