import toast from 'react-hot-toast'

import { bfaApi } from '@/api/bfaApi'
import { ROLES } from '@/utils/consts'

function mergeTwoArrays({
  firstArray,
  secondArray,
  firstArrayIterator,
  secondArrayIterator,
  newAttribute = 'newAttribute'
}) {
  // Create a lookup object for secondArray using secondArrayIterator as the key
  const lookup = {}
  for (const item2 of secondArray) {
    lookup[item2[secondArrayIterator]] = item2
  }

  // Loop through firstArray and find the matching element from the lookup object
  for (const item1 of firstArray) {
    const key = item1[firstArrayIterator]
    if (lookup[key]) {
      item1[newAttribute] = lookup[key]
    }
  }
}

/**
 *
 * @returns {{ id: string, name: string, agent: string, phoneNumber: string, type: { id: string, value: string } }} - The suppliers.
 */
export async function fetchData() {
  try {
    const { data: resp } = await bfaApi.get('/ventas', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.SALES
      }
    })
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, FOLIO: string, CLIENTES: { CLIENTE_ORIGEN: { ID_CLIENTE: string, NOMBRE_CLIENTE: string }, CLIENTE_DESTINO: { ID_CLIENTE: string, NOMBRE_CLIENTE: string }, createdAt: string } }} SaleOrdersBody
     * @type {{body: SaleOrdersBody[]}} - The SaleOrders response body.
     */
    const ventas = resp
    const sales = ventas.body.map((venta) => convertSaleOrderToAppSchema(venta))
    const { data: resp2 } = await bfaApi.get('/ventas/ventasdetalle', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.SALES
      }
    })
    /**
     * The respponse body from the request2.
     * @typedef {{ _id: string, ID_VENTA: string, PRECIO_TOTAL: number, PRODUCTOS: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, PRECIO_UNITARIO: number }[] }} SaleOrdersDetailsBody
     * @type {{body: SaleOrdersDetailsBody[]}} - The SaleOrdersDetails response body.
     */
    const ventaDetalle = resp2
    const salesDetails = ventaDetalle.body.map((ventaDetalle) =>
      convertSaleOrderDetailToAppSchema(ventaDetalle)
    )
    mergeTwoArrays({
      firstArray: sales,
      secondArray: salesDetails,
      firstArrayIterator: 'id',
      secondArrayIterator: 'saleOrderId',
      newAttribute: 'saleDetails'
    })
    const areBFASales = window.location.href.includes('bfa')
    if (areBFASales) {
      const dataSorted = sales.filter(
        (saleOrder) => saleOrder.originClient.clientId === null
      )
      return dataSorted
    }
    const dataSorted = sales.filter(
      (saleOrder) => saleOrder.originClient.clientId !== null
    )
    return dataSorted
  } catch (error) {
    throw new Error('Error searching sale orders')
  }
}

export async function createData(data) {
  try {
    const elementToDBSchema = converCreateSaleOrderToDBSchema(data)
    const { data: resp } = await bfaApi.post('/ventas', elementToDBSchema, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.SALES
      }
    })
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, FOLIO: string, CLIENTES: { CLIENTE_ORIGEN: { ID_CLIENTE: string, NOMBRE_CLIENTE: string }, CLIENTE_DESTINO: { ID_CLIENTE: string, NOMBRE_CLIENTE: string } } }} SaleOrderData
     * @type {{ body: SaleOrderData }} - The SaleOrder response body.
     */
    const json = resp
    const dataFormated = convertSaleOrderToAppSchema(json.body)
    toast.success('Orden de venta creada con éxito')
    return dataFormated
  } catch (error) {
    toast.error('Error creando nueva orden de venta')
    throw new Error('Error creating new sale order')
  }
}

export async function updateData(data, detailId) {
  try {
    const dbSchemaLike = converCreateSaleOrderToDBSchema(data)
    dbSchemaLike.VENTA_DETALLE._id = detailId
    const { data: resp } = await bfaApi.put(
      `/ventas/${data.id}`,
      dbSchemaLike,
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          section: ROLES.SALES
        }
      }
    )
    const json = resp
    const respFormated = convertSaleOrderToAppSchema(json.body)
    toast.success('Orden de venta actualizada con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error actualizando orden de venta')
    throw new Error('Error updating sale order')
  }
}

/**
 *
 * @param {string} id
 * @returns {boolean} true if the product was deleted, false if not
 */
