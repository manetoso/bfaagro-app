import { createUsuario, findUsuario, login, updateUsuario, deleteUsuario } from '../controllers/UsuariosController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findUsuario)
router.post('/', [], createUsuario)
router.post('/login', [], login)
router.put('/:idUsuario', [], updateUsuario)
router.delete('/:idUsuario', [], deleteUsuario)

export default router