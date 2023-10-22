import { createUsuario, findUsuario, login, updateUsuario, deleteUsuario } from '../controllers/UsuariosController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findUsuario)
router.post('/', [validateJWT, validateRol, validateFields], createUsuario)
router.post('/login', [], login)
router.put('/:idUsuario', [validateJWT, validateRol, validateFields], updateUsuario)
router.delete('/:idUsuario', [validateJWT, validateRol, validateFields], deleteUsuario)

export default router