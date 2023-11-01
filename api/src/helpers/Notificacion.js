import { request, response } from 'express'

import { CUENTASxCOBRAR, CUENTASxPAGAR } from '../models/Index.js'
import { createNotificacion } from '../controllers/NotificacionesController.js'

import { makeObjectNotification } from '../helpers/Index.js'

const checkVencimientoCxC = async (req = request, res = response) => {
  try {
    const fechaActual = new Date()
    const fechaLimite = new Date(fechaActual)
    fechaLimite.setDate(fechaActual.getDate() + 5)

    const CxCPorVencer = await CUENTASxCOBRAR.find({
      FECHA_VENCIMIENTO: { $lte: fechaLimite, $gte: fechaActual },
      NOTIFICADA: false
    })
    for (const cxc of CxCPorVencer) {
      const fechaVencimiento = new Date(
        cxc.FECHA_VENCIMIENTO
      ).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
      const NOTIFICACION = makeObjectNotification('CUENTAS_COBRAR')
      NOTIFICACION.NOTIFICACION += `Folio CxC = ${cxc.FOLIO_CXC} FECHA VENCIMIENTO = ${fechaVencimiento}`
      await createNotificacion({ NOTIFICACION })
      await CUENTASxCOBRAR.findByIdAndUpdate(cxc._id, { NOTIFICADA: true })
    }
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
const checkVencimientoCxP = async (req = request, res = response) => {
  try {
    const fechaActual = new Date()
    const fechaLimite = new Date(fechaActual)
    fechaLimite.setDate(fechaActual.getDate() + 5)
    const CxCPorVencer = await CUENTASxPAGAR.find({
      FECHA_PAGO: {
        $gte: fechaActual,
        $lte: fechaLimite
      },
      NOTIFICADA: false
    })
    for (const cxp of CxCPorVencer) {
      const fechaPago = new Date(cxp.FECHA_PAGO).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
      const NOTIFICACION = makeObjectNotification('CUENTAS_PAGAR')
      NOTIFICACION.NOTIFICACION += `Folio CxP = ${cxp.FOLIO_CXP} FECHA PAGO = ${fechaPago}`
      await createNotificacion({ NOTIFICACION })
      await CUENTASxPAGAR.findByIdAndUpdate(cxp._id, { NOTIFICADA: true })
    }
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export { checkVencimientoCxC, checkVencimientoCxP }
