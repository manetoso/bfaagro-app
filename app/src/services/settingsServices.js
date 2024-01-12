import toast from 'react-hot-toast'

import { bfaApi } from '@/api/bfaApi'
import { FIELDS_TYPES } from '@/stores/useSettingsStore'
import { ROLES } from '@/utils/consts'

/**
 *
 * @returns {{ id: string, name: string, address: string }} company data
 */
export async function fetchCompanyData() {
  try {
    const { data: resp } = await bfaApi.get('/empresa', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.ADMIN
      }
    })
    /**
     * The respponse body from the request.
     * @typedef { { _id: string, EMPRESA: string, DIRECCION: string } } CompanyData
     * @type {{body: CompanyData[]}} - The Company response body.
     */
    const json = resp

    let data
    if (json.body.length === 0) {
      data = {
        id: '',
        name: '',
        address: ''
      }
    } else {
      data = convertCopmanyDataToAppShema(json.body[0])
    }
    return data
  } catch (error) {
    throw new Error('Error searching company data')
  }
}

/**
 *
 * @param {{ id: string, name: string, address: string }} companyData - The company data to create.
 * @returns {{ id: string, name: string, address: string }} company data
 */
export async function createUpdateCompanyData(companyData) {
  try {
    const companyToDB = convertCopmanyDataToDBSchema({
      name: companyData.name,
      address: companyData.address
    })
    let resp
    if (companyData.id !== '') {
      const { data } = await bfaApi.put(
        `/empresa/${companyData.id}`,
        companyToDB,
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            section: ROLES.ADMIN
          }
        }
      )
      resp = data
      toast.success('Empresa actualizada')
    } else {
      const { data } = await bfaApi.post('/empresa', companyToDB)
      resp = data
      toast.success('Empresa creada')
    }
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, EMPRESA: string, DIRECCION: string }} CompanyData
     * @type {{ body: CompanyData }} - The Company response body.
     */
    const json = resp

    const data = convertCopmanyDataToAppShema(json.body)
    return data
  } catch (error) {
    toast.error('Error creando/actualizando empresa')
    throw new Error('Error creating/updating company data')
  }
}

/**
 *
 * @returns {{ id: string, user: string, roles: {id: string, role: string}[] }} user data
 */
export async function fetchUsersData() {
  try {
    const { data: resp } = await bfaApi.get('/usuarios', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.ADMIN
      }
    })
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, USUARIO: string, ROLES: {ID_ROL: string, ROL: string}[] createdAt: string, createdAt: string updatedAt: string }} UserData
     * @type {{body: UserData[]}} - The Company response body.
     */
    const json = resp

    const data = json.body.map((user) => convertUserDataToAppShema(user))
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error searching users data')
  }
}

/**
 *
 * @returns {{ id: string, value: string, documentType: string }} rol data
 */
export async function fetchRolesData() {
  try {
    const { data: resp } = await bfaApi.get('/tiposdocumentos/rol', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.ADMIN
      }
    })
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, VALOR: string, TIPO_DOCUMENTO: string }} RolData
     * @type {{body: RolData[]}} - The Rol response body.
     */
    const json = resp

    const data = json.body.map((user) => convertRolDataToAppShema(user))
    return data
  } catch (error) {
    throw new Error('Error searching roles data')
  }
}

/**
 *
 * @returns {{ id: string, value: string, documentType: string }} rol data
 */
export async function fetchLotsData() {
  try {
    const { data: resp } = await bfaApi.get('/lotes', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.ADMIN
      }
    })
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, VALOR: string, TIPO_DOCUMENTO: string }} RolData
     * @type {{body: RolData[]}} - The Rol response body.
     */
    const json = resp

    const data = json.body.map((lot) => convertLotsDataToAppShema(lot))
    return data
  } catch (error) {
    throw new Error('Error searching lots data')
  }
}

const fieldToSchemaConverter = {
  [FIELDS_TYPES.USERS]: convertUserDataToDBShema,
  [FIELDS_TYPES.ROLES]: convertRolDataToDBShema,
  [FIELDS_TYPES.LOTS]: convertLotDataToDBShema
}
const fieldToAppSchemaConverter = {
  [FIELDS_TYPES.USERS]: convertUserDataToAppShema,
  [FIELDS_TYPES.ROLES]: convertRolDataToAppShema,
  [FIELDS_TYPES.LOTS]: convertLotsDataToAppShema
}
const requestPath = {
  [FIELDS_TYPES.USERS]: '/usuarios',
  [FIELDS_TYPES.ROLES]: '/tiposdocumentos',
  [FIELDS_TYPES.LOTS]: '/lotes'
}

/**
 *
 * @param {object} data
 * @param {Like<FIELDS_TYPES>} field
 * @returns
 */
export async function createData(data, field) {
  try {
    const elementToDBSchema = fieldToSchemaConverter[field](data)
    const { data: resp } = await bfaApi.post(
      requestPath[field],
      JSON.stringify(elementToDBSchema),
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          section: ROLES.ADMIN
        }
      }
    )
    const json = resp
    const respFormated = fieldToAppSchemaConverter[field](json.body)
    toast.success('Elemento creado con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error creando nuevo elemento')
    throw new Error('Error creating new user/rol/lot')
  }
}

