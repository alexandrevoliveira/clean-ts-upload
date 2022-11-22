import { ServerError } from '@/application/errors'
import { RequestHandler } from 'express'
import multer from 'multer'

export const adaptMulter: RequestHandler = (req, res, next) => {
  const upload = multer().single('file')
  upload(req, res, err => {
    if (err !== undefined) {
      return res.status(500).json({ error: new ServerError(err).message })
    }
    next()
  })
}
