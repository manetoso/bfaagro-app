import { request, response } from 'express'
import { TIPOS_DOCUMENTOS, PROCESOS } from '../models/Index.js'
import { serverErrorMessage } from '../controllers/ControllerGlobal.js'
import { validateStockToProcess } from './Index.js'

const validateStatusChange = async (req = request, res = response, next) => {
  const idProccess = req.params.idProceso
  const actualProccess = await PROCESOS.findById(idProccess)
  const nextProccess = await calculateNextProccess(actualProccess.PROCESO)

  if (nextProccess == null) {
    const msg =
      'Hay un Error con los datos del identificador que se esta recibiendo, Verifiquelo'
    return serverErrorMessage(res, msg, 409)
  } else {
    const PROCESO = {
      ID_ESTADO: nextProccess._id,
      ESTADO: nextProccess.VALOR
    }
    req.body.PROCESO = PROCESO
    if (nextProccess.VALOR === 'FINALIZADO') {
      req.body.FORMULACION_DETALLE = actualProccess.FORMULA.FORMULACION_DETALLE
      return validateStockToProcess(req, res, next)
    } else {
      next()
    }
  }
}

const calculateNextProccess = async (PROCESO) => {
  let nextProccessStatus = ''
  switch (PROCESO.ESTADO) {
    case 'FINALIZADO':
      nextProccessStatus = null
      break
    default:
      nextProccessStatus = 'FINALIZADO'
      break
  }
  const nextProccess = await TIPOS_DOCUMENTOS.findOne({
    VALOR: nextProccessStatus
  })
  return nextProccess
}

export { validateStatusChange }
