import { Request, Response, Router } from 'express'

import products from './products'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.send('gofleet coding challenge...')
})

router.use('/products', products)

export default router
