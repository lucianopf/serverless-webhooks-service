const applicationService = require('../../../src/services/applications')

describe('Application service', () => {
  describe('list',() => {
    it('expect response to be an array', async () => {
      const response = await applicationService.list()

      expect(Array.isArray(response)).toBe(true)
      expect(response).toHaveLength(1)
    })
  })
})