import FORMULAS from '../models/Formulas.js'
import PRODUCTOS from '../models/Productos.js'
import { request, response } from 'express'
import { serverErrorMessage, serverOkMessage } from './ControllerGlobal.js'

const createFormula = async (req = request, res = response) => {
  try {
    const { NOMBRE_FORMULA, PRODUCTO, UNIDAD_MEDIDA, CANTIDAD, FORMULACION_DETALLE } = req.body    
    const formula = { NOMBRE_FORMULA, PRODUCTO, UNIDAD_MEDIDA, CANTIDAD, FORMULACION_DETALLE }
    const actionDB = await FORMULAS.create(formula)
    return serverOkMessage(res, actionDB, 201)
  } catch (error) {
    return serverErrorMessage(res)
  }
}
const findFormulas = async (req = request, res = response) => {
  try {
    const actionDB = await FORMULAS.find().sort({ createdAt: -1 }).lean()
    let result = []
    for( const element of actionDB ){
      const typeProduct = await searchAndReturnTypeProducto(element.PRODUCTO.ID_PRODUCTO)
      element.PRODUCTO.TIPO_PRODUCTO = typeProduct
      result.push(element)
    }
    
    return serverOkMessage(res, result)
  } catch (error) {
    return serverErrorMessage(res)
  }
}
const updateFormula = async (req = request, res = response) => {
  try {
    const id = req.params.idFormula
    const data = req.body
    const actionDB = await FORMULAS.findByIdAndUpdate(id, data, {
      new: true
    })
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}
const deleteFormula = async (req = request, res = response) => {
  try {
    const id = req.params.idFormula
    const actionDB = await FORMULAS.findByIdAndDelete(id)
    return serverOkMessage(res, actionDB)
  } catch (error) {
    return serverErrorMessage(res)
  }
}

const searchAndReturnTypeProducto = async(idProduct) => {
  try {
    const product = await PRODUCTOS.findById(idProduct)
    return product ? product.TIPO_PRODUCTO : null
  } catch (error) {
    return null
  }
}
export { createFormula, findFormulas, updateFormula, deleteFormula }
