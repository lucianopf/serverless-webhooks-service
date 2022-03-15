const applicationService = require('../../../src/services/applications')
const { Applications } = require('../../../src/database')

const APP_ID = 'create_1'

describe('Application service', () => {
  beforeEach(() => {
    return Applications.delete(APP_ID).catch()
  })

  describe('create',() => {
    it('creating using only app_id', async () => {
      const response = await applicationService.create({
        app_id: APP_ID,
      })

      expect(response).toHaveProperty('app_id', APP_ID)
      expect(response).toHaveProperty('created_at')
      expect(response).toHaveProperty('updated_at')
      expect(response).toHaveProperty('status', 'active')
      expect(response).toHaveProperty('api_key')
    })

    it('creating using app_id and secret', async () => {
      const response = await applicationService.create({
        app_id: APP_ID,
        secret: 'super.secret.key'
      })

      expect(response).toHaveProperty('app_id', APP_ID)
      expect(response).toHaveProperty('secret', 'super.secret.key')
      expect(response).toHaveProperty('created_at')
      expect(response).toHaveProperty('updated_at')
      expect(response).toHaveProperty('status', 'active')
      expect(response).toHaveProperty('api_key')
    })

    it('creating using app_id and status', async () => {
      try {
        await applicationService.create({
          app_id: APP_ID,
          status: 'super_power_status',
        })
      } catch (error) {
        expect(error).toHaveProperty('name', 'ValidationError')
        expect(error.message).toContain('status must equal')
      }
    })

    it('creating using existing app_id', async () => {
      await applicationService.create({
        app_id: APP_ID,
      })

      try {
        await applicationService.create({
          app_id: APP_ID,
        })
      } catch (error) {
        expect(error).toHaveProperty('name', 'ConditionalCheckFailedException')
        expect(error.message).toContain('The conditional request failed')
      }
    })

    it('creating without app_id', async () => {
      try {
        await applicationService.create()
      } catch (error) {
        expect(error).toHaveProperty('name', 'ValidationException')
        expect(error.message).toContain('One of the required keys was not given a value')
      }
    })
    
  })
})
