import { CUENTASxCOBRAR, CUENTASxPAGAR, NOTIFICACIONES } from '../models/Index.js'
import { makeObjectNotification } from '../helpers/Index.js'

const checkVencimientoCxC = async () => {
    try {
        const fechaActual = new Date();
        const fechaLimite = new Date(fechaActual);
        const NOTIFICACION = {}
        fechaLimite.setDate(fechaActual.getDate() + 5);
        const CxCPorVencer = await CUENTASxCOBRAR.find({ "FECHA_VENCIMIENTO": { $lte: fechaLimite } })
        for (const cxc of CxCPorVencer) {
            NOTIFICACION = makeObjectNotification("CUENTAS_COBRAR")
            NOTIFICACION.NOTIFICACION += `\n VENTA = ${cxc.ID_VENTA}/n FECHA VENCIMIENTO = ${cxc.FECHA_VENCIMIENTO}`
        }
    } catch (error) {
        console.log(error);
    }
};
const checkVencimientoCxP = async () => {
    try {
        const fechaActual = new Date();
        const fechaLimite = new Date(fechaActual);
        const NOTIFICACION = {}
        fechaLimite.setDate(fechaActual.getDate() + 5);
        const CxCPorVencer = await CUENTASxPAGAR.find({ "FECHA_PAGO": { $lte: fechaLimite } })
        for (const cxc of CxCPorVencer) {
            NOTIFICACION = makeObjectNotification("CUENTAS_PAGAR")
            NOTIFICACION.NOTIFICACION += `\n ORDEN DE COMPRA = ${cxc.ID_ORDEN_COMPRA}/n FECHA PAGO = ${cxc.FECHA_PAGO}`
        }
    } catch (error) {
        console.log(error);
    }
};

export { checkVencimientoCxC, checkVencimientoCxP }