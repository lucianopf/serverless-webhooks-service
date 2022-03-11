const { mapHandlers } = require('../../../src/utils/handlers')

describe('Handlers util', () => {
  describe('mapHandlers', () => {
    it('expect empty handler return no handlers', () => {
      const handler = {}

      const response = mapHandlers(handler, 'test-handler')

      expect(response).toMatchObject({})
    })

    it('expect handler with create return POST handler', () => {
      const handler = {
        create: () => true,
      }

      const response = mapHandlers(handler, 'test-handler')

      expect(response).toHaveProperty('test-handler-create')
      expect(response['test-handler-create']).toHaveProperty('handler')
      expect(response['test-handler-create']).toHaveProperty('events')
      expect(response['test-handler-create'].events).toHaveLength(1)

      const expectedOutput = {
        'test-handler-create': {
          handler: 'src/handlers/test-handler.create',
          events: [
            {
              httpApi: {
                path: '/test-handler',
                method: 'POST',
              },
            },
          ],
        },
      }

      expect(response).toMatchObject(expectedOutput)
    })

    it('expect handler with list return GET handler', () => {
      const handler = {
        list: () => true,
      }

      const response = mapHandlers(handler, 'test-handler')

      expect(response).toHaveProperty('test-handler-list')
      expect(response['test-handler-list']).toHaveProperty('handler')
      expect(response['test-handler-list']).toHaveProperty('events')
      expect(response['test-handler-list'].events).toHaveLength(1)

      const expectedOutput = {
        'test-handler-list': {
          handler: 'src/handlers/test-handler.list',
          events: [
            {
              httpApi: {
                path: '/test-handler',
                method: 'GET',
              },
            },
          ],
        },
      }

      expect(response).toMatchObject(expectedOutput)
    })

    it('expect handler with show return GET /{id} handler', () => {
      const handler = {
        show: () => true,
      }

      const response = mapHandlers(handler, 'test-handler')

      expect(response).toHaveProperty('test-handler-show')
      expect(response['test-handler-show']).toHaveProperty('handler')
      expect(response['test-handler-show']).toHaveProperty('events')
      expect(response['test-handler-show'].events).toHaveLength(1)

      const expectedOutput = {
        'test-handler-show': {
          handler: 'src/handlers/test-handler.show',
          events: [
            {
              httpApi: {
                path: '/test-handler/{id}',
                method: 'GET',
              },
            },
          ],
        },
      }

      expect(response).toMatchObject(expectedOutput)
    })

    it('expect handler with update return PATCH /{id} handler', () => {
      const handler = {
        update: () => true,
      }

      const response = mapHandlers(handler, 'test-handler')

      expect(response).toHaveProperty('test-handler-update')
      expect(response['test-handler-update']).toHaveProperty('handler')
      expect(response['test-handler-update']).toHaveProperty('events')
      expect(response['test-handler-update'].events).toHaveLength(1)

      const expectedOutput = {
        'test-handler-update': {
          handler: 'src/handlers/test-handler.update',
          events: [
            {
              httpApi: {
                path: '/test-handler/{id}',
                method: 'PATCH',
              },
            },
          ],
        },
      }

      expect(response).toMatchObject(expectedOutput)
    })

    it('expect handler with all actions to return full handler', () => {
      const handler = {
        create: () => true,
        list: () => true,
        show: () => true,
        update: () => true,
      }

      const response = mapHandlers(handler, 'test-handler')

      const expectedOutput = {
        'test-handler-create': {
          handler: 'src/handlers/test-handler.create',
          events: [
            {
              httpApi: {
                path: '/test-handler',
                method: 'POST',
              },
            },
          ],
        },
        'test-handler-list': {
          handler: 'src/handlers/test-handler.list',
          events: [
            {
              httpApi: {
                path: '/test-handler',
                method: 'GET',
              },
            },
          ],
        },
        'test-handler-show': {
          handler: 'src/handlers/test-handler.show',
          events: [
            {
              httpApi: {
                path: '/test-handler/{id}',
                method: 'GET',
              },
            },
          ],
        },
        'test-handler-update': {
          handler: 'src/handlers/test-handler.update',
          events: [
            {
              httpApi: {
                path: '/test-handler/{id}',
                method: 'PATCH',
              },
            },
          ],
        },
      }

      expect(response).toMatchObject(expectedOutput)
    })
  })
})