export async function deleteData(id) {
  try {
    const { data: resp } = await bfaApi.delete(`/ventas/${id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.SALES
      }
    })
    const json = resp
    toast.success('Orden de venta eliminada con éxito')
    return !json.error
  } catch (error) {
    console.log({ error })
    toast.error('Error eliminando orden de venta')
    throw new Error('Error deleting sale order')
  }
}

/**
 *
 * @param {{ folio: string, originClient: { clientId: string, clientName: string }, destinationClient: { clientId: string, clientName: string } }} data
 * @returns {{ FOLIO: string, CLIENTES: { CLIENTE_ORIGEN: { ID_CLIENTE: string, NOMBRE_CLIENTE: string }, CLIENTE_DESTINO: { ID_CLIENTE: string, NOMBRE_CLIENTE: string } } }} - The sale order to DB Schema.
 */
export function converSaleOrderToDBSchema(data) {
  try {
    const dbSchemaLike = {
      FOLIO: data.folio,
      CLIENTES: {
        CLIENTE_ORIGEN: {
          ID_CLIENTE: data.originClient.clientId,
          NOMBRE_CLIENTE: data.originClient.clientName
        },
        CLIENTE_DESTINO: {
          ID_CLIENTE: data.destinationClient.clientId,
          NOMBRE_CLIENTE: data.destinationClient.clientName
        }
      }
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting sale order to DB Schema')
  }
}

/**
 *
 * @param {{ endDate: string, total: number, totalPaid: number, balance: number, products: { productId: string, name: string, quantity: number, unity: string, unitPrice: number, lot: { serie: string, quantity: number }[] }[], originClient: { clientId: string, clientName: string }, destinationClient: { clientId: string, clientName: string } }} data
 * @returns {{ FECHA_VENCIMIENTO: string, TOTAL_VENTA: number, TOTAL_PAGADO: number, SALDO: number, VENTA_DETALLE: { PRODUCTOS: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, PRECIO_UNITARIO: number, LOTES: { LOTE: string, CANTIDAD: number }[] }[], PRECIO_TOTAL: number }, CLIENTES: { CLIENTE_ORIGEN: { ID_CLIENTE: string, NOMBRE_CLIENTE: string }, CLIENTE_DESTINO: { ID_CLIENTE: string, NOMBRE_CLIENTE: string } } }} - The sale order to DB Schema.
 */
export function converCreateSaleOrderToDBSchema(data) {
  try {
    const dbSchemaLike = {
      FECHA_VENCIMIENTO: data.endDate,
      TOTAL_VENTA: data.total,
      TOTAL_PAGADO: data.totalPaid,
      SALDO: data.balance,
      PERIODO: data.period,
      VENTA_DETALLE: {
        PRODUCTOS: data.products.map((product) => ({
          ID_PRODUCTO: product.productId,
          NOMBRE_PRODUCTO: product.name,
          CANTIDAD: product.quantity,
          UNIDAD_MEDIDA: product.unity,
          INCREMENTO: product.increment,
          PRECIO_UNITARIO: product.unitPrice,
          LOTES: product.lot.map((lot) => ({
            LOTE: lot.serie,
            CANTIDAD: lot.quantity
          }))
        })),
        PRECIO_TOTAL: data.total
      },
      CLIENTES: {
        CLIENTE_ORIGEN: {
          ID_CLIENTE: data.originClient.clientId,
          NOMBRE_CLIENTE: data.originClient.clientName
        },
        CLIENTE_DESTINO: {
          ID_CLIENTE: data.destinationClient.clientId,
          NOMBRE_CLIENTE: data.destinationClient.clientName
        }
      }
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting create sale order to DB Schema')
  }
}

/**
 *
 * @param {{ saleOrderId: string, total: number, products: { productId: string, name: string, quantity: number, unity: string, unitPrice: number }[] }} data
 * @returns {{ ID_VENTA: string, PRECIO_TOTAL: number, PRODUCTOS: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, PRECIO_UNITARIO: number }[] }} - The sale order detail to DB Schema.
 */
export function converSaleOrderDetailToDBSchema(data) {
  try {
    const dbSchemaLike = {
      ID_VENTA: data.saleOrderId,
      PRECIO_TOTAL: data.total,
      PRODUCTOS: data.products.map((product) => ({
        ID_PRODUCTO: product.productId,
        NOMBRE_PRODUCTO: product.name,
        CANTIDAD: product.quantity,
        UNIDAD_MEDIDA: product.unity,
        PRECIO_UNITARIO: product.unitPrice
      }))
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting sale order detail to DB Schema')
  }
}

/**
 *
 * @param {{ _id: string, FOLIO: string, CLIENTES: { CLIENTE_ORIGEN: { ID_CLIENTE: string, NOMBRE_CLIENTE: string }, CLIENTE_DESTINO: { ID_CLIENTE: string, NOMBRE_CLIENTE: string } }, createdAt: string }} data
 * @returns {{ id: string, folio: string, originClient: { clientId: string, clientName: string }, destinationClient: { clientId: string, clientName: string } }} - The sale order to App Schema.
 */
export function convertSaleOrderToAppSchema(data) {
  try {
    const dbSchemaLike = {
      id: data._id,
      folio: data.FOLIO,
      originClient: {
        clientId: data.CLIENTES.CLIENTE_ORIGEN.ID_CLIENTE,
        clientName: data.CLIENTES.CLIENTE_ORIGEN.NOMBRE_CLIENTE
      },
      destinationClient: {
        clientId: data.CLIENTES.CLIENTE_DESTINO.ID_CLIENTE,
        clientName: data.CLIENTES.CLIENTE_DESTINO.NOMBRE_CLIENTE
      },
      createdAt: data.createdAt
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting sale order to App Schema')
  }
}

/**
 *
 * @param {{ _id: string, ID_VENTA: string, PRECIO_TOTAL: number, PRODUCTOS: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, PRECIO_UNITARIO: number, INCREMENTO: number, LOTES: { LOTE: string, CANTIDAD: number }[] }[] }} data
 * @returns {{ id: string, saleOrderId: string, total: number, products: { productId: string, name: string, quantity: number, unity: string, unitPrice: number, lot: { serie: string, quantity: number }[] }[] }} - The sale order detail to App Schema.
 */
export function convertSaleOrderDetailToAppSchema(data) {
  try {
    const dbSchemaLike = {
      id: data._id,
      saleOrderId: data.ID_VENTA,
      total: data.PRECIO_TOTAL,
      products: data.PRODUCTOS.map((product) => ({
        productId: product.ID_PRODUCTO,
        name: product.NOMBRE_PRODUCTO,
        quantity: product.CANTIDAD,
        unity: product.UNIDAD_MEDIDA,
        unitPrice: product.PRECIO_UNITARIO,
        increment: product.INCREMENTO,
        lot: product.LOTES.map((lot) => ({
          serie: lot.LOTE,
          quantity: lot.CANTIDAD
        }))
      }))
    }
    console.log({ dbSchemaLike })
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting sale order detail to App Schema')
  }
}
