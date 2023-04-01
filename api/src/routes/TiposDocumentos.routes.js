import {
  findTiposDocumentos,
  findTiposDocumentosByType,
  createTipoDocumento,
  deleteTipoDocumento,
  updateTipoDocumento
} from '../controllers/TiposDocumentosController.js'
import { Router } from 'express'

const router = Router()

router.get('/', [], findTiposDocumentos)
router.get('/:tipoDocumentos', [], findTiposDocumentosByType)
router.post('/', [], createTipoDocumento)
router.put('/:idTipoDocumento', [], updateTipoDocumento)
router.delete('/:idTipoDocumento', [], deleteTipoDocumento)

export default router
