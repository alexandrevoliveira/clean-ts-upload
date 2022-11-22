export const env = {
  paths: {
    upload: process.env.LOCAL_UPLOAD_PATH ?? './tmp'
  },
  port: process.env.PORT ?? 3000
}
