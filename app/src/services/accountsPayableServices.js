import toast from 'react-hot-toast'

import { bfaApi } from '@/api/bfaApi'
import { ROLES } from '@/utils/consts'

/**
 *
 * @returns {{ id: string, purchaseOrderId: string, emitionDate: string, emitionDateFormatted: string, orderFolio: string, folio: string, paymentDate: string, paymentDateFormatted: string, quantity: number, quantityPaid: number, balance: number, observations: string, status: string, supplier: { supplierId: string, supplierCompany: string, agent: string } }[]} - The accounts payable data.
 */
export async function fetchData() {
  try {
    const { data: resp } = await bfaApi.get('/cxp', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.PURCHASES
      }
    })
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, ID_ORDEN_COMPRA: string, FECHA_EMISION: string, FOLIO_ORDEN: string, FOLIO_CXP: string, FECHA_PAGO: string, CANTIDAD: number, CANTIDAD_PAGADA: number, SALDO: number, OBSERVACIONES: string, ESTADO: string, PROVEEDOR: { ID_PROVEEDOR: string, NOMBRE_EMPRESA: string, AGENTE: string } }} AccountsPayableBody
     * @type {{body: AccountsPayableBody[]}} - The AccountsPayable response body.
     */
    const json = resp
    const data = json.body.map((purchaseOrder) =>
      convertAccountsPayableToAppSchema(purchaseOrder)
    )
    return data
  } catch (error) {
    throw new Error('Error searching accounts payable')
  }
}

/**
 *
 * @param {{ company: string, date: string, supplier: { supplierId: string, agent: string }, products: { productId: string, name: string, quantity: number, unity: string, unitPrice: number, totalUnit: number }[], iva: number, total: number }} data
 * @returns {{ id: string, company: string, date: string, supplier: { supplierId: string, agent: string }, products: { productId: string, name: string, quantity: number, unity: string, unitPrice: number, totalUnit: number }[], iva: number, total: number }} - The purchase order created.
 */
export async function createData(data) {
  try {
    const elementToDBSchema = convertAccountPayableToDBSchema(data)
    const { data: resp } = await bfaApi.post(
      '/ordenescompra',
      JSON.stringify(elementToDBSchema),
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          section: ROLES.PURCHASES
        }
      }
    )
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, ID_EMPRESA: string, FECHA: string, PROVEEDOR: { ID_PROVEEDOR: string, AGENTE: string }, PRODUCTOS: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, PRECIO_UNITARIO: number, TOTAL_UNITARIO: number }, IVA: number, TOTAL: number  }} PurchaseOrderData
     * @type {{ body: PurchaseOrderData }} - The PurchaseOrder response body.
     */
    const json = resp
    const dataFormated = convertAccountsPayableToAppSchema(json.body)
    toast.success('Orden de compra creada con éxito')
    return dataFormated
  } catch (error) {
    console.log({ error })
    toast.error('Error creando nueva orden de compra')
    throw new Error('Error creating new purchase order')
  }
}

/**
 *
 * @param {{ id: string, purchaseOrderId: string, emitionDate: string, emitionDateFormatted: string, orderFolio: string, folio: string, paymentDate: string, paymentDateFormatted: string, quantity: number, quantityPaid: number, balance: number, observations: string, status: string, supplier: { supplierId: string, supplierCompany: string, agent: string } }} data
 * @returns {{ id: string, purchaseOrderId: string, emitionDate: string, emitionDateFormatted: string, orderFolio: string, folio: string, paymentDate: string, paymentDateFormatted: string, quantity: number, quantityPaid: number, balance: number, observations: string, status: string, supplier: { supplierId: string, supplierCompany: string, agent: string } }} - The accounts payable updated.
 */
export async function updateData(data) {
  try {
    const { data: resp } = await bfaApi.put(
      `/cxp/${data.id}`,
      convertAccountPayableToDBSchema(data),
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          section: ROLES.PURCHASES
        }
      }
    )
    const json = resp
    const respFormated = convertAccountsPayableToAppSchema(json.body)
    toast.success('Cuenta por pagar actualizada con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error actualizando cuenta por pagar')
    throw new Error('Error updating accounts payable')
  }
}

