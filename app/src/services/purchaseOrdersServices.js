import toast from 'react-hot-toast'

import { bfaApi } from '@/api/bfaApi'

/**
 *
 * @returns {{ id: string, name: string, agent: string, phoneNumber: string, type: { id: string, value: string } }} - The suppliers.
 */
export async function fetchData() {
  try {
    const { data: resp } = await bfaApi.get('/ordenescompra')
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, ID_EMPRESA: string, FECHA: string, PROVEEDOR: { ID_PROVEEDOR: string, AGENTE: string }, PRODUCTOS: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, PRECIO_UNITARIO: number, TOTAL_UNITARIO: number }, IVA: number, TOTAL: number }} PurchaseOrdersBody
     * @type {{body: PurchaseOrdersBody[]}} - The PurchaseOrders response body.
     */
    const json = resp
    const data = json.body.map((purchaseOrder) =>
      convertPurchaseOrderToAppSchema(purchaseOrder)
    )
    return data
  } catch (error) {
    throw new Error('Error searching purchase orders')
  }
}

/**
 *
 * @param {{ company: string, date: string, supplier: { supplierId: string, agent: string }, products: { productId: string, name: string, quantity: number, unity: string, unitPrice: number, totalUnit: number }[], iva: number, total: number, observations: string, period: number }} data
 * @returns {{ id: string, company: string, date: string, supplier: { supplierId: string, agent: string }, products: { productId: string, name: string, quantity: number, unity: string, unitPrice: number, totalUnit: number }[], iva: number, total: number }} - The purchase order created.
 */
export async function createData(data) {
  try {
    const elementToDBSchema = converCreatetPurchaseOrderToDBSchema(data)
    const { data: resp } = await bfaApi.post(
      '/ordenescompra',
      JSON.stringify(elementToDBSchema)
    )
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, ID_EMPRESA: string, FECHA: string, PROVEEDOR: { ID_PROVEEDOR: string, AGENTE: string }, PRODUCTOS: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, PRECIO_UNITARIO: number, TOTAL_UNITARIO: number }, IVA: number, TOTAL: number  }} PurchaseOrderData
     * @type {{ body: PurchaseOrderData }} - The PurchaseOrder response body.
     */
    const json = resp
    const dataFormated = convertPurchaseOrderToAppSchema(json.body)
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
 * @param {{ id: string, company: string, date: string, supplier: { supplierId: string, agent: string }, products: { productId: string, name: string, quantity: number, unity: string, unitPrice: number, totalUnit: number }[], iva: number, total: number }} data
 * @returns {{ id: string, company: string, date: string, supplier: { supplierId: string, agent: string }, products: { productId: string, name: string, quantity: number, unity: string, unitPrice: number, totalUnit: number }[], iva: number, total: number }} - The purchase order updated.
 */
export async function updateData(data) {
  try {
    const { data: resp } = await bfaApi.put(
      `/ordenescompra/${data.id}`,
      convertPurchaseOrderToDBSchema(data)
    )
    const json = resp
    const respFormated = convertPurchaseOrderToAppSchema(json.body)
    toast.success('Orden de compra actualizada con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error actualizando orden de compra')
    throw new Error('Error updating purchase order')
  }
}

/**
 *
 * @param {string} id
 * @returns {boolean} true if the product was deleted, false if not
 */
export async function deleteData(id) {
  try {
    const { data: resp } = await bfaApi.delete(`/ordenescompra/${id}`)
    const json = resp
    toast.success('Orden de compra eliminada con éxito')
    return json.error ? false : true
  } catch (error) {
    toast.error('Error eliminando orden de compra')
    throw new Error('Error deleting purchase order')
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
 * @param {{ company: string, date: string, supplier: { supplierId: string, agent: string, supplierCompany: string }, products: { productId: string, name: string, quantity: number, unity: string, unitPrice: number, subtotal: number, iva: number, totalUnit: number }[], totalIva: number, currency: string, total: number }} data
 * @returns {{ ID_EMPRESA: string, FECHA: string, PROVEEDOR: { ID_PROVEEDOR: string, AGENTE: string, NOMBRE_EMPRESA: string }, PRODUCTOS: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, PRECIO_UNITARIO: number, TOTAL_UNITARIO: number }, IVA_TOTAL: number, MONEDA: string, TOTAL: number }} - The purchase order to DB Schema.
 */
export function convertPurchaseOrderToDBSchema(data) {
  try {
    const dbSchemaLike = {
      ID_EMPRESA: data.company,
      FECHA: data.date,
      PROVEEDOR: {
        ID_PROVEEDOR: data.supplier.supplierId,
        AGENTE: data.supplier.agent,
        NOMBRE_EMPRESA: data.supplier.supplierCompany
      },
      PRODUCTOS: data.products.map((product) => ({
        ID_PRODUCTO: product.productId,
        NOMBRE_PRODUCTO: product.name,
        CANTIDAD: product.quantity,
        UNIDAD_MEDIDA: product.unity,
        PRECIO_UNITARIO: product.unitPrice,
        SUBTOTAL: product.subtotal,
        IVA: product.iva,
        TOTAL_UNITARIO: product.totalUnit
      })),
      IVA_TOTAL: data.totalIva,
      MONEDA: data.currency,
      TOTAL: data.total
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting purchase order to DB Schema')
  }
}

/**
 *
 * @param {{ company: string, date: string, supplier: { supplierId: string, agent: string, supplierCompany: string }, products: { productId: string, name: string, quantity: number, unity: string, unitPrice: number, subtotal: number, iva: number, totalUnit: number }[], totalIva: number, currency: string, total: number, observations: string, period: number }} data
 * @returns {{ ID_EMPRESA: string, FECHA: string, PROVEEDOR: { ID_PROVEEDOR: string, AGENTE: string, NOMBRE_EMPRESA: string }, PRODUCTOS: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, PRECIO_UNITARIO: number, SUBTOTAL: number, IVA: number, TOTAL_UNITARIO: number }, IVA_TOTAL: number, MONEDA: string, TOTAL: number, OBSERVACIONES: string, PERIODO: number }} - The purchase order to DB Schema.
 */
export function converCreatetPurchaseOrderToDBSchema(data) {
  try {
    const dbSchemaLike = {
      ID_EMPRESA: data.company,
      FECHA: data.date,
      PROVEEDOR: {
        ID_PROVEEDOR: data.supplier.supplierId,
        AGENTE: data.supplier.agent,
        NOMBRE_EMPRESA: data.supplier.supplierCompany
      },
      PRODUCTOS: data.products.map((product) => ({
        ID_PRODUCTO: product.productId,
        NOMBRE_PRODUCTO: product.name,
        CANTIDAD: product.quantity,
        UNIDAD_MEDIDA: product.unity,
        PRECIO_UNITARIO: product.unitPrice,
        SUBTOTAL: product.subtotal,
        IVA: product.iva,
        TOTAL_UNITARIO: product.totalUnit
      })),
      IVA_TOTAL: data.totalIva,
      MONEDA: data.currency,
      TOTAL: data.total,
      OBSERVACIONES: data.observations,
      PERIODO: data.period
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting purchase order to DB Schema')
  }
}

/**
 *
 * @param {{ _id: string, FOLIO: string, ID_EMPRESA: string, FECHA: string, PROVEEDOR: { ID_PROVEEDOR: string, AGENTE: string, NOMBRE_EMPRESA: string }, PRODUCTOS: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, PRECIO_UNITARIO: number, SUBTOTAL: number, IVA: number, TOTAL_UNITARIO: number }, IVA_TOTAL: number, MONEDA: string TOTAL: number }} data
 * @returns {{ id: string, company: string, date: string, supplier: { supplierId: string, agent: string, supplierCompany: string }, products: { productId: string, name: string, quantity: number, unity: string, unitPrice: number, subtotal: number, iva: number, totalUnit: number }[], totalIva: number, currency: string, total: number }} - The purchase order to App Schema.
 */
export function convertPurchaseOrderToAppSchema(data) {
  try {
    const dbSchemaLike = {
      id: data._id,
      folio: data.FOLIO,
      company: data.ID_EMPRESA,
      date: data.FECHA,
      dateFormatted: new Date(data.FECHA).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      supplier: {
        supplierId: data.PROVEEDOR.ID_PROVEEDOR,
        agent: data.PROVEEDOR.AGENTE,
        supplierCompany: data.PROVEEDOR.NOMBRE_EMPRESA
      },
      products: data.PRODUCTOS.map((product) => ({
        productId: product.ID_PRODUCTO,
        name: product.NOMBRE_PRODUCTO,
        quantity: product.CANTIDAD,
        unity: product.UNIDAD_MEDIDA,
        unitPrice: product.PRECIO_UNITARIO,
        subtotal: product.SUBTOTAL,
        iva: product.IVA,
        totalUnit: product.TOTAL_UNITARIO
      })),
      totalIva: data.IVA_TOTAL,
      currency: data.MONEDA,
      total: data.TOTAL
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting purchase order to App Schema')
  }
}
