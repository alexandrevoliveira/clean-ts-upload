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
        .attach('file', Buffer.from('any_buffer'), { filename: 'any_name.gz', contentType: 'application/gzip' })

      expect(status).toBe(200)
      expect(body).toEqual({ fileName: '20220215120015_any_name.gz' })
    })

    it('should return 400 if input is invalid', async () => {
      const { status, body } = await request(app)
        .post('/api/files/upload')
        .attach('file', Buffer.from('any_buffer'), { filename: 'any_name', contentType: 'image/png' })

      expect(status).toBe(400)
      expect(body).toEqual({ error: 'Unsupported file. Allowed extensions: gz' })
    })
  })
})
