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
     * @typedef {{ _id: string, IDENTIFICADOR: string, MOVIMIENTO: string, PRODUCTOS: { _id: string, ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number }[], createdAt }[]} WarehousesBody
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
     * @typedef {{ _id: string, IDENTIFICADOR: string, MOVIMIENTO: string, PRODUCTOS: { _id: string, ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number }[], createdAt }[]} WarehousesBody
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