/**
 *
 * @param {object} data
 * @param {Like<FIELDS_TYPES>} field
 * @returns
 */
export async function updateData(data, field) {
  try {
    const elementToDBSchema = fieldToSchemaConverter[field](data)
    const { data: resp } = await bfaApi.put(
      `${requestPath[field]}/${data.id}`,
      JSON.stringify(elementToDBSchema),
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          section: ROLES.ADMIN
        }
      }
    )
    const json = resp
    const respFormated = fieldToAppSchemaConverter[field](json.body)
    toast.success('Elemento actualizado con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error actualizando nuevo elemento')
    throw new Error('Error updating new user/rol')
  }
}

/**
 *
 * @param {string} id
 * @returns {boolean} true if the product was deleted, false if not
 */
export async function deleteData(id, field) {
  try {
    const { data: resp } = await bfaApi.delete(`${requestPath[field]}/${id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.ADMIN
      }
    })
    const json = resp
    toast.success('Elemento eliminado con éxito')
    return !json.error
  } catch (error) {
    toast.error('Error eliminando elemento')
    throw new Error('Error deleting user/rol')
  }
}

/**
 *
 * @param {{ name: string, address: string }} companyData - The company data to update.
 * @returns {{ EMPRESA: string, DIRECCION: string }} company data
 */
export function convertCopmanyDataToDBSchema(companyData) {
  return {
    EMPRESA: companyData.name,
    DIRECCION: companyData.address
  }
}

/**
 * @param {{ user: string, password?: string, roles?: {id: string, role: string}[] }} userData - The user data to update.
 * @returns {{ USUARIO: string, CONTRASENA?: string ROLES: {ID_ROL: string, ROL: string}[] }} user data
 */
export function convertUserDataToDBShema(userData) {
  const data = {
    USUARIO: userData.user
  }
  if (userData.roles) {
    data.ROLES = userData.roles.map((role) => ({
      ID_ROL: role.id,
      ROL: role.role
    }))
  }
  if (userData.password) {
    data.CONTRASENA = userData.password
  }
  return data
}

/**
 * @param {{ value: string, documentType: string }} rolData - The rol data to update.
 * @returns {{ VALOR: string, TIPO_DOCUMENTO: string }} rol data
 */
export function convertRolDataToDBShema(rolData) {
  return {
    VALOR: rolData.value,
    TIPO_DOCUMENTO: rolData.documentType
  }
}

/**
 * @param {{ serialNumber: string, consecutive: number, productId: string, lastMade: string }} lotData - The lot data to update.
 * @returns {{ SERIE: string, CONSECUTIVO: number, ID_PRODUCTO: string, ULTIMO_REALIZADO: string }} lot data
 */
export function convertLotDataToDBShema(lotData) {
  return {
    SERIE: lotData.serialNumber,
    CONSECUTIVO: lotData.consecutive,
    ID_PRODUCTO: lotData.productId,
    ULTIMO_REALIZADO: lotData.lastMade
  }
}

/**
 * @param {{ _id: string, EMPRESA: string, DIRECCION: string }} companyData - The company data to update.
 * @returns {{ id: string, name: string, address: string }} company data
 */
export function convertCopmanyDataToAppShema(companyData) {
  return {
    id: companyData._id,
    name: companyData.EMPRESA,
    address: companyData.DIRECCION
  }
}

/**
 * @param {{ _id: string, USUARIO: string, ROLES: {ID_ROL: string, ROL: string}[] createdAt: string, updatedAt: string }} userData - The user data to update.
 * @returns {{ id: string, user: string, roles: {id: string, role: string}[] }} user data
 */
export function convertUserDataToAppShema(userData) {
  return {
    id: userData._id,
    user: userData.USUARIO,
    roles: userData.ROLES.map((role) => ({
      id: role.ID_ROL,
      role: role.ROL
    }))
  }
}

/**
 * @param {{ _id: string, VALOR: string, TIPO_DOCUMENTO: string }} rolData - The rol data to update.
 * @returns {{ id: string, value: string, documentType: string }} rol data
 */
export function convertRolDataToAppShema(rolData) {
  return {
    id: rolData._id,
    value: rolData.VALOR,
    documentType: rolData.TIPO_DOCUMENTO
  }
}

/**
 * @param {{ _id: string, SERIE: string, CONSECUTIVO: number, ID_PRODUCTO: { _id: string, NOMBRE_PRODUCTO: string }, ULTIMO_REALIZADO: string }} lotData - The lot data to update.
 * @returns {{ id: string, serialNumber: string, consecutive: number, product: {id: string, name: string}, lastMade: string }} lot data
 */
export function convertLotsDataToAppShema(lotData) {
  return {
    id: lotData._id,
    serialNumber: lotData.SERIE,
    consecutive: lotData.CONSECUTIVO,
    product: {
      id: lotData.ID_PRODUCTO._id,
      name: lotData.ID_PRODUCTO.NOMBRE_PRODUCTO
    },
    lastMade: lotData.ULTIMO_REALIZADO
  }
}
