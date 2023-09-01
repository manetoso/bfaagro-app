import { bfaApi } from '@/api/bfaApi'

// export async function login({ username, password }) {
//   try {
//   } catch (error) {
//     console.log({ error })
//   }
// }

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
 * @returns {{ id: string, value: string }[]} Process Status types data
 */
export async function fetchClientsTypes() {
  try {
    const resp = await fetchTypes('cliente')

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
 * @returns {{ id: string, value: string }[]} Process Status types data
 */
export async function fetchSaleStatusTypes() {
  try {
    const resp = await fetchTypes('STATUS_VENTA')

    const data = resp.map((productType) => ({
      id: productType.id,
      value: productType.value
    }))
    return data
  } catch (error) {
    throw new Error('Error searching sale status types')
  }
}

/**
 *
 * @returns {{ id: string, value: string }[]} Process Status types data
 */
export async function fetchPriceListTypes() {
  try {
    const resp = await fetchTypes('lista_precio')

    const data = resp.map((productType) => ({
      id: productType.id,
      value: productType.value
    }))
    return data
  } catch (error) {
    throw new Error('Error searching price list types')
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

/**
 *
 * @returns {{ id: string, name: string, warehouseType: { id: number, name: string } }[]} warehouse data
 */
export async function fetchLogbook() {
  try {
    const { data: resp } = await bfaApi.get('/bitacoraproductos')
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, IDENTIFICADOR: string, MOVIMIENTO: string, PRODUCTOS: { _id: string, ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number }[], createdAt }[]} WarehousesBody
     * @type {{body: WarehousesBody}} - The Logbook response body.
     */
    const json = resp

    const data = json.body.map((log) => ({
      id: log._id,
      identifier: log.IDENTIFICADOR,
      movement: log.MOVIMIENTO,
      product: log.PRODUCTOS.map((product) => ({
        id: product._id,
        productId: product.ID_PRODUCTO,
        productName: product.NOMBRE_PRODUCTO,
        quantity: product.CANTIDAD
      })),
      createdAt: log.createdAt,
      createdAtFormatted: new Date(log.createdAt).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }))
    return data
  } catch (error) {
    throw new Error('Error searching logbook')
  }
}
