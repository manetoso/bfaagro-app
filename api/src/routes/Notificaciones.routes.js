import { findNotificaciones, createNotificacionBySystem, deleteNotificacion, updateNotificacion, changeNotificacionVista } from '../controllers/NotificacionesController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findNotificaciones)
router.post('/', [validateJWT, validateRol, validateFields], createNotificacionBySystem)
router.put('/:idNotificacion', [validateJWT, validateRol, validateFields], updateNotificacion)
router.put('cambiarvista/:idNotificacion', [validateJWT, validateRol, validateFields], changeNotificacionVista)
router.delete('/:idNotificacion', [validateJWT, validateRol, validateFields], deleteNotificacion)

export default router
