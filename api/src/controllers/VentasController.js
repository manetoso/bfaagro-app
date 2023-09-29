import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { VENTAS, VENTAS_DETALLE, CUENTASxCOBRAR } from '../models/Index.js'
import { getTypeCliente } from '../controllers/ClientesController.js'
import { getAlmacenByIdCliente } from '../controllers/AlmacenesController.js'
import { registerMovementByAlmacen, registerMovementAlmacen } from '../controllers/MovimientosAlmacenController.js'
import { generateNewFolio } from '../helpers/FoliosGenerator.js'
import { createCuentaxCobrarByVenta } from './Cuentas_por_CobrarController.js'
import { createRegister, constructArrayProducts, updateRegisterByIdentificador } from './BitacoraProductosController.js'

const createVenta = async (req = request, res = response) => {
    try {
        const { CLIENTES, FECHA_VENCIMIENTO, ESTADO, TOTAL_VENTA, TOTAL_PAGADO, SALDO, VENTA_DETALLE, PERIODO } = req.body
        const FOLIO = await generateNewFolio("VENTAS")
        const venta = {
            FOLIO, CLIENTES
        }
        if (CLIENTES.CLIENTE_ORIGEN.NOMBRE_CLIENTE == "BFA AGRO S.A de C.V") {
            // POSIBLEMENTE ES UNA VENTA DE  BFA AGRO A UN CLIENTE COMISIONISTA
            const idCliente = CLIENTES.CLIENTE_DESTINO.ID_CLIENTE
            await registerMovementIfIsComisionista(idCliente, VENTA_DETALLE.PRODUCTOS, 'ENTRADA')
        }
        const actionDB = await VENTAS.create(venta)
        //CREAMOS EL DETALLE DE LA VENTA
        await createVentaDetalle(actionDB._id, VENTA_DETALLE)
        // REGISTRAMOS EL MOVIMIENTO DE SALIDA
        await registerMovementAlmacen('SALIDA', VENTA_DETALLE.PRODUCTOS)
        // CREAR LA CXC
        await createCuentaxCobrarByVenta(actionDB._id, CLIENTES, FOLIO, FECHA_VENCIMIENTO, ESTADO, TOTAL_VENTA, TOTAL_PAGADO, SALDO)
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
        const { CLIENTES, FECHA_VENCIMIENTO, ESTADO, TOTAL_VENTA, TOTAL_PAGADO, SALDO, VENTA_DETALLE } = req.body
        const venta = {
            CLIENTES, FECHA_VENCIMIENTO, ESTADO, TOTAL_VENTA, TOTAL_PAGADO, SALDO
        }
        const clienteDestinoNuevo = CLIENTES.CLIENTE_DESTINO
        const clienteOrigenNuevo = CLIENTES.CLIENTE_ORIGEN

        const ventaSaved = await VENTAS.findById(id)
        const ventaDetalleSaved = await VENTAS_DETALLE.findOne({ 'ID_VENTA': id })
        const clienteDestinoViejo = ventaSaved.CLIENTES.CLIENTE_DESTINO
        const clienteOrigenViejo = ventaSaved.CLIENTES.CLIENTE_ORIGEN

        // REVISAREMOS SI SON CLIENTES DIFERENTES
        if (clienteDestinoNuevo.NOMBRE_CLIENTE != clienteDestinoViejo.NOMBRE_CLIENTE) {
            // SUMAMOS AL NUEVO DESTINO
            await registerMovementIfIsComisionista(clienteDestinoNuevo.ID_CLIENTE, VENTA_DETALLE.PRODUCTOS, 'ENTRADA')
            // RESTAMOS AL VIEJO DESTINO
            await registerMovementIfIsComisionista(clienteDestinoViejo.ID_CLIENTE, VENTA_DETALLE.PRODUCTOS, 'SALIDA')
        }
        // AHORA VEMOS SI EL CLIENTE DE ORIGEN CAMBIO PARA SUMARLE LO QUE SE HABIA RESTADO Y RESTARLE AL NUEVO
        if (clienteOrigenNuevo.NOMBRE_CLIENTE != clienteOrigenViejo.NOMBRE_CLIENTE) {
            // RESTAMOS LAS CANTIDADES SI ES COMISIONISTA
            await registerMovementIfIsComisionista(clienteOrigenNuevo.ID_CLIENTE, VENTA_DETALLE.PRODUCTOS, 'SALIDA')
            // Y SUMAMOS AL VIEJO SI ES COMISIONISTA
            await registerMovementIfIsComisionista(clienteOrigenViejo.ID_CLIENTE, ventaDetalleSaved.PRODUCTOS, 'ENTRADA')
        }
        // Actualizamos los clientes en la cxc
        const cxcSaved = await CUENTASxCOBRAR.findOne({ 'FOLIO_VENTA': ventaSaved.FOLIO })
        await CUENTASxCOBRAR.findByIdAndUpdate(cxcSaved._id, { CLIENTES })

        await updateVentaDetalle(id, VENTA_DETALLE)

        const actionDB = await VENTAS.findByIdAndUpdate(id, venta, {
            new: true
        })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        console.log(error);
        return serverErrorMessage(res)
    }
}

