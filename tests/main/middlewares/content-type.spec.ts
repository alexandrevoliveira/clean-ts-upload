import { app } from '@/main/config/app'

import request from 'supertest'

describe('Content Type', () => {
  it('should return json as default content type', async () => {
    app.get('/test_content_type', (req, res) => res.send(''))

    await request(app)
      .get('/test_content_type')
      .expect('content_type', /json/)
  })
})
