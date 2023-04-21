import {
  PROCESOS,
  FORMULAS,
  TIPOS_DOCUMENTOS,
  PRODUCTOS
} from '../models/Index.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createProceso = async (req = request, res = response) => {
  try {
    // Desestructuramos el body de la request
    const {
      ID_FORMULA,
      FORMULACION_DETALLE = [],
      ID_ALMACEN,
      NOMBRE_ALMACEN
    } = req.body
    // Buscamos la Formula por el ID
    const formula = await FORMULAS.findById(ID_FORMULA)
    // Consultamos el ID de procesos con valor PENDIENTE
    const status = await TIPOS_DOCUMENTOS.findOne({
      TIPO_DOCUMENTO: 'TIPO_ESTADO',
      VALOR: 'PENDIENTE'
    })
    // Construimos el objeto a guardar
    const process = {
      PROCESO: {
        ID_ESTADO: status._id,
        ESTADO: status.VALOR
      },
      FORMULA: {
        ID_FORMULA,
        NOMBRE_FORMULA: formula.NOMBRE_FORMULA,
        PRODUCTO: {
          ID_PRODUCTO: formula.PRODUCTO.ID_PRODUCTO,
          NOMBRE_PRODUCTO: formula.PRODUCTO.NOMBRE_PRODUCTO
        },
        FORMULACION_DETALLE
      },
      ALMACEN: {
        ID_ALMACEN,
        NOMBRE_ALMACEN
      }
    }
    const actionDB = await PROCESOS.create(process)
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const findProcesos = async (req = request, res = response) => {
  try {
    const actionDB = await PROCESOS.find().sort({ createdAt: -1 })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const updateProceso = async (req = request, res = response) => {
  try {
    const idProccess = req.params.idProceso
    const { PROCESO, ...data } = req.body
    const dbProccess = await validateStatusBeFinalizado(idProccess)
    console.log(dbProccess)
    if (dbProccess) {
      return serverErrorMessage(
        res,
        'No se pueden editar procesos con estado FINALIZADO',
        403
      )
    } else {
      const actionDB = await PROCESOS.findByIdAndUpdate(idProccess, data, {
        new: true
      })
      return serverOkMessage(res, actionDB)
    }
  } catch (error) {
    return serverErrorMessage(res)
  }
}
const updateStatusProceso = async (req = request, res = response) => {
  try {
    const idProccess = req.params.idProceso
    const data = req.body
    const proccess = validateStatusBeFinalizado(false, data.PROCESO.ESTADO)
    if (proccess) {
      data.FORMULACION_DETALLE.forEach(async (product) => {
        const dbProduct = await PRODUCTOS.findById(product.ID_PRODUCTO)
        dbProduct.CANTIDAD -= product.CANTIDAD
        await PRODUCTOS.findByIdAndUpdate(dbProduct._id, dbProduct, {
          new: true
        })
      })
    }
    const actionDB = await PROCESOS.findByIdAndUpdate(idProccess, data, {
      new: true
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const deleteProceso = async (req = request, res = response) => {
  try {
    const idProccess = req.params.idProceso
    const dbProccess = await validateStatusBeFinalizado(idProccess)
    if (dbProccess) {
      return serverErrorMessage(
        res,
        'No se pueden eliminar procesos con estado FINALIZADO',
        403
      )
    } else {
      const actionDB = await PROCESOS.findByIdAndDelete(idProccess)
      return serverOkMessage(res, actionDB)
    }
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const validateStatusBeFinalizado = async (idProccess, ESTADO) => {
  try {
    let dbProccess = null
    if (idProccess) {
      dbProccess = await PROCESOS.findById(idProccess, { 'PROCESO.ESTADO': 1 })
      dbProccess = dbProccess.PROCESO.ESTADO
    } else {
      dbProccess = ESTADO
    }
    if (dbProccess === 'FINALIZADO') {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

export {
  createProceso,
  findProcesos,
  updateProceso,
  deleteProceso,
  updateStatusProceso
}
