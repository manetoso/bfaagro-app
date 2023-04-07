/**
 *
 * @returns {{ id: string, name: string, warehouseType: { id: number, name: string } }[]} warehouse data
 */
export async function fetchWarehouses() {
  try {
    const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/almacenes`)
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, NOMBRE_ALMACEN: string, TIPO_ALMACEN: { ID_TIPO_ALMACEN: number, TIPO_ALMACEN: string } }[]} WarehousesBody
     * @type {{body: WarehousesBody}} - The Warehouses response body.
     */
    const json = await resp.json()

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
 * @returns {{ id: string, value: { id: number, productType: string } }[]} product types data
 */
export async function fetchProductTypes() {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/tiposdocumentos/producto`
    )
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, TIPO_DOCUMENTO: string, VALOR: { ID_TIPO_PRODUCTO: number, TIPO_PRODUCTO: string } }[]} ProductTypesBody
     * @type {{body: ProductTypesBody}} - The Products Types response body.
     */
    const json = await resp.json()

    const data = json.body.map((productType) => ({
      id: productType._id,
      value: {
        id: productType.VALOR.ID_TIPO_PRODUCTO,
        productType: productType.VALOR.TIPO_PRODUCTO
      }
    }))
    return data
  } catch (error) {
    throw new Error('Error searching product types')
  }
}

/**
 *
 * @returns {{ id: string, name: string, quantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string }[]} products data
 */
export async function fetchData() {
  try {
    const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/productos`)
    /**
     * The respponse body from the request.
     * @typedef { { _id: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, ALMACEN: { ID_ALMACEN: string, NOMBRE_ALMACEN: string }, TIPO_PRODUCTO: { ID_TIPO_PRODUCTO: number, TIPO_PRODUCTO: string }[] } } ProductsBody
     * @type {{body: ProductsBody[]}} - The Products Types response body.
     */
    const json = await resp.json()

    const data = json.body.map((product) => ({
      id: product._id,
      name: product.NOMBRE_PRODUCTO,
      quantity: product.CANTIDAD,
      unity: product.UNIDAD_MEDIDA,
      warehouse: {
        id: product.ALMACEN.ID_ALMACEN,
        name: product.ALMACEN.NOMBRE_ALMACEN
      },
      productType: product.TIPO_PRODUCTO.map((type) => ({
        id: type.ID_TIPO_PRODUCTO,
        name: type.TIPO_PRODUCTO
      }))
    }))
    return data
  } catch (error) {
    throw new Error('Error searching products')
  }
}

/**
 *
 * @param {{ name: string, quantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string }} data
 * @returns { { id: string, name: string, quantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string } } product data
 */
export async function createData(data) {
  try {
    const elementToDBSchema = convertToDBSchema(data)
    const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(elementToDBSchema)
    })
    const json = await resp.json()
    const respFormated = convertToAppSchema(json.body)
    return respFormated
  } catch (error) {
    throw new Error('Error creating new product')
  }
}

/**
 * 
 * @param {{ id: string, name: string, quantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string }} data 
 * @returns { { id: string, name: string, quantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string } } product data
 */
export async function updateData(data) {
  try {
    const elementToDBSchema = convertToDBSchema(data)
    const resp = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/productos/${data.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(elementToDBSchema)
      }
    )
    const json = await resp.json()
    const respFormated = convertToAppSchema(json.body)
    return respFormated
  } catch (error) {
    throw new Error('Error updating product')
  }
}

/**
 *
 * @param {string} id
 * @returns {boolean} true if the product was deleted, false if not
 */
export async function deleteData(id) {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/productos/${id}`,
      {
        method: 'DELETE'
      }
    )
    const json = await resp.json()
    return json.error ? false : true
  } catch (error) {
    throw new Error('Error deleting product')
  }
}

/**
 *
 * @param { { name: string, quantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string } } data
 * @returns { { _id: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, ALMACEN: { ID_ALMACEN: string, NOMBRE_ALMACEN: string }, TIPO_PRODUCTO: { ID_TIPO_PRODUCTO: number, TIPO_PRODUCTO: string }[] } } dbSchemaLike
 */
export function convertToDBSchema(data) {
  try {
    const dbSchemaLike = {
      NOMBRE_PRODUCTO: data.name,
      CANTIDAD: data.quantity,
      UNIDAD_MEDIDA: data.unity,
      ALMACEN: {
        ID_ALMACEN: data.warehouse.id,
        NOMBRE_ALMACEN: data.warehouse.name
      },
      TIPO_PRODUCTO: data.productType.map((type) => ({
        ID_TIPO_PRODUCTO: type.id,
        TIPO_PRODUCTO: type.name
      }))
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting to DB Schema')
  }
}

/**
 *
 * @param { { _id: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, ALMACEN: { ID_ALMACEN: string, NOMBRE_ALMACEN: string }, TIPO_PRODUCTO: { ID_TIPO_PRODUCTO: number, TIPO_PRODUCTO: string }[] } } object
 * @returns { { id: string, name: string, quantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string } } appSchemaLike
 */
export function convertToAppSchema(object) {
  try {
    const data = {
      id: object._id,
      name: object.NOMBRE_PRODUCTO,
      quantity: object.CANTIDAD,
      unity: object.UNIDAD_MEDIDA,
      warehouse: {
        id: object.ALMACEN.ID_ALMACEN,
        name: object.ALMACEN.NOMBRE_ALMACEN
      },
      productType: object.TIPO_PRODUCTO.map((type) => ({
        id: type.ID_TIPO_PRODUCTO,
        name: type.TIPO_PRODUCTO
      }))
    }
    return data
  } catch (error) {
    throw new Error('Error converting to App Schema')
  }
}
