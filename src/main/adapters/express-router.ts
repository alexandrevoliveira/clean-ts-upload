import { Controller } from '@/application/controllers'
import { Request, Response } from 'express'

export const adaptExpressRoute = (controller: Controller) => async (req: Request, res: Response): Promise<void> => {
  const httpResponse = await controller.handle({ ...req.body, ...req.locals })
  res.status(200).json(httpResponse.data)
}
