import { CUENTASxCOBRAR, CUENTASxPAGAR, NOTIFICACIONES } from '../models/Index.js'
import { makeObjectNotification } from './Index.js'
import { createNotificacion } from '../controllers/NotificacionesController.js'

const checkVencimientoCxC = async () => {
    try {
        const fechaActual = new Date();
        const fechaLimite = new Date(fechaActual);
        let NOTIFICACION;
        fechaLimite.setDate(fechaActual.getDate() + 5);
        let CxCPorVencer = await CUENTASxCOBRAR.find({ "FECHA_VENCIMIENTO": { $lte: fechaLimite, $gte: fechaActual }, "NOTIFICADA": false })
        for (const cxc of CxCPorVencer) {
            NOTIFICACION = makeObjectNotification("CUENTAS_COBRAR")
            NOTIFICACION.NOTIFICACION.NOTIFICACION += `\n VENTA = ${cxc.ID_VENTA}/n FECHA VENCIMIENTO = ${cxc.FECHA_VENCIMIENTO}`
            await createNotificacion(NOTIFICACION)
            await CUENTASxCOBRAR.findByIdAndUpdate(cxc._id, { NOTIFICADA: true })
        }
    } catch (error) {
        console.log(error);
    }
};
const checkVencimientoCxP = async () => {
    try {
        const fechaActual = new Date();
        const fechaLimite = new Date(fechaActual);
        let NOTIFICACION = {}
        fechaLimite.setDate(fechaActual.getDate() + 5);
        let CxPPorVencer = await CUENTASxPAGAR.find({ "FECHA_PAGO": { $lte: fechaLimite, $gte: fechaActual } })
        for (const cxp of CxPPorVencer) {
            NOTIFICACION = makeObjectNotification("CUENTAS_PAGAR")
            NOTIFICACION.NOTIFICACION.NOTIFICACION += `\n ORDEN DE COMPRA = ${cxp.ID_ORDEN_COMPRA}/n FECHA PAGO = ${cxp.FECHA_PAGO}`
            await createNotificacion(NOTIFICACION)
            await CUENTASxCOBRAR.findByIdAndUpdate(cxp._id, { NOTIFICADA: true })
        }
    } catch (error) {
        console.log(error);
    }
};

export { checkVencimientoCxC, checkVencimientoCxP }