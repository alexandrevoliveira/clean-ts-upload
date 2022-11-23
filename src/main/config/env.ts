import { join } from 'path'

export const env = {
  paths: {
    upload: process.env.LOCAL_UPLOAD_PATH ?? join(__dirname, '../../../tmp')
  },
  port: process.env.PORT ?? 3000
}
