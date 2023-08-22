import toast from 'react-hot-toast'

import { bfaApi } from '@/api/bfaApi'

export async function fetchData() {
  try {
    const { data: resp } = await bfaApi.get('/cxc')
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, ID_VENTA: string, FECHA_EMISION: string, FOLIO_VENTA: string, FOLIO_CXC: string, FECHA_VENCIMIENTO: string, TOTAL_VENTA: number, TOTAL_PAGADO: number, SALDO: number, OBSERVACIONES: string, ESTADO: string, MONEDA: string, CLIENTES: { CLIENTE_ORIGEN: { ID_CLIENTE: string, NOMBRE_CLIENTE: string }, CLIENTE_DESTINO: { ID_CLIENTE: string, NOMBRE_CLIENTE: string } } }} AccountsReceivableBody
     * @type {{body: AccountsReceivableBody[]}} - The AccountsReceivable response body.
     */
    const json = resp
    const data = json.body.map((account) => convertAccountsToAppSchema(account))
    return data
  } catch (error) {
    throw new Error('Error searching accounts')
  }
}

export async function updateData(data) {
  try {
    const { data: resp } = await bfaApi.put(
      `/cxc/${data.id}`,
      convertAccountToDBSchema(data)
    )
    const json = resp
    const respFormated = convertAccountsToAppSchema(json.body)
    toast.success('Cuenta por cobrar actualizada con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error actualizando cuenta por cobrar')
    throw new Error('Error updating account')
  }
}

/**
 *
 * @param {string} id
 * @returns {boolean} true if the product was deleted, false if not
 */
export async function deleteData(id) {
  try {
    const { data: resp } = await bfaApi.delete(`/cxc/${id}`)
    const json = resp
    toast.success('Cuenta por cobrar eliminada con éxito')
    return !json.error
  } catch (error) {
    toast.error('Error eliminando cuenta por cobrar')
    throw new Error('Error deleting account')
  }
}

/**
 *
 * @param {{ saleOrderId: string, emitionDate: string, orderFolio: string, folio: string, expirationDate: string, totalSale: number, totalPaid: number, balance: number, observations: string, status: string }} data
 */
export function convertAccountToDBSchema(data) {
  try {
    const dbSchemaLike = {
      ID_VENTA: data.saleOrderId,
      FECHA_EMISION: data.emitionDate,
      FOLIO_VENTA: data.orderFolio,
      FOLIO_CXC: data.folio,
      FECHA_VENCIMIENTO: data.expirationDate,
      TOTAL_VENTA: data.totalSale,
      TOTAL_PAGADO: data.totalPaid,
      SALDO: data.balance,
      OBSERVACIONES: data.observations,
      ESTADO: data.status
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting account to DB Schema')
  }
}

/**
 *
 * @param {{ _id: string, ID_VENTA: string, FECHA_EMISION: string, FOLIO_VENTA: string, FOLIO_CXC: string, FECHA_VENCIMIENTO: string, TOTAL_VENTA: number, TOTAL_PAGADO: number, SALDO: number, OBSERVACIONES: string, ESTADO: string, MONEDA: string, CLIENTES: { CLIENTE_ORIGEN: { ID_CLIENTE: string, NOMBRE_CLIENTE: string }, CLIENTE_DESTINO: { ID_CLIENTE: string, NOMBRE_CLIENTE: string } } }} data
 */
function convertAccountsToAppSchema(data) {
  try {
    const dbSchemaLike = {
      id: data._id,
      saleOrderId: data.ID_VENTA,
      emitionDate: data.FECHA_EMISION,
      emitionDateFormatted: new Date(data.FECHA_EMISION).toLocaleDateString(
        'es-MX',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      ),
      orderFolio: data.FOLIO_VENTA,
      folio: data.FOLIO_CXC,
      expirationDate: data.FECHA_VENCIMIENTO,
      expirationDateFormatted: new Date(
        data.FECHA_VENCIMIENTO
      ).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      totalSale: data.TOTAL_VENTA,
      totalPaid: data.TOTAL_PAGADO,
      balance: data.SALDO,
      observations: data.OBSERVACIONES,
      status: data.ESTADO,
      currency: data.MONEDA,
      clients: {
        originClient: {
          clientId: data.CLIENTES.CLIENTE_ORIGEN.ID_CLIENTE,
          clientName: data.CLIENTES.CLIENTE_ORIGEN.NOMBRE_CLIENTE
        },
        destinationClient: {
          clientId: data.CLIENTES.CLIENTE_DESTINO.ID_CLIENTE,
          clientName: data.CLIENTES.CLIENTE_DESTINO.NOMBRE_CLIENTE
        }
      }
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting accounts to App Schema')
  }
}
