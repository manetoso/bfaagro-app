import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { VENTAS, VENTAS_DETALLE, ALMACENES, CLIENTES } from '../models/Index.js'
import { getTypeCliente } from '../controllers/ClientesController.js'
import { getAlmacenByIdCliente } from '../controllers/AlmacenesController.js'
import { registerMovementByAlmacen, registerMovementAlmacen } from '../controllers/MovimientosAlmacenController.js'

const createVenta = async (req = request, res = response) => {
    try {
        const { CLIENTES, FECHA_VENCIMIENTO, STATUS, TOTAL_VENTA, TOTAL_PAGADO, SALDO, VENTA_DETALLE } = req.body
        const venta = {
            CLIENTES, FECHA_VENCIMIENTO, STATUS, TOTAL_VENTA, TOTAL_PAGADO, SALDO
        }
        if (CLIENTES.CLIENTE_ORIGEN.ID_CLIENTE == null || CLIENTES.CLIENTE_ORIGEN == undefined ) {
            // Posiblemente es una venta de BFA Agro a un cliente comisionista
            const idCliente = CLIENTES.CLIENTE_DESTINO.ID_CLIENTE
            const typeCliente = await getTypeCliente(idCliente)
            if (typeCliente == 'COMISIONISTA') {
                // Se suma la cantidad de productos al almacen del cliente
                const almacenCliente = await getAlmacenByIdCliente(idCliente)
                await registerMovementByAlmacen('ENTRADA', VENTA_DETALLE.PRODUCTOS, almacenCliente)
            }
        }
        const actionDB = await VENTAS.create(venta)
        //Creamos el detalle de la venta
        await createVentaDetalle(actionDB._id, VENTA_DETALLE)
        await registerMovementAlmacen('SALIDA',VENTA_DETALLE.PRODUCTOS)
        return serverOkMessage(res, actionDB, 201)
    } catch (error) {
        console.log(error);
        return serverErrorMessage(res)
    }
}

const findVentas = async (req = request, res = response) => {
    try {
        const actionDB = await VENTAS.find().sort({ createdAt: -1 })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const updateVenta = async (req = request, res = response) => {
    try {
        const id = req.params.idVenta
        const data = req.body
        const actionDB = await VENTAS.findByIdAndUpdate(id, data, {
            new: true
        })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const deleteVenta = async (req = request, res = response) => {
    try {
        const id = req.params.idVenta
        const actionDB = await VENTAS.findByIdAndDelete(id)
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const createVentaDetalle = async (idVenta, ventaDetalle = {}) => {
    try {
        const { PRODUCTOS, PRECIO_TOTAL } = ventaDetalle
        const actionDB = {  "ID_VENTA": idVenta, PRODUCTOS, PRECIO_TOTAL }
        await VENTAS_DETALLE.create(actionDB)
    } catch (error) {
        console.log(error);
        throw new Error
    }
}

export { createVenta, findVentas, deleteVenta, updateVenta, createVentaDetalle }
