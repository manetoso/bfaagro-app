import { bfaApi } from '@/api/bfaApi'

export async function login({ username, password }) {
  try {
  } catch (error) {
    console.log({ error })
  }
}

/**
 *
 * @param {string} type
 * @returns {{ id: string, value: string }[]} unity types data
 */
export async function fetchTypes(type) {
  try {
    const { data: resp } = await bfaApi.get(`/tiposdocumentos/${type}`)
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, TIPO_DOCUMENTO: string, VALOR: string }[]} TypesBody
     * @type {{body: TypesBody}} - The Types response body.
     */
    const json = resp

    const data = json.body.map((productType) => ({
      id: productType._id,
      value: productType.VALOR
    }))
    return data
  } catch (error) {
    throw new Error('Error searching types')
  }
}

/**
 *
 * @returns {{ id: string, unityType: string }[]} unity types data
 */
export async function fetchUnityTypes() {
  try {
		const resp = await fetchTypes('unidad')

    const data = resp.map((productType) => ({
      id: productType.id,
      unityType: productType.value
    }))
    return data
  } catch (error) {
    throw new Error('Error searching unity types')
  }
}

/**
 *
 * @returns {{ id: string, value: { id: number, productType: string } }[]} product types data
 */
export async function fetchProductTypes() {
  try {
    const resp = await fetchTypes('producto')

    const data = resp.map((productType) => ({
      id: productType.id,
      value: {
        id: productType.id,
        productType: productType.value
      }
    }))
    return data
  } catch (error) {
    throw new Error('Error searching product types')
  }
}

/**
 *
 * @returns {{ id: string, value: string }[]} Process Status types data
 */
export async function fetchProcessStatusTypes() {
  try {
    const resp = await fetchTypes('estado')

    const data = resp.map((productType) => ({
      id: productType.id,
      value: productType.value
    }))
    return data
  } catch (error) {
    throw new Error('Error searching processes status types')
  }
}

/**
 *
 * @returns {{ id: string, value: string }[]} Process Status types data
 */
export async function fetchMovementTypes() {
  try {
    const resp = await fetchTypes('movimiento')

    const data = resp.map((productType) => ({
      id: productType.id,
      value: productType.value
    }))
    return data
  } catch (error) {
    throw new Error('Error searching movement types')
  }
}

/**
 *
 * @returns {{ id: string, name: string, warehouseType: { id: number, name: string } }[]} warehouse data
 */
export async function fetchWarehouses() {
  try {
    const { data: resp } = await bfaApi.get('/almacenes')
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, NOMBRE_ALMACEN: string, TIPO_ALMACEN: { ID_TIPO_ALMACEN: number, TIPO_ALMACEN: string } }[]} WarehousesBody
     * @type {{body: WarehousesBody}} - The Warehouses response body.
     */
    const json = resp

    const data = json.body.map((warehouse) => ({
      id: warehouse._id,
      name: warehouse.NOMBRE_ALMACEN,
      warehouseType: {
        id: warehouse.TIPO_ALMACEN.ID_TIPO_ALMACEN,
        name: warehouse.TIPO_ALMACEN.TIPO_ALMACEN
      }
    }))
    return data
  } catch (error) {
    throw new Error('Error searching warehouses')
  }
}