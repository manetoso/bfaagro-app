import mongoose from 'mongoose'
import {
  PROCESOS,
  FORMULAS,
  TIPOS_DOCUMENTOS,
  PRODUCTOS
} from '../models/Index.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'
import { checkMinAmountProduct } from '../helpers/Index.js'

const createProceso = async (req = request, res = response) => {
  try {
    // Desestructuramos el body de la request
    const {
      ID_FORMULA,
      FORMULACION_DETALLE = [],
      CANTIDAD
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
      CANTIDAD
    }
    const actionDB = await PROCESOS.create(process)
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const findProcesos = async (req = request, res = response) => {
  try {
    const actionDB = await PROCESOS.find().sort({ createdAt: -1 }).sort({ createdAt: -1 })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const findInProcessAndPending = async (req = request, res = response) => {
  try {
    const actionDB = await PROCESOS.find({
      $or: [
        { 'PROCESO.ESTADO': 'PENDIENTE' },
        { 'PROCESO.ESTADO': 'EN PROCESO' }
      ]
    }).sort({ createdAt: -1 })
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
  //Iniciamos la sesion
  const sesion = await mongoose.startSession()
  try {
    let actionDB = null
    let checksMinAmountProducts = []
    let amountsProducts = {}
    const idProccess = req.params.idProceso
    const data = req.body
    //Iniciamos la transacción
    sesion.startTransaction()
    const proccessDBUsed = await PROCESOS.findById(idProccess)
    const proccess = await validateStatusBeFinalizado(
      false,
      data.PROCESO.ESTADO
    )
    if (proccess) {
      data.FORMULACION_DETALLE.forEach(async (product) => {
        const dbProduct = await PRODUCTOS.findById(product.ID_PRODUCTO)
        dbProduct.CANTIDAD = dbProduct.CANTIDAD - ( product.CANTIDAD * proccessDBUsed.CANTIDAD )
        await PRODUCTOS.findByIdAndUpdate(dbProduct._id, dbProduct, {
          new: true
        })
        // Checamos que los productos restados no hallan llegado a su nivel minimo de inventario    
        if(checkMinAmountProduct(dbProduct)) {
          amountsProducts = {
            'PRODUCTO': dbProduct.NOMBRE_PRODUCTO,
            'CANTIDAD': dbProduct.CANTIDAD,
            'CANTIDAD_MINIMA': dbProduct.CANTIDAD_MINIMA,
            'DIFERENCIA': dbProduct.CANTIDAD_MINIMA - dbProduct.CANTIDAD
          }
          checksMinAmountProducts.push(amountsProducts)
        }
      })      
      // Consultamos la Formula Usada para sumar la cantidad de Producto que esta produce
      const formulaUsed = await FORMULAS.findById(proccessDBUsed.FORMULA.ID_FORMULA)
      // Consultamos el producto que se obtiene con la Formula, el id del producto ya viene embebido en el modelo de proceso
      let productMade = await PRODUCTOS.findById(formulaUsed.PRODUCTO.ID_PRODUCTO)
      // Sumamos la cantidad que hace la formula al producto y guardamos 
      // Ahora la multiplicamos por la cantidad de veces que se hizo la formula
      productMade.CANTIDAD += formulaUsed.CANTIDAD *  proccessDBUsed.CANTIDAD
      actionDB = await PRODUCTOS.findByIdAndUpdate(productMade._id,productMade)
    }
    actionDB = await PROCESOS.findByIdAndUpdate(idProccess, data, {
      new: true
    })
    const result = {
      actionDB,
      checksMinAmountProducts
    }    
    // Commit a la transacción
    await sesion.commitTransaction()
    return serverOkMessage(res, result)
  } catch (error) {
    console.log(error);
    //abortamos la transaacción en caso de fallar
    await sesion.abortTransaction()
    return serverErrorMessage(res,error)
  } finally {
    // Cerramos la traansacción
    await sesion.endSession()
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
  findProcesos,
  findInProcessAndPending,
  createProceso,
  updateProceso,
  deleteProceso,
  updateStatusProceso
}