/**
 *
 * @param {string} id
 * @returns {boolean} true if the product was deleted, false if not
 */
export async function deleteData(id) {
  try {
    const { data: resp } = await bfaApi.delete(`/cxp/${id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.PURCHASES
      }
    })
    const json = resp
    toast.success('Cuenta por pagar eliminada con éxito')
    return !json.error
  } catch (error) {
    toast.error('Error eliminando cuenta por pagar')
    throw new Error('Error deleting accounts payable')
  }
}

/**
 *
 * @param {{ purchaseOrderId: string, emitionDate: string, emitionDateFormatted: string, orderFolio: string, folio: string, paymentDate: string, paymentDateFormatted: string, quantity: number, quantityPaid: number, balance: number, observations: string, status: string, supplier: { supplierId: string, supplierCompany: string, agent: string } }} data
 * @returns {{ ID_ORDEN_COMPRA: string, FECHA_EMISION: string, FOLIO_ORDEN: string, FOLIO_CXP: string, FECHA_PAGO: string, CANTIDAD: number, CANTIDAD_PAGADA: number, SALDO: number, OBSERVACIONES: string, ESTADO: string, PROVEEDOR: { ID_PROVEEDOR: string, NOMBRE_EMPRESA: string, AGENTE: string } }} - The accounts payable to DB Schema.
 */
export function convertAccountPayableToDBSchema(data) {
  try {
    const dbSchemaLike = {
      ID_ORDEN_COMPRA: data.purchaseOrderId,
      FECHA_EMISION: data.emitionDate,
      FOLIO_ORDEN: data.orderFolio,
      FOLIO_CXP: data.folio,
      FECHA_PAGO: data.paymentDate,
      CANTIDAD: data.quantity,
      CANTIDAD_PAGADA: data.quantityPaid,
      SALDO: data.balance,
      OBSERVACIONES: data.observations,
      ESTADO: data.status,
      PROVEEDOR: {
        ID_PROVEEDOR: data.supplier.supplierId,
        NOMBRE_EMPRESA: data.supplier.supplierCompany,
        AGENTE: data.supplier.agent
      }
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting accounts payable to DB Schema')
  }
}

/**
 *
 * @param {{ _id: string, ID_ORDEN_COMPRA: string, FECHA_EMISION: string, FOLIO_ORDEN: string, FOLIO_CXP: string, FECHA_PAGO: string, CANTIDAD: number, CANTIDAD_PAGADA: number, SALDO: number, OBSERVACIONES: string, ESTADO: string, PROVEEDOR: { ID_PROVEEDOR: string, NOMBRE_EMPRESA: string, AGENTE: string } }} data
 * @returns {{ id: string, purchaseOrderId: string, emitionDate: string, emitionDateFormatted: string, orderFolio: string, folio: string, paymentDate: string, paymentDateFormatted: string, quantity: number, quantityPaid: number, balance: number, observations: string, status: string, supplier: { supplierId: string, supplierCompany: string, agent: string } }} - The accounts payable to App Schema.
 */
export function convertAccountsPayableToAppSchema(data) {
  try {
    const dbSchemaLike = {
      id: data._id,
      purchaseOrderId: data.ID_ORDEN_COMPRA,
      emitionDate: data.FECHA_EMISION,
      emitionDateFormatted: new Date(data.FECHA_EMISION).toLocaleDateString(
        'es-MX',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      ),
      orderFolio: data.FOLIO_ORDEN,
      folio: data.FOLIO_CXP,
      paymentDate: data.FECHA_PAGO,
      paymentDateFormatted: new Date(data.FECHA_PAGO).toLocaleDateString(
        'es-MX',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      ),
      quantity: data.CANTIDAD,
      quantityPaid: data.CANTIDAD_PAGADA,
      balance: data.SALDO,
      observations: data.OBSERVACIONES,
      status: data.ESTADO,
      supplier: {
        supplierId: data.PROVEEDOR.ID_PROVEEDOR,
        supplierCompany: data.PROVEEDOR.NOMBRE_EMPRESA,
        agent: data.PROVEEDOR.AGENTE
      }
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting accounts payable to App Schema')
  }
}
