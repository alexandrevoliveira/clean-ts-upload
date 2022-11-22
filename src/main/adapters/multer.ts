import { RequestHandler } from 'express'
import multer from 'multer'

export const adaptMulter: RequestHandler = (req, res, next) => {
  const upload = multer().single('file')
  upload(req, res, err => {
    if (err === undefined) next()
  })
}
