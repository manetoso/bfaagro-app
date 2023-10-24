import toast from 'react-hot-toast'

import { bfaApi } from '@/api/bfaApi'
import { ROLES } from '@/utils/consts'

/**
 *
 * @returns {{ id: string, name: string, lastName: string, phoneNumber: string, email: string, address: string, company: string, clientType: { clientTypeId: string, clientType: string } }[]} - The clients.
 */
export async function fetchData() {
  try {
    const { data: resp } = await bfaApi.get('/clientes', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.SALES
      }
    })
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, APELLIDOS: string, CORREO: string, DOMICILIO: string, EMPRESA: string, NOMBRE_CLIENTE: string, NUMERO_TELEFONO: string, RFC: string, TIPO_CLIENTE: { ID_TIPO_CLIENTE: string, TIPO_CLIENTE: string } } }} clientsDataBody
     * @type {{body: clientsDataBody[]}} - The Payment response body.
     */
    const json = resp
    const data = json.body.map((client) => convertClientToAppSchema(client))
    return data
  } catch (error) {
    throw new Error('Error searching clients')
  }
}

/**
 *
 * @param {{ name: string, lastName: string, phoneNumber: string, email: string, address: string, company: string, clientType: { clientTypeId: string, clientType: string } }} data
 * @returns {{ id: string, name: string, lastName: string, phoneNumber: string, email: string, address: string, company: string, clientType: { clientTypeId: string, clientType: string } }} - The client created.
 */
export async function createData(data) {
  try {
    const elementToDBSchema = convertClientToDBSchema(data)
    const { data: resp } = await bfaApi.post('/clientes', elementToDBSchema, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.SALES
      }
    })

    const json = resp
    const dataFormated = convertClientToAppSchema(json.body)
    toast.success('Cliente creado con éxito')
    return dataFormated
  } catch (error) {
    toast.error('Error creando nuevo cliente')
    throw new Error('Error creating new client')
  }
}

/**
 *
 * @param {{ name: string, lastName: string, phoneNumber: string, email: string, address: string, company: string, clientType: { clientTypeId: string, clientType: string } }} data
 * @returns {{ id: string, name: string, lastName: string, phoneNumber: string, email: string, address: string, company: string, clientType: { clientTypeId: string, clientType: string } }} - The client updated.
 */
export async function updateData(data) {
  try {
    const elementToDBSchema = convertClientToDBSchema(data)
    const { data: resp } = await bfaApi.put(
      `/clientes/${data.id}`,
      elementToDBSchema,
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          section: ROLES.SALES
        }
      }
    )
    const json = resp
    const respFormated = convertClientToAppSchema(json.body)
    toast.success('Cliente actualizado con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error actualizando cliente')
    throw new Error('Error updating client')
  }
}

/**
 *
 * @param {string} id
 * @returns {boolean} true if the product was deleted, false if not
 */
export async function deleteData(id) {
  try {
    const { data: resp } = await bfaApi.delete(`/clientes/${id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.SALES
      }
    })
    const json = resp
    toast.success('Cliente eliminado con éxito')
    return json.error || true
  } catch (error) {
    toast.error('Error eliminando cliente')
    throw new Error('Error deleting client')
  }
}

/**
 *
 * @param {{ id: string, name: string, lastName: string, phoneNumber: string, email: string, address: string, company: string, rfc, string, clientType: { clientTypeId: string, clientType: string } }} data
 * @returns {{ APELLIDOS: string, CORREO: string, DOMICILIO: string, EMPRESA: string, NOMBRE_CLIENTE: string, NUMERO_TELEFONO: string, RFC: string, TIPO_CLIENTE: { ID_TIPO_CLIENTE: string, TIPO_CLIENTE: string } }} - The client to DB Schema.
 */
export function convertClientToDBSchema(data) {
  try {
    const dbSchemaLike = {
      APELLIDOS: data.lastName,
      CORREO: data.email,
      DOMICILIO: data.address,
      EMPRESA: data.company,
      NOMBRE_CLIENTE: data.name,
      NUMERO_TELEFONO: data.phoneNumber,
      RFC: data.rfc,
      TIPO_CLIENTE: {
        ID_TIPO_CLIENTE: data.clientType.clientTypeId,
        TIPO_CLIENTE: data.clientType.clientType
      }
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting client to DB Schema')
  }
}

/**
 *
 * @param {{ _id: string, APELLIDOS: string, CORREO: string, DOMICILIO: string, EMPRESA: string, NOMBRE_CLIENTE: string, NUMERO_TELEFONO: string, RFC: string, TIPO_CLIENTE: { ID_TIPO_CLIENTE: string, TIPO_CLIENTE: string } }} data
 * @returns {{ id: string, name: string, lastName: string, phoneNumber: string, email: string, address: string, company: string, rfc, string, clientType: { clientTypeId: string, clientType: string } }} - The client to App Schema.
 */
export function convertClientToAppSchema(data) {
  try {
    const dbSchemaLike = {
      id: data._id,
      name: data.NOMBRE_CLIENTE,
      lastName: data.APELLIDOS,
      phoneNumber: data.NUMERO_TELEFONO,
      email: data.CORREO,
      address: data.DOMICILIO,
      company: data.EMPRESA,
      rfc: data.RFC,
      clientType: {
        clientTypeId: data.TIPO_CLIENTE.ID_TIPO_CLIENTE,
        clientType: data.TIPO_CLIENTE.TIPO_CLIENTE
      }
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting client to App Schema')
  }
}