const deleteVenta = async (req = request, res = response) => {
    try {
        const id = req.params.idVenta
        const actionDB = await VENTAS.findByIdAndDelete(id)
        const VENTA_DETALLE = await VENTAS_DETALLE.findOne({ 'ID_VENTA': id })
        await VENTAS_DETALLE.findByIdAndDelete(VENTA_DETALLE._id)
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const findVentas_Detalles = async (req = request, res = response) => {
    try {
        const actionDB = await VENTAS_DETALLE.find().sort({ createdAt: -1 })
        return serverOkMessage(res, actionDB)
    } catch (error) {
        return serverErrorMessage(res)
    }
}

const createVentaDetalle = async (idVenta, ventaDetalle = {}) => {
    try {
        const { PRODUCTOS, PRECIO_TOTAL } = ventaDetalle
        const actionDB = { "ID_VENTA": idVenta, PRODUCTOS, PRECIO_TOTAL }
        const venta_Detalle = await VENTAS_DETALLE.create(actionDB)
        // Bitacora 
        const products = constructArrayProducts(PRODUCTOS)
        const register = {
            "IDENTIFICADOR": venta_Detalle._id,
            "PRODUCTOS": products,
            "MOVIMIENTO": "VENTA",
            "MONEDA": "MXN",
            "TOTAL":ventaDetalle.PRECIO_TOTAL
        }
        await createRegister(register)
    } catch (error) {
        console.log(error);
        throw new Error
    }
}

const updateVentaDetalle = async (idVenta, VENTA_DETALLE = {}) => {
    try {
        const data = VENTA_DETALLE
        const ventaDetalleSaved = await VENTAS_DETALLE.findOne({ID_VENTA: idVenta})
        const actionDB = await VENTAS_DETALLE.findByIdAndUpdate(ventaDetalleSaved._id, data)
        // Bitacora 
        const products = constructArrayProducts(VENTA_DETALLE.PRODUCTOS)
        const register = {
            "IDENTIFICADOR": ventaDetalleSaved.id,
            "PRODUCTOS": products,
            "MOVIMIENTO": "VENTA",
            "MONEDA": "MXN",
            "TOTAL": actionDB.PRECIO_TOTAL
        }
        await updateRegisterByIdentificador(ventaDetalleSaved.id, register)
    } catch (error) {
        console.log(error);
    }
}

const registerMovementIfIsComisionista = async (idCliente = 0, PRODUCTOS = [], inputOutput = '') => {
    try {
        const typeCliente = await getTypeCliente(idCliente)
        if (typeCliente == 'COMISIONISTA') {
            // Se suma la cantidad de productos al almacen del cliente
            const almacenCliente = await getAlmacenByIdCliente(idCliente)
            await registerMovementByAlmacen(inputOutput, PRODUCTOS, almacenCliente)
        }
    } catch (error) {
        console.log(error);
    }
}

const productsByVentas = async(req = request, res = response) =>{
    try {
        const allVentas = await VENTAS_DETALLE.aggregate([
            {
              $unwind: "$PRODUCTOS"
            },
            {
              $group: {
                _id: "$PRODUCTOS.ID_PRODUCTO",
                NOMBRE_PRODUCTO: { $first: "$PRODUCTOS.NOMBRE_PRODUCTO" },
                cantidadVendida: { $sum: "$PRODUCTOS.CANTIDAD" },
              }
            }
          ]);
          return serverOkMessage(res,allVentas)
    } catch (error) {
        console.log(error);
        return serverErrorMessage(res, error)
    }
}


export { createVenta, findVentas, deleteVenta, updateVenta, findVentas_Detalles, createVentaDetalle, productsByVentas }
