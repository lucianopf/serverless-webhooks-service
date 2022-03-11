const applicationService = require('../../../src/services/applications')

describe('Application service', () => {
  describe.skip('create',() => {
    it('creating with valid payload', async () => {
      const response = await applicationService.create()

      expect(Array.isArray(response)).toBe(true)
      expect(response).toHaveLength(1)
    })
  })
})