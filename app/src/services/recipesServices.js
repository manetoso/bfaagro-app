import toast from 'react-hot-toast'

import { bfaApi } from '@/api/bfaApi'

import { FIELDS_TYPES } from '@/stores/useRecipesStore'
import { PRODUCT_TYPES, ROLES } from '@/utils/consts'

/**
 *
 * @param {{ field: string }} param - The field to search.
 * @returns {Promise<{ id: string, recipeName: string, unity: string, quantity: number, product: { id: string, name: string }, details: { id: string, name: string, quantity: number }[] }[]>} - The recipes.
 */
export async function fetchData({ field }) {
  try {
    const { data: resp } = await bfaApi.get('/formulas', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.RECIPES
      }
    })
    /**
     * The respponse body from the request.
     * @typedef { { _id: string, NOMBRE_FORMULA: string, CANTIDAD: number, UNIDAD_MEDIDA: string, PRODUCTO: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, TIPO_PRODUCTO: { ID_TIPO_PRODUCTO: string, TIPO_PRODUCTO: string }[] }, FORMULACION_DETALLE: { CANTIDAD: number, ID_PRODUCTO: string, NOMBRE_PRODUCTO: string }[] } } RecipesBody
     * @type {{body: RecipesBody[]}} - The Recipes response body.
     */
    const json = resp
    // NOTES: APP CAN CRASH IF THE PRODUCT TYPE IS NOT DEFINED
    // console.log({ json })
    const data = []
    json.body.forEach((recipe, index) => {
      const newRecipe = {
        id: recipe._id,
        recipeName: recipe.NOMBRE_FORMULA,
        quantity: recipe.CANTIDAD,
        unity: recipe.UNIDAD_MEDIDA,
        product: {
          id: recipe.PRODUCTO.ID_PRODUCTO,
          name: recipe.PRODUCTO.NOMBRE_PRODUCTO,
          type: recipe.PRODUCTO.TIPO_PRODUCTO.map((type) => ({
            id: type.ID_TIPO_PRODUCTO,
            name: type.TIPO_PRODUCTO
          }))
          // type: recipe.PRODUCTO.TIPO_PRODUCTO
          //   ? recipe.PRODUCTO.TIPO_PRODUCTO.map((type) => ({
          //       id: type.ID_TIPO_PRODUCTO,
          //       name: type.TIPO_PRODUCTO
          //     }))
          //   : []
        },
        details: recipe.FORMULACION_DETALLE.map((material) => ({
          id: material.ID_PRODUCTO,
          name: material.NOMBRE_PRODUCTO,
          quantity: material.CANTIDAD
        }))
      }
      // console.log(`>>> recipe no: ${index} with id: ${newRecipe.id}`)
      // console.log({ newRecipe })
      data.push(newRecipe)
    })
    // const test = []
    // data.forEach((recipe) => {
    //   if (recipe.product.type.length === 0) {
    //     test.push(recipe)
    //   }
    // })
    // console.log({ length: test.length, test })
    if (field === FIELDS_TYPES.RECIPES_PACKAGING) {
      return data
    } else {
      return data.filter((recipe) => {
        if (field === FIELDS_TYPES.RECIPES) {
          return recipe.product.type.find(
            (type) => type.name === PRODUCT_TYPES.SIMPLE_PRODUCT
          )
        }
        if (field === FIELDS_TYPES.PACKAGING) {
          return recipe.product.type.find(
            (type) => type.name === PRODUCT_TYPES.FINISHED_PRODUCT
          )
        }
        return false
      })
    }
  } catch (error) {
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
    const { data: resp } = await bfaApi.post(
      '/formulas',
      JSON.stringify(elementToDBSchema),
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          section: ROLES.RECIPES
        }
      }
    )
    const json = resp
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
    const { data: resp } = await bfaApi.put(
      `/formulas/${data.id}`,
      JSON.stringify(elementToDBSchema),
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          section: ROLES.RECIPES
        }
      }
    )
    const json = resp
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
    const { data: resp } = await bfaApi.delete(`/formulas/${id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.RECIPES
      }
    })
    const json = resp
    toast.success('Receta eliminada con éxito')
    return !json.error
  } catch (error) {
    toast.error('Error eliminando receta')
    throw new Error('Error deleting recipe')
  }
}

/**
 *
 * @param {{ field: string }} param - The field to search.
 * @returns {{ id: string, name: string, quantity: number, unity: string, warehouse: { id: string, name: string }, productType: { id: number, name: string }[], idProductType: number, idWarehouse: string }[]} products data
 */
export async function fetchProductsForDetails({ field }) {
  try {
    const { data: resp } = await bfaApi.get('/productos', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.RECIPES
      }
    })
    /**
     * The respponse body from the request.
     * @typedef { { _id: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, ALMACEN: { ID_ALMACEN: string, NOMBRE_ALMACEN: string }, TIPO_PRODUCTO: { ID_TIPO_PRODUCTO: number, TIPO_PRODUCTO: string }[] } } ProductsBody
     * @type {{body: ProductsBody[]}} - The Products Types response body.
     */
    const json = resp
    const filtered1 = json.body.filter((x) =>
      x.TIPO_PRODUCTO.some((y) => {
        if (field === FIELDS_TYPES.RECIPES) {
          return y.TIPO_PRODUCTO === PRODUCT_TYPES.RAW_MATERIAL_PRODUCT
        }
        if (field === FIELDS_TYPES.PACKAGING) {
          return y.TIPO_PRODUCTO !== PRODUCT_TYPES.RAW_MATERIAL_PRODUCT
        }
        return false
      })
    )
    const filtered2 = json.body.filter((x) =>
      x.TIPO_PRODUCTO.some((y) => {
        if (field === FIELDS_TYPES.RECIPES) {
          return y.TIPO_PRODUCTO === PRODUCT_TYPES.SIMPLE_PRODUCT
        }
        if (field === FIELDS_TYPES.PACKAGING) {
          return y.TIPO_PRODUCTO === PRODUCT_TYPES.FINISHED_PRODUCT
        }
        return false
      })
    )
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
