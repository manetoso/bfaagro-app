import { bfaApi } from '@/api/bfaApi'

/**
 *
 * @returns {{ id: string, name: string, warehouseType: { id: number, name: string } }[]} warehouse data
 */
export async function fetchLogbook() {
  try {
    const { data: resp } = await bfaApi.get('/bitacoraproductos')
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, IDENTIFICADOR: string, MOVIMIENTO: string, PRODUCTOS: { _id: string, ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number }[], TOTAL: number, MONEDA: string, createdAt }[]} WarehousesBody
     * @type {{body: WarehousesBody}} - The Logbook response body.
     */
    const json = resp

    const data = json.body.map((log) => ({
      id: log._id,
      identifier: log.IDENTIFICADOR,
      movement: log.MOVIMIENTO,
      product: log.PRODUCTOS.map((product) => ({
        id: product._id,
        productId: product.ID_PRODUCTO,
        productName: product.NOMBRE_PRODUCTO,
        quantity: product.CANTIDAD
      })),
      total: log.TOTAL,
      currency: log.MONEDA,
      createdAt: log.createdAt,
      createdAtFormatted: new Date(log.createdAt).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }))
    return data
  } catch (error) {
    throw new Error('Error searching logbook')
  }
}

/**
 *
 * @param {string} movement
 */
export async function fetchLogbookByMovement(movement) {
  try {
    const { data: resp } = await bfaApi.get(
      `/bitacoraproductos/movement/${movement}`
    )
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, IDENTIFICADOR: string, MOVIMIENTO: string, PRODUCTOS: { _id: string, ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number }[], TOTAL: number, MONEDA: string, createdAt }[]} WarehousesBody
     * @type {{body: WarehousesBody}} - The Logbook response body.
     */
    const json = resp

    const data = json.body.map((log) => ({
      id: log._id,
      identifier: log.IDENTIFICADOR,
      movement: log.MOVIMIENTO,
      product: log.PRODUCTOS.map((product) => ({
        id: product._id,
        productId: product.ID_PRODUCTO,
        productName: product.NOMBRE_PRODUCTO,
        quantity: product.CANTIDAD
      })),
      total: log.TOTAL,
      currency: log.MONEDA,
      createdAt: log.createdAt,
      createdAtFormatted: new Date(log.createdAt).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }))
    return data
  } catch (error) {
    throw new Error('Error searching logbook by movement')
  }
}

export async function fetchTop5SellingProducts() {
  try {
    const { data: resp } = await bfaApi.get('/ventas/cantidadproductovendido')
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, NOMBRE_PRODUCTO: string, cantidadVendida: number }[]} Top5Products
     * @type {{body: Top5Products}} - The top 5 selling products response body.
     */
    const json = resp

    const data = json.body.map((product) => ({
      name: product.NOMBRE_PRODUCTO,
      value: product.cantidadVendida
    }))
    return data
  } catch (error) {
    throw new Error('Error searching top 5 selling products')
  }
}

export async function fetchTop5PurchasingProducts() {
  try {
    const { data: resp } = await bfaApi.get('/ordenescompra/cantidadproductocomprado')
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, NOMBRE_PRODUCTO: string, cantidadVendida: number }[]} Top5Products
     * @type {{body: Top5Products}} - The top 5 purchasing products response body.
     */
    const json = resp

    const data = json.body.map((product) => ({
      name: product.NOMBRE_PRODUCTO,
      value: product.cantidadVendida
    }))
    return data
  } catch (error) {
    throw new Error('Error searching top 5 purchasing products')
  }
}
