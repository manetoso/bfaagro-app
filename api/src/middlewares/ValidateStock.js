import { request, response } from 'express'
import { PRODUCTOS } from '../models/Index.js'
import { serverErrorMessage } from '../controllers/ControllerGlobal.js'

const validateStockToProcess = async (req = request, res = response, next) => {
  const { FORMULACION_DETALLE = [] } = req.body
  const resultFromValidation = await validateStock(FORMULACION_DETALLE)
  if (resultFromValidation) {
    return serverErrorMessage(res, resultFromValidation, 409)
  }
  next()
}

const validateStock = async (requestProducts = []) => {
  const exceptionProducts = []
  let exceptionFlag = false
  // Recorremos el Arreglo que viene en la petición con los productos que se quieren utilizar
  for (const objectProduct of requestProducts) {
    // Buscamos el producto en nuestra Colección para verificar que hay la cantidad de existencias que se requieren para la formula
    const requestProduct = await PRODUCTOS.findById(objectProduct.ID_PRODUCTO)
    if (requestProduct.CANTIDAD < objectProduct.CANTIDAD) {
      exceptionFlag = true
      const exceptionObject = {
        PRODUCTO: requestProduct.NOMBRE_PRODUCTO,
        CANTIDAD_SOLICITADA: objectProduct.CANTIDAD,
        CANTIDAAD_EXISTENTE: requestProduct.CANTIDAD,
        CANTIDAD_FALTANTE: objectProduct.CANTIDAD - requestProduct.CANTIDAD
      }
      exceptionProducts.push(exceptionObject)
    }
  }
  // exceptionFlag es true si por lo menos una cantidad de producto solicitado excede la cantidad existente
  if (exceptionFlag) {
    return exceptionProducts
  } else {
    return false
  }
}

export { validateStockToProcess }
