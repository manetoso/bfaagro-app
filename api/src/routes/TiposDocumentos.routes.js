import {
  findTiposDocumentos,
  findTiposDocumentosByType,
  createTipoDocumento,
  deleteTipoDocumento,
  updateTipoDocumento
} from '../controllers/TiposDocumentosController.js'
import { Router } from 'express'
import { validateFields, validateJWT, validateRol } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateRol, validateFields], findTiposDocumentos)
router.get('/:tipoDocumentos', [validateJWT, validateRol, validateFields], findTiposDocumentosByType)
router.post('/', [validateJWT, validateRol, validateFields], createTipoDocumento)
router.put('/:idTipoDocumento', [validateJWT, validateRol, validateFields], updateTipoDocumento)
router.delete('/:idTipoDocumento', [validateJWT, validateRol, validateFields], deleteTipoDocumento)

export default router
