import { app } from '@/main/config/app'
import { reset, set } from 'mockdate'

import request from 'supertest'

describe('File Routes', () => {
  beforeAll(() => {
    set(new Date(2022, 1, 15, 12, 0, 15))
  })

  afterAll(() => {
    reset()
  })

  describe('POST /api/files/upload', () => {
    const uploadSpy = jest.fn()
    jest.mock('@/infra/gateways/local-system-file-storage', () => ({
      LocalSystemFileStorage: jest.fn().mockImplementation(() => ({ upload: uploadSpy }))
    }))

    it('should return 200 with valid data', async () => {
      const { status, body } = await request(app)
        .post('/api/files/upload')
        .attach('file', Buffer.from('any_buffer'), { filename: 'any_name', contentType: 'application/gzip' })

      expect(status).toBe(200)
      expect(body).toEqual({ fileName: 'any_name_20220215120015.gzip' })
    })
  })
})
