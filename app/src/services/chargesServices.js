import toast from 'react-hot-toast'

import { bfaApi } from '@/api/bfaApi'

export async function fetchData() {
  try {
    const { data: resp } = await bfaApi.get('/cobros')
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, ID_CUENTAxCOBRAR: string, FOLIO_CXC: string, FOLIO_COBRO: string, ID_VENTA: string, FECHA_COBRO: string, CANTIDAD_COBRADA: number, CLIENTE: { ID_CLIENTE: string, NOMBRE_CLIENTE: string } }} ChargesBody
     * @type {{body: ChargesBody[]}} - The Crages response body.
     */
    const json = resp
    const data = json.body.map((charge) => convertChargeToAppSchema(charge))
    return data
  } catch (error) {
    throw new Error('Error searching charges')
  }
}

export async function createData(data) {
  try {
    const elementToDBSchema = convertChargeToDBSchema(data)
    const { data: resp } = await bfaApi.post(
      '/cobros',
      elementToDBSchema
    )

    const json = resp
    const dataFormated = convertChargeToAppSchema(json.body)
    toast.success('Cobro creado con éxito')
    return dataFormated
  } catch (error) {
    toast.error('Error creando nuevo cobro')
    throw new Error('Error creating new charge')
  }
}

export async function updateData(data) {
  try {
    const elementToDBSchema = convertChargeToDBSchema(data)
    const { data: resp } = await bfaApi.put(
      `/cobros/${data.id}`,
      elementToDBSchema
    )
    const json = resp
    const respFormated = convertChargeToAppSchema(json.body)
    toast.success('Cobro actualizado con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error actualizando cobro')
    throw new Error('Error updating charge')
  }
}

/**
 *
 * @param {string} id
 * @returns {boolean} true if the product was deleted, false if not
 */
export async function deleteData(id) {
  try {
    const { data: resp } = await bfaApi.delete(`/cobros/${id}`)
    const json = resp
    toast.success('Cobro eliminado con éxito')
    return !json.error
  } catch (error) {
    toast.error('Error eliminando cobro')
    throw new Error('Error deleting charge')
  }
}

/**
 *
 * @param {{ accountReceivableId: string, accountReceivableFolio: string, saleOrderId: string, quantityCharged: number, observations: string, client: { clientId: string, clientName: string } }} data
 * @returns {{ ID_CUENTAxCOBRAR: string, FOLIO_CXC: string, ID_VENTA: string, CANTIDAD_COBRADA: number, OBSERVACIONES: string, CLIENTE: { ID_CLIENTE: string, NOMBRE_CLIENTE: string } }} - The charge to DB Schema.
 */
export function convertChargeToDBSchema(data) {
  try {
    const dbSchemaLike = {
      ID_CUENTAxCOBRAR: data.accountReceivableId,
      FOLIO_CXC: data.accountReceivableFolio,
      ID_VENTA: data.saleOrderId,
      CANTIDAD_COBRADA: data.quantityCharged,
      OBSERVACIONES: data.observations,
      CLIENTE: {
        ID_CLIENTE: data.client.clientId,
        NOMBRE_CLIENTE: data.client.clientName
      }
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting charge to DB Schema')
  }
}

/**
 *
 * @param {{ _id: string, ID_CUENTAxCOBRAR: string, FOLIO_CXC: string, FOLIO_COBRO: string, ID_VENTA: string, FECHA_COBRO: string, CANTIDAD_COBRADA: number, CLIENTE: { ID_CLIENTE: string, NOMBRE_CLIENTE: string } }} data
 * @returns {{ id: string, accountReceivableId: string, accountReceivableFolio: string, chargeFolio: string, saleId: string, chargeDate: string, chargeDateFormatted: string, quantityCharged: number, client: { clientId: string, clientName: string } }} - The charge to App Schema.
 */
export function convertChargeToAppSchema(data) {
  try {
    const dbSchemaLike = {
      id: data._id,
      accountReceivableId: data.ID_CUENTAxCOBRAR,
      accountReceivableFolio: data.FOLIO_CXC,
      chargeFolio: data.FOLIO_COBRO,
      saleId: data.ID_VENTA,
      chargeDate: data.FECHA_COBRO,
      chargeDateFormatted: new Date(data.FECHA_COBRO).toLocaleDateString(
        'es-MX',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      ),
      quantityCharged: data.CANTIDAD_COBRADA,
      client: {
        clientId: data.CLIENTE.ID_CLIENTE,
        clientName: data.CLIENTE.NOMBRE_CLIENTE
      }
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting charges to App Schema')
  }
}
