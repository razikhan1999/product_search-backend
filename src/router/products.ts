import { Router } from 'express'

import { getProducts,searchProducts} from '../controller'


const router = Router()

router.get('/', getProducts)
router.get('/search', searchProducts)


export default router
