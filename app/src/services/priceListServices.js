import toast from 'react-hot-toast'

import { bfaApi } from '@/api/bfaApi'

export async function fetchData() {
  try {
    const { data: resp } = await bfaApi.get('/listas_precio')
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, AUMENTO: { PORCENTAJE: number, CANTIDAD: number }, TIPO_LISTA: { ID_TIPO: string, TIPO_LISTA: string }, PRECIO_UNITARIO: number, PRECIO_FINAL: number, ID_PRODUCTO: { _id: string, NOMBRE_PRODUCTO: string } }} PriceListBody
     * @type {{body: PriceListBody[]}} - The price list response body.
     */
    const json = resp
    const data = json.body.map((priceList) => convertPriceListToAppSchema(priceList))
    return data
  } catch (error) {
    throw new Error('Error searching price list')
  }
}

export async function createData(data) {
  try {
    const elementToDBSchema = convertPriceListToDBSchema(data)
    const { data: resp } = await bfaApi.post(
      '/listas_precio',
      elementToDBSchema
    )

    const json = resp
    const dataFormated = convertPriceListToAppSchema(json.body)
    toast.success('Lista de precio creada con éxito')
    return dataFormated
  } catch (error) {
    toast.error('Error creando nueva lista de precio')
    throw new Error('Error creating price list')
  }
}

export async function updateData(data) {
  try {
    const elementToDBSchema = convertPriceListToDBSchema(data)
    const { data: resp } = await bfaApi.put(
      `/listas_precio/${data.id}`,
      elementToDBSchema
    )
    const json = resp
    const respFormated = convertPriceListToAppSchema(json.body)
    toast.success('Lista de precio actualizada con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error actualizando lista de precio')
    throw new Error('Error updating price list')
  }
}

/**
 *
 * @param {string} id
 * @returns {boolean} true if the product was deleted, false if not
 */
export async function deleteData(id) {
  try {
    const { data: resp } = await bfaApi.delete(`/listas_precio/${id}`)
    const json = resp
    toast.success('Lista de precio eliminada con éxito')
    return !json.error
  } catch (error) {
    toast.error('Error eliminando lista de precio')
    throw new Error('Error deleting price list')
  }
}

/**
 *
 * @param {{ rise: { risePercentage: number, riseQuantity: number }, priceListType: { priceListId: string, priceListName: string }, unitPrice: number, finalPrice: number, productId: string, productName: string }} data
 * @returns {{ AUMENTO: { PORCENTAJE: number, CANTIDAD: number }, TIPO_LISTA: { ID_TIPO: string, TIPO_LISTA: string }, PRECIO_UNITARIO: number, PRECIO_FINAL: number, ID_PRODUCTO: { _id: string, NOMBRE_PRODUCTO: string } }} - The price list to DB Schema.
 */
export function convertPriceListToDBSchema(data) {
  try {
    const dbSchemaLike = {
      AUMENTO: {
        PORCENTAJE: data.rise.risePercentage,
        CANTIDAD: data.rise.riseQuantity
      },
      TIPO_LISTA: {
        ID_TIPO: data.priceListType.priceListId,
        TIPO_LISTA: data.priceListType.priceListName
      },
      PRECIO_UNITARIO: data.unitPrice,
      PRECIO_FINAL: data.finalPrice,
      ID_PRODUCTO: data.productId
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting price list to DB Schema')
  }
}

/**
 *
 * @param {{ _id: string, AUMENTO: { PORCENTAJE: number, CANTIDAD: number }, TIPO_LISTA: { ID_TIPO: string, TIPO_LISTA: string }, PRECIO_UNITARIO: number, PRECIO_FINAL: number, ID_PRODUCTO: { _id: string, NOMBRE_PRODUCTO: string } }} data
  * @returns {{ id: string, rise: { risePercentage: number, riseQuantity: number }, priceListType: { priceListId: string, priceListName: string }, unitPrice: number, finalPrice: number, productId: string, productName: string }} - The price list to App Schema.
 */
export function convertPriceListToAppSchema(data) {
  try {
    const dbSchemaLike = {
      id: data._id,
      rise: {
        risePercentage: data.AUMENTO.PORCENTAJE,
        riseQuantity: data.AUMENTO.CANTIDAD
      },
      priceListType: {
        priceListId: data.TIPO_LISTA.ID_TIPO,
        priceListName: data.TIPO_LISTA.TIPO_LISTA
      },
      unitPrice: data.PRECIO_UNITARIO,
      finalPrice: data.PRECIO_FINAL,
      productId: data.ID_PRODUCTO._id,
      productName: data.ID_PRODUCTO.NOMBRE_PRODUCTO
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting price list to App Schema')
  }
}
