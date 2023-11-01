import {
  findTiposDocumentos,
  findTiposDocumentosByType,
  createTipoDocumento,
  deleteTipoDocumento,
  updateTipoDocumento
} from '../controllers/TiposDocumentosController.js'
import { Router } from 'express'
import { validateFields, validateJWT } from '../middlewares/Index.js'

const router = Router()

router.get('/', [validateJWT, validateFields], findTiposDocumentos)
router.get('/:tipoDocumentos', [validateJWT, validateFields], findTiposDocumentosByType)
router.post('/', [validateJWT, validateFields], createTipoDocumento)
router.put('/:idTipoDocumento', [validateJWT, validateFields], updateTipoDocumento)
router.delete('/:idTipoDocumento', [validateJWT, validateFields], deleteTipoDocumento)

export default router
