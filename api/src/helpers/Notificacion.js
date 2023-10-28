import { request, response } from 'express'

import {
  CUENTASxCOBRAR,
  CUENTASxPAGAR,
  NOTIFICACIONES
} from '../models/Index.js'
import { createNotificacion } from '../controllers/NotificacionesController.js'

import { makeObjectNotification } from '../helpers/Index.js'

const checkVencimientoCxC = async (req = request, res = response) => {
  try {
    const fechaActual = new Date()
    const fechaLimite = new Date(fechaActual)
    fechaLimite.setDate(fechaActual.getDate() + 5)
    const CxCPorVencer = await CUENTASxCOBRAR.find({
      FECHA_VENCIMIENTO: {
        $gte: fechaActual,
        $lte: fechaLimite
      }
    })
    for (const cxc of CxCPorVencer) {
      const fechaVencimiento = new Date(
        cxc.FECHA_VENCIMIENTO
      ).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })

      const existingNotification = await NOTIFICACIONES.findOne({
        'NOTIFICACION.NOTIFICACION': `LA SIGUIENTE CUENTA POR COBRAR ESTA A PUNTO DE VENCER. Folio CxC = ${cxc.FOLIO_CXC} FECHA VENCIMIENTO = ${fechaVencimiento}`
      })
      if (!existingNotification) {
        const NOTIFICACION = makeObjectNotification('CUENTAS_COBRAR')
        NOTIFICACION.NOTIFICACION += `Folio CxC = ${cxc.FOLIO_CXC} FECHA VENCIMIENTO = ${fechaVencimiento}`
        await createNotificacion({ NOTIFICACION })
      }
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
      }
    })
    for (const cxc of CxCPorVencer) {
      const fechaPago = new Date(cxc.FECHA_PAGO).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })

      const existingNotification = await NOTIFICACIONES.findOne({
        'NOTIFICACION.NOTIFICACION': `LA SIGUIENTE CUENTA POR PAGAR ESTA A PUNTO DE VENCER. Folio CxP = ${cxc.FOLIO_CXP} FECHA PAGO = ${fechaPago}`
      })
      if (!existingNotification) {
        const NOTIFICACION = makeObjectNotification('CUENTAS_PAGAR')
        NOTIFICACION.NOTIFICACION += `Folio CxP = ${cxc.FOLIO_CXP} FECHA PAGO = ${fechaPago}`
        await createNotificacion({ NOTIFICACION })
      }
    }
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export { checkVencimientoCxC, checkVencimientoCxP }
