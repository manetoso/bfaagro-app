import toast from 'react-hot-toast'

/**
 *
 * @returns {Promise<{ id: string, recipeName: string, unity: string, quantity: number, product: { id: string, name: string }, details: { id: string, name: string, quantity: number }[] }[]>} - The recipes.
 */
export async function fetchData() {
  try {
    const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/formulas`)
    /**
     * The respponse body from the request.
     * @typedef { { _id: string, NOMBRE_FORMULA: string, CANTIDAD: number, UNIDAD_MEDIDA: string, PRODUCTO: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string }, FORMULACION_DETALLE: { CANTIDAD: number, ID_PRODUCTO: string, NOMBRE_PRODUCTO: string }[] } } RecipesBody
     * @type {{body: RecipesBody[]}} - The Recipes response body.
     */
    const json = await resp.json()
    const data = json.body.map((recipe) => ({
      id: recipe._id,
      recipeName: recipe.NOMBRE_FORMULA,
      quantity: recipe.CANTIDAD,
      unity: recipe.UNIDAD_MEDIDA,
      product: {
        id: recipe.PRODUCTO.ID_PRODUCTO,
        name: recipe.PRODUCTO.NOMBRE_PRODUCTO
      },
      details: recipe.FORMULACION_DETALLE.map((material) => ({
        id: material.ID_PRODUCTO,
        name: material.NOMBRE_PRODUCTO,
        quantity: material.CANTIDAD
      }))
    }))
    return data
  } catch (error) {
    console.log({ error })
    throw new Error('Error searching recipes')
  }
}

/**
 * 
 * @param {{ recipeName: string, unity: string, quantity: number, product: { id: string, name: string }, details: { id: string, name: string, quantity: number }[] }} data 
 * @returns {{ id: string, recipeName: string, unity: string, quantity: number, product: { id: string, name: string }, details: { id: string, name: string, quantity: number }[] }}
 */
export async function createData(data) {
  try {
    const elementToDBSchema = convertToDBSchema(data)
    const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/formulas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(elementToDBSchema)
    })
    const json = await resp.json()
    const respFormated = convertToAppSchema(json.body)
    toast.success('Receta creada con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error creando nueva receta')
    throw new Error('Error creating new recipe')
  }
}

/**
 * 
 * @param {{ id: string, recipeName: string, unity: string, quantity: number, product: { id: string, name: string }, details: { id: string, name: string, quantity: number }[] }} data 
 * @returns {{ id: string, recipeName: string, unity: string, quantity: number, product: { id: string, name: string }, details: { id: string, name: string, quantity: number }[] }}
 */
export async function updateData(data) {
  try {
    const elementToDBSchema = convertToDBSchema(data)
    const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/formulas/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(elementToDBSchema)
    })
    const json = await resp.json()
    const respFormated = convertToAppSchema(json.body)
    toast.success('Receta actualizada con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error actualizando receta')
    throw new Error('Error updating recipe')
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
      `${import.meta.env.VITE_API_BASE_URL}/formulas/${id}`,
      {
        method: 'DELETE'
      }
    )
    const json = await resp.json()
    toast.success('Receta eliminada con éxito')
    return json.error ? false : true
  } catch (error) {
    toast.error('Error eliminando receta')
    throw new Error('Error deleting recipe')
  }
}

/**
 *
 * @returns {{ id: string, name: string, quantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string }[]} products data
 */
export async function fetchProductsForDetails() {
  try {
    const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/productos`)
    /**
     * The respponse body from the request.
     * @typedef { { _id: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, ALMACEN: { ID_ALMACEN: string, NOMBRE_ALMACEN: string }, TIPO_PRODUCTO: { ID_TIPO_PRODUCTO: number, TIPO_PRODUCTO: string }[] } } ProductsBody
     * @type {{body: ProductsBody[]}} - The Products Types response body.
     */
    const json = await resp.json()
    const filtered1 = json.body.filter((x) => x.TIPO_PRODUCTO.some((y) => y.TIPO_PRODUCTO === 'MATERIA PRIMA'))
    const filtered2 = json.body.filter((x) => x.TIPO_PRODUCTO.some((y) => y.TIPO_PRODUCTO === 'PRODUCTO TERMINADO'))
    // console.log({ filtered1, filtered2 });
    const material = filtered1.map((product) => ({
      id: product._id,
      name: product.NOMBRE_PRODUCTO
    }))
    const products = filtered2.map((product) => ({
      id: product._id,
      name: product.NOMBRE_PRODUCTO
    }))
    return { material, products }
  } catch (error) {
    throw new Error('Error searching products for details')
  }
}

export async function fetchUnityTypes() {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/tiposdocumentos/unidad`
    )
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, TIPO_DOCUMENTO: string, VALOR: string }[]} ProductTypesBody
     * @type {{body: ProductTypesBody}} - The Products Types response body.
     */
    const json = await resp.json()

    const data = json.body.map((productType) => ({
      id: productType._id,
      unityType: productType.VALOR
    }))
    return data
  } catch (error) {
    throw new Error('Error searching product types')
  }
}

/**
 *
 * @param {{ recipeName: string, unity: string, quantity: number, product: { id: string, name: string }, details: { id: string, name: string, quantity: number }[] }} data
 * @returns { { NOMBRE_FORMULA: string, CANTIDAD: number, UNIDAD_MEDIDA: string, PRODUCTO: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string }, FORMULACION_DETALLE: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number }[] } } - The recipe to DB Schema.
 */
export function convertToDBSchema(data) {
  try {
    const dbSchemaLike = {
      NOMBRE_FORMULA: data.recipeName,
      CANTIDAD: data.quantity,
      UNIDAD_MEDIDA: data.unity,
      PRODUCTO: {
        ID_PRODUCTO: data.product.id,
        NOMBRE_PRODUCTO: data.product.name
      },
      FORMULACION_DETALLE: data.details.map((material) => ({
        ID_PRODUCTO: material.id,
        NOMBRE_PRODUCTO: material.name,
        CANTIDAD: material.quantity
      }))
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting to DB Schema')
  }
}

/**
 *
 * @param {{ _id: string, NOMBRE_FORMULA: string, CANTIDAD: number, UNIDAD_MEDIDA: string, PRODUCTO: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string }, FORMULACION_DETALLE: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number }[] }} data
 * @returns {{ id: string, recipeName: string, unity: string, quantity: number, product: { id: string, name: string }, details: { id: string, name: string, quantity: number }[] }} - The recipe to App Schema.
 */
export function convertToAppSchema(data) {
  try {
    const appSchemaLike = {
      id: data._id,
      recipeName: data.NOMBRE_FORMULA,
      quantity: data.CANTIDAD,
      unity: data.UNIDAD_MEDIDA,
      product: {
        id: data.PRODUCTO.ID_PRODUCTO,
        name: data.PRODUCTO.NOMBRE_PRODUCTO
      },
      details: data.FORMULACION_DETALLE.map((material) => ({
        id: material.ID_PRODUCTO,
        name: material.NOMBRE_PRODUCTO,
        quantity: material.CANTIDAD
      }))
    }
    return appSchemaLike
  } catch (error) {
    throw new Error('Error converting to App Schema')
  }
}
