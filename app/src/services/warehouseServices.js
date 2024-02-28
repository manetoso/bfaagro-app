import toast from 'react-hot-toast'

import { bfaApi } from '@/api/bfaApi'
import { ROLES } from '@/utils/consts'

/**
 *
 * @returns {{ id: string, name: string, quantity: number, minQuantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string }[]} products data
 */
export async function fetchData() {
  try {
    const { data: resp } = await bfaApi.get('/productos', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.WAREHOUSE
      }
    })
    /**
     * The respponse body from the request.
     * @typedef { { _id: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, CANTIDAD_MINIMA: number, UNIDAD_MEDIDA: string, ALMACEN: { ID_ALMACEN: string, NOMBRE_ALMACEN: string }, TIPO_PRODUCTO: { ID_TIPO_PRODUCTO: number, TIPO_PRODUCTO: string }[] } } ProductsBody
     * @type {{body: ProductsBody[]}} - The Products Types response body.
     */
    const json = resp

    const data = json.body.map((product) => ({
      id: product._id,
      name: product.NOMBRE_PRODUCTO,
      quantity: product.CANTIDAD,
      minQuantity: product.CANTIDAD_MINIMA,
      unity: product.UNIDAD_MEDIDA,
      warehouse: {
        id: product.ALMACEN.ID_ALMACEN,
        name: product.ALMACEN.NOMBRE_ALMACEN
      },
      productType: product.TIPO_PRODUCTO.map((type) => ({
        id: type.ID_TIPO_PRODUCTO,
        name: type.TIPO_PRODUCTO
      })),
      lots: product.LOTES.map((lot) => ({
        lote: lot.LOTE,
        quantity: lot.CANTIDAD
      }))
    }))
    return data
  } catch (error) {
    throw new Error('Error searching products')
  }
}

/**
 *
 * @param {{ name: string, quantity: number, minQuantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string }} data
 * @returns { { id: string, name: string, quantity: number, minQuantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string } } product data
 */
export async function createData(data) {
  try {
    const elementToDBSchema = convertToDBSchema(data)
    const { data: resp } = await bfaApi.post(
      '/productos',
      JSON.stringify(elementToDBSchema),
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          section: ROLES.WAREHOUSE
        }
      }
    )
    const json = resp
    const respFormated = convertToAppSchema(json.body)
    toast.success('Producto creado con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error creando nuevo producto')
    throw new Error('Error creating new product')
  }
}

/**
 *
 * @param {{ id: string, name: string, quantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string }} data
 * @returns { { id: string, name: string, quantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string } } product data
 */
export async function updateData(data) {
  try {
    const elementToDBSchema = convertToDBSchema(data)
    const { data: resp } = await bfaApi.put(
      `/productos/${data.id}`,
      JSON.stringify(elementToDBSchema),
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          section: ROLES.WAREHOUSE
        }
      }
    )
    const json = resp
    const respFormated = convertToAppSchema(json.body)
    toast.success('Producto actualizado con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error actualizando producto')
    throw new Error('Error updating product')
  }
}

/**
 *
 * @param {string} id
 * @returns {boolean} true if the product was deleted, false if not
 */
export async function deleteData(id) {
  try {
    const { data: resp } = await bfaApi.delete(`/productos/${id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.WAREHOUSE
      }
    })
    const json = resp
    toast.success('Producto eliminado con éxito')
    return !json.error
  } catch (error) {
    toast.error('Error eliminando producto')
    throw new Error('Error deleting product')
  }
}

/**
 *
 * @param {{ movementType: { movementTypeId: string, value: string }, products: { productId: string, productName: string, productQuantity: number }[] }} data
 */
export async function productReceipt(data) {
  try {
    const elementToDBSchema = {
      MOVIMIENTO: {
        ID_MOVIMIENTO: data.movementType.movementTypeId,
        MOVIMIENTO: data.movementType.value
      },
      FECHA: new Date().toISOString().split('T')[0],
      PRODUCTOS: data.products.map((product) => ({
        ID_PRODUCTO: product.productId,
        NOMBRE_PRODUCTO: product.productName,
        CANTIDAD: product.productQuantity
      }))
    }
    const { data: resp } = await bfaApi.post(
      '/movimientosAlmacen',
      JSON.stringify(elementToDBSchema),
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          section: ROLES.WAREHOUSE
        }
      }
    )
    console.log({ resp })
    toast.success('Registro de entrada de productos exitoso')
    window.location.reload()
  } catch (error) {
    console.log({ error })
    toast.error('Error registrando entrada de productos')
    throw new Error('Error registering product receipt')
  }
}

/**
 *
 * @param { { name: string, quantity: number, minQuantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string } } data
 * @returns { { _id: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, CANTIDAD_MINIMA: number, UNIDAD_MEDIDA: string, ALMACEN: { ID_ALMACEN: string, NOMBRE_ALMACEN: string }, TIPO_PRODUCTO: { ID_TIPO_PRODUCTO: number, TIPO_PRODUCTO: string }[] } } dbSchemaLike
 */
export function convertToDBSchema(data) {
  try {
    const dbSchemaLike = {
      NOMBRE_PRODUCTO: data.name,
      CANTIDAD: data.quantity,
      CANTIDAD_MINIMA: data.minQuantity,
      UNIDAD_MEDIDA: data.unity,
      ALMACEN: {
        ID_ALMACEN: data.warehouse.id,
        NOMBRE_ALMACEN: data.warehouse.name
      },
      TIPO_PRODUCTO: data.productType.map((type) => ({
        ID_TIPO_PRODUCTO: type.id,
        TIPO_PRODUCTO: type.name
      }))
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting to DB Schema')
  }
}

/**
 *
 * @param { { _id: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, CANTIDAD_MINIMA: number, UNIDAD_MEDIDA: string, ALMACEN: { ID_ALMACEN: string, NOMBRE_ALMACEN: string }, TIPO_PRODUCTO: { ID_TIPO_PRODUCTO: number, TIPO_PRODUCTO: string }[] } } object
 * @returns { { id: string, name: string, quantity: number, minQuantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string } } appSchemaLike
 */
export function convertToAppSchema(object) {
  try {
    const data = {
      id: object._id,
      name: object.NOMBRE_PRODUCTO,
      quantity: object.CANTIDAD,
      minQuantity: object.CANTIDAD_MINIMA,
      unity: object.UNIDAD_MEDIDA,
      warehouse: {
        id: object.ALMACEN.ID_ALMACEN,
        name: object.ALMACEN.NOMBRE_ALMACEN
      },
      productType: object.TIPO_PRODUCTO.map((type) => ({
        id: type.ID_TIPO_PRODUCTO,
        name: type.TIPO_PRODUCTO
      }))
    }
    return data
  } catch (error) {
    throw new Error('Error converting to App Schema')
  }
}
