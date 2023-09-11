import { app } from '@/main/config/app'
import { exec } from 'child_process'
import { reset, set } from 'mockdate'

import request from 'supertest'
import { promisify } from 'util'

describe('File Routes', () => {
  beforeAll(() => {
    set(new Date(2022, 1, 15, 12, 0, 15))
  })

  afterAll(() => {
    reset()
  })

  afterEach(async () => {
    const execAsync = promisify(exec)
    await execAsync('rm -rf tmp/*_any_name*')
  })

  describe('POST /api/files/upload', () => {
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
        .attach('file', Buffer.from('any_buffer'), { filename: 'any_name.png', contentType: 'image/png' })

      expect(status).toBe(400)
      expect(body).toEqual({ error: 'Unsupported file. Allowed extensions: gz' })
    })
  })
})
