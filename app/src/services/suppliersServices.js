import toast from 'react-hot-toast'

import { bfaApi } from '@/api/bfaApi'

/**
 *
 * @returns {{ id: string, name: string, agent: string, phoneNumber: string, type: { id: string, value: string } }} - The suppliers.
 */
export async function fetchData() {
  try {
    const { data: resp } = await bfaApi.get('/proveedores')
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, NOMBRE_EMPRESA: string, AGENTE: string, NUMERO_TELEFONO: string, TIPO_PROVEEDOR: { ID_TIPO_PROVEEDOR: string, TIPO_PROVEEDOR: string } }} SuppliersBody
     * @type {{body: SuppliersBody[]}} - The Suppliers response body.
     */
    const json = resp
    const data = json.body.map((supplier) =>
      convertSupplierToAppSchema(supplier)
    )
    return data
  } catch (error) {
    throw new Error('Error searching suppliers')
  }
}

/**
 *
 * @param {{ name: string, agent: string, phoneNumber: string, type: { id: string, value: string } }} data
 * @returns {{ id: string, name: string, agent: string, phoneNumber: string, type: { id: string, value: string } }} - The supplier created.
 */
export async function createData(data) {
  try {
    const elementToDBSchema = convertSupplierToDBSchema(data)
    const { data: resp } = await bfaApi.post(
      '/proveedores',
      JSON.stringify(elementToDBSchema)
    )
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, NOMBRE_EMPRESA: string, AGENTE: string, NUMERO_TELEFONO: string, TIPO_PROVEEDOR: { ID_TIPO_PROVEEDOR: string, TIPO_PROVEEDOR: string } }} SupplierData
     * @type {{ body: SupplierData }} - The Supplier response body.
     */
    const json = resp
    const dataFormated = convertSupplierToAppSchema(json.body)
    toast.success('Proveedor creado con éxito')
    return dataFormated
  } catch (error) {
    toast.error('Error creando nuevo proveedor')
    throw new Error('Error creating new supplier')
  }
}

/**
 *
 * @param {{ id: string, name: string, agent: string, phoneNumber: string, type: { id: string, value: string } }} data
 * @returns {{ id: string, name: string, agent: string, phoneNumber: string, type: { id: string, value: string } }} - The supplier updated.
 */
export async function updateData(data) {
  try {
    const { data: resp } = await bfaApi.put(
      `/proveedores/${data.id}`,
      convertSupplierToDBSchema(data)
    )
    const json = resp
    const respFormated = convertSupplierToAppSchema(json.body)
    toast.success('Proveedor actualizado con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error actualizando proveedor')
    throw new Error('Error updating supplier')
  }
}

/**
 *
 * @param {string} id
 * @returns {boolean} true if the product was deleted, false if not
 */
export async function deleteData(id) {
  try {
    const { data: resp } = await bfaApi.delete(`/proveedores/${id}`)
    const json = resp
    toast.success('Proveedor eliminado con éxito')
    return json.error ? false : true
  } catch (error) {
    toast.error('Error eliminando proveedor')
    throw new Error('Error deleting supplier')
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
 * @param {{ name: string, agent: string, phoneNumber: string, type: { id: string, value: string } }} data
 * @returns {{ NOMBRE_EMPRESA: string, AGENTE: string, NUMERO_TELEFONO: string, TIPO_PROVEEDOR: { ID_TIPO_PROVEEDOR: string, TIPO_PROVEEDOR: string } }} - The supplier to DB Schema.
 */
export function convertSupplierToDBSchema(data) {
  try {
    const dbSchemaLike = {
      NOMBRE_EMPRESA: data.name,
      AGENTE: data.agent,
      NUMERO_TELEFONO: data.phoneNumber,
      TIPO_PROVEEDOR: {
        ID_TIPO_PROVEEDOR: data.type.id,
        TIPO_PROVEEDOR: data.type.value
      }
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting supplier to DB Schema')
  }
}

/**
 *
 * @param {{ documentType: string, value: string }} data
 * @returns {{ TIPO_DOCUMENTO: string, VALOR: string }} - The type to DB Schema.
 */
export function convertTypeToDBSchema(data) {
  try {
    const dbSchemaLike = {
      TIPO_DOCUMENTO: data.documentType,
      VALOR: data.value
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting type to DB Schema')
  }
}

/**
 *
 * @param {{ _id: string, NOMBRE_EMPRESA: string, AGENTE: string, NUMERO_TELEFONO: string, TIPO_PROVEEDOR: { ID_TIPO_PROVEEDOR: string, TIPO_PROVEEDOR: string } }} data
 * @returns {{ id: string, name: string, agent: string, phoneNumber: string, type: { id: string, value: string } }} - The supplier to App Schema.
 */
export function convertSupplierToAppSchema(data) {
  try {
    const dbSchemaLike = {
      id: data._id,
      name: data.NOMBRE_EMPRESA,
      agent: data.AGENTE,
      phoneNumber: data.NUMERO_TELEFONO,
      type: {
        id: data.TIPO_PROVEEDOR.ID_TIPO_PROVEEDOR,
        value: data.TIPO_PROVEEDOR.TIPO_PROVEEDOR
      }
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting supplier to App Schema')
  }
}

/**
 *
 * @param {{ _id: string, TIPO_DOCUMENTO: string, VALOR: string }} data
 * @returns {{ id: string, documentType: string, value: string }} - The type to App Schema.
 */
export function convertTypeToAppSchema(data) {
  try {
    const dbSchemaLike = {
      id: data._id,
      documentType: data.TIPO_DOCUMENTO,
      value: data.VALOR
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting type to App Schema')
  }
}
