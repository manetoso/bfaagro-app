import { Router } from 'express'
import hola from '../controllers/hola.js'
const router = Router()

router.get('/hola', hola)

export default router
