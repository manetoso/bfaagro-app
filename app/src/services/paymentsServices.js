import toast from 'react-hot-toast'

import { bfaApi } from '@/api/bfaApi'

/**
 *
 * @returns {{ id: string, accountPayableId: string, accountPayableFolio: string, paymentFolio: string, paymentDate: string, paymentDateFormatted: string, quantityPaid: number, supplier: { supplierId: string, supplierCompany: string, agent: string } }[]} - The payments.
 */
export async function fetchData() {
  try {
    const { data: resp } = await bfaApi.get('/pagos')
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, ID_CUENTAxPAGAR: string, FOLIO_CXP: string, FOLIO_PAGO: string, FECHA_PAGO: string, CANTIDAD_PAGADA: number, PROVEEDOR: { ID_PROVEEDOR: string, NOMBRE_EMPRESA: string, AGENTE: string } }} PaymentBody
     * @type {{body: PaymentBody[]}} - The Payment response body.
     */
    const json = resp
    const data = json.body.map((payment) => convertPaymentToAppSchema(payment))
    return data
  } catch (error) {
    throw new Error('Error searching payments')
  }
}

/**
 *
 * @param {{ accountPayableId: string, accountPayableFolio: string, paymentFolio: string, paymentDate: string, paymentDateFormatted: string, quantityPaid: number, supplier: { supplierId: string, supplierCompany: string, agent: string } }} data
 * @returns {{ id: string, accountPayableId: string, accountPayableFolio: string, paymentFolio: string, paymentDate: string, paymentDateFormatted: string, quantityPaid: number, supplier: { supplierId: string, supplierCompany: string, agent: string } }} - The payment created.
 */
export async function createData(data) {
  try {
    const elementToDBSchema = convertPaymentToDBSchema(data)
    const { data: resp } = await bfaApi.post(
      '/pagos',
      JSON.stringify(elementToDBSchema)
    )

    const json = resp
    const dataFormated = convertPaymentToAppSchema(json.body)
    toast.success('Pago creado con éxito')
    return dataFormated
  } catch (error) {
    toast.error('Error creando nuevo pago')
    throw new Error('Error creating new payment')
  }
}

/**
 *
 * @param {{ id: string, accountPayableId: string, accountPayableFolio: string, paymentFolio: string, paymentDate: string, paymentDateFormatted: string, quantityPaid: number, supplier: { supplierId: string, supplierCompany: string, agent: string } }} data
 * @returns {{ id: string, accountPayableId: string, accountPayableFolio: string, paymentFolio: string, paymentDate: string, paymentDateFormatted: string, quantityPaid: number, supplier: { supplierId: string, supplierCompany: string, agent: string } }} - The payment updated.
 */
export async function updateData(data) {
  try {
    const { data: resp } = await bfaApi.put(
      `/pagos/${data.id}`,
      convertPaymentToDBSchema(data)
    )
    const json = resp
    const respFormated = convertPaymentToAppSchema(json.body)
    toast.success('Pago actualizado con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error actualizando pago')
    throw new Error('Error updating payment')
  }
}

/**
 *
 * @param {string} id
 * @returns {boolean} true if the product was deleted, false if not
 */
export async function deleteData(id) {
  try {
    const { data: resp } = await bfaApi.delete(`/pagos/${id}`)
    const json = resp
    toast.success('Pago eliminado con éxito')
    return json.error ? false : true
  } catch (error) {
    toast.error('Error eliminando pago')
    throw new Error('Error deleting payment')
  }
}

/**
 *
 * @returns {{ id: string, documentType: string, value: string }[]} - The suppliers types.
 */
export async function fetchSupplierTypes() {
  try {
    const { data: resp } = await bfaApi.get('/tiposdocumentos/proveedor')
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, TIPO_DOCUMENTO: string, VALOR: string }} SupplierTypesBody
     * @type {{body: SupplierTypesBody[]}} - The SupplierTypes response body.
     */
    const json = resp
    const data = json.body.map((type) => convertTypeToAppSchema(type))
    return data
  } catch (error) {
    throw new Error('Error searching suppliers types')
  }
}

/**
 *
 * @param {{ accountPayableId: string, accountPayableFolio: string, paymentFolio: string, paymentDate: string, paymentDateFormatted: string, quantityPaid: number, supplier: { supplierId: string, supplierCompany: string, agent: string } }} data
 * @returns {{ ID_CUENTAxPAGAR: string, FOLIO_CXP: string, FOLIO_PAGO: string, FECHA_PAGO: string, CANTIDAD_PAGADA: number, PROVEEDOR: { ID_PROVEEDOR: string, NOMBRE_EMPRESA: string, AGENTE: string } }} - The payment to DB Schema.
 */
export function convertPaymentToDBSchema(data) {
  try {
    const dbSchemaLike = {
      ID_CUENTAxPAGAR: data.accountPayableId,
      FOLIO_CXP: data.accountPayableFolio,
      // FOLIO_PAGO: data.paymentFolio,
      // FECHA_PAGO: data.paymentDate,
      CANTIDAD_PAGADA: data.quantityPaid,
      PROVEEDOR: {
        ID_PROVEEDOR: data.supplier.supplierId,
        NOMBRE_EMPRESA: data.supplier.supplierCompany,
        AGENTE: data.supplier.agent
      }
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting payment to DB Schema')
  }
}

/**
 *
 * @param {{ _id: string, ID_CUENTAxPAGAR: string, FOLIO_CXP: string, FOLIO_PAGO: string, FECHA_PAGO: string, CANTIDAD_PAGADA: number, PROVEEDOR: { ID_PROVEEDOR: string, NOMBRE_EMPRESA: string, AGENTE: string } }} data
 * @returns {{ id: string, accountPayableId: string, accountPayableFolio: string, paymentFolio: string, paymentDate: string, paymentDateFormatted: string, quantityPaid: number, supplier: { supplierId: string, supplierCompany: string, agent: string } }} - The payment to App Schema.
 */
export function convertPaymentToAppSchema(data) {
  try {
    const dbSchemaLike = {
      id: data._id,
      accountPayableId: data.ID_CUENTAxPAGAR,
      accountPayableFolio: data.FOLIO_CXP,
      paymentFolio: data.FOLIO_PAGO,
      paymentDate: data.FECHA_PAGO,
      paymentDateFormatted: new Date(data.FECHA_PAGO).toLocaleDateString(
        'es-MX',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      ),
      quantityPaid: data.CANTIDAD_PAGADA,
      supplier: {
        supplierId: data.PROVEEDOR.ID_PROVEEDOR,
        supplierCompany: data.PROVEEDOR.NOMBRE_EMPRESA,
        agent: data.PROVEEDOR.AGENTE
      }
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting payment to App Schema')
  }
}
