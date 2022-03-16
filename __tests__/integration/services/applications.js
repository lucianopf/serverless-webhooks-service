const applicationService = require('../../../src/services/applications')
const { Applications } = require('../../../src/database')

const APP_ID = 'create_service_1'

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
        expect(error).toHaveProperty('name', 'ValidationError')
        expect(error.errors).toContain('Application already exists')
      }
    })

    it('creating without app_id', async () => {
      try {
        await applicationService.create({})
      } catch (error) {
        expect(error).toHaveProperty('name', 'ValidationException')
        expect(error.message).toContain('One of the required keys was not given a value')
      }
    })
  })

  describe('show',() => {
    let application

    beforeEach(async () => {
      application = await applicationService.create({
        app_id: APP_ID,
      })
    })

    afterAll(() => {
      return Applications.delete(APP_ID).catch()
    })

    it('show existing app_id', async () => {
      const response = await applicationService.show(APP_ID)      

      expect(response).toHaveProperty('app_id', APP_ID)
      expect(response).toHaveProperty('created_at')
      expect(response).toHaveProperty('updated_at')
      expect(response).toHaveProperty('status', 'active')
      expect(response).toHaveProperty('api_key', application.api_key)
    })

    it('show non existing app_id', async () => {
      const response = await applicationService.show('invalid_random_id')
     
      expect(response).toBe(undefined)
    })

    it('show with invalid app_id', async () => {
      let response = null

      try {
        response = await applicationService.show()
      } catch (error) {
        expect(error).toHaveProperty('name', 'ValidationError')
        expect(error).toHaveProperty('type', 'ValidationError')
        expect(error.errors).toContain('The number of conditions on the keys is invalid')
      }

      expect(response).toBe(null)
    })
  })
})
