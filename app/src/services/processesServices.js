import toast from 'react-hot-toast'

import { bfaApi } from '@/api/bfaApi'
import { ROLES } from '@/utils/consts'

/**
 *
 * @returns {{ id: string, recipeId: string, status: { id: string, value: string }, warehouse: { id: string, name: string }, recipeData: { recipeName: string, product: { id: string, name: string }, details: { id: string, name: string, quantity: string, unity: string }[] }, quantity: number, createdAt: string, createdAtFormatted: string }} - The processes.
 */
export async function fetchData() {
  try {
    const { data: resp } = await bfaApi.get('/procesos', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.PROCESSES
      }
    })
    /**
     * The respponse body from the request.
     * @typedef { { _id: string, PROCESO: { ID_ESTADO: string, ESTADO: string }, FORMULA: { ID_FORMULA: string, NOMBRE_FORMULA: string, PRODUCTO: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string }, FORMULACION_DETALLE: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, COMENTARIOS: string, UNIDAD_MEDIDA: string }[] }, CANTIDAD: number, createdAt: string, updatedAt: string } ProcessesBody
     * @type {{body: ProcessesBody[]}} - The Recipes response body.
     */
    const json = resp
    const data = json.body.map((process) => ({
      id: process._id,
      recipeId: process.FORMULA.ID_FORMULA,
      status: {
        id: process.PROCESO.ID_ESTADO,
        value: process.PROCESO.ESTADO
      },
      recipeData: {
        recipeName: process.FORMULA.NOMBRE_FORMULA,
        // quantity: process.FORMULA_DETALLE.CANTIDAD,
        // unity: process.FORMULA_DETALLE.UNIDAD_MEDIDA,
        product: {
          id: process.FORMULA.PRODUCTO.ID_PRODUCTO,
          name: process.FORMULA.PRODUCTO.NOMBRE_PRODUCTO
        },
        details: process.FORMULA.FORMULACION_DETALLE.map((detail) => ({
          id: detail.ID_PRODUCTO,
          name: detail.NOMBRE_PRODUCTO,
          quantity: detail.CANTIDAD,
          unity: detail.UNIDAD_MEDIDA
        }))
      },
      quantity: process.CANTIDAD,
      observations: process.COMENTARIOS,
      createdAt: process.createdAt,
      createdAtFormatted: new Date(process.createdAt).toLocaleDateString(
        'es-MX',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      )
    }))
    return data
  } catch (error) {
    throw new Error('Error searching processes')
  }
}

/**
 *
 * @param {{ recipeName: string, unity: string, quantity: number, observations: string, product: { id: string, name: string }, details: { id: string, name: string, quantity: number }[] }} data
 * @returns {{data: { id: string, recipeName: string, unity: string, quantity: number, product: { id: string, name: string }, details: { id: string, name: string, quantity: number }[] }, error: {errors: {product: string, requested: number, existing: number, missing: number}[], msg: string}}}
 */
export async function createData(data) {
  try {
    const elementToDBSchema = convertToDBSchema(data)
    const elementToSend = {
      ID_FORMULA: elementToDBSchema.FORMULA.ID_FORMULA,
      FORMULACION_DETALLE: elementToDBSchema.FORMULA.FORMULACION_DETALLE,
      CANTIDAD: elementToDBSchema.CANTIDAD,
      COMENTARIOS: elementToDBSchema.COMENTARIOS
    }
    const { data: resp } = await bfaApi.post(
      '/procesos',
      JSON.stringify(elementToSend),
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          section: ROLES.PROCESSES
        }
      }
    )
    const json = resp
    if (!json.error) {
      const respFormated = convertToAppSchema(json.body)
      toast.success('Proceso creado con éxito')
      return { data: respFormated, error: { errors: [], msg: '' } }
    } else {
      toast.error(json.msg)
      const { errors, msg } = convertCreateErrorToAppSchema(json)
      return { data: {}, error: { errors, msg } }
    }
  } catch (error) {
    if (error.response.status === 409) {
      toast.error('Materiales insuficientes para crear proceso')
      const { errors, msg } = convertCreateErrorToAppSchema(error.response.data)
      return { data: {}, error: { errors, msg } }
    }
    toast.error('Error creando proceso')
    throw new Error('Error creating new recipe')
  }
}

/**
 *
 * @param {{ id: string }} process id
 * @returns {{ id: string, recipeName: string, unity: string, quantity: number, product: { id: string, name: string }, details: { id: string, name: string, quantity: number }[] }}
 */
export async function updateData({ id }) {
  try {
    const { data: resp } = await bfaApi.put(`/procesos/editar_estado/${id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.PROCESSES
      }
    })
    const json = resp
    const respFormated = convertToAppSchemaUpdate(json.body)
    toast.success('Proceso actualizado con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error actualizando proceso')
    console.log({ error })
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
    const { data: resp } = await bfaApi.delete(`/procesos/${id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.PROCESSES
      }
    })
    const json = resp
    if (json.error) {
      toast.error(json.error)
    } else {
      toast.success('Proceso eliminado con éxito')
    }
    return !json.error
  } catch (error) {
    toast.error('Error eliminando proceso')
    throw new Error('Error deleting recipe')
  }
}

/**
 *
 * @param {{ movementType: { movementTypeId: string, value: string }, products: { productId: string, productName: string, productQuantity: number }[] }} data
 */
export async function setIncompleteProcess(data) {
  try {
    const elementToDBSchema = {
      MOVIMIENTO: {
        ID_MOVIMIENTO: data.movementType.movementTypeId,
        MOVIMIENTO: data.movementType.value
      },
      FECHA: new Date().toISOString().split('T')[0],
      PRODUCTOS: data.products.map((product) => ({
        ID_PRODUCTO: product.productId,
        NOMBRE_PRODUCTO: product.productName,
        CANTIDAD: product.productQuantity
      }))
    }
    await bfaApi.post(
      '/movimientosAlmacen',
      JSON.stringify(elementToDBSchema),
      {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          section: ROLES.PROCESSES
        }
      }
    )
    toast.success('Se agregó la cantidad faltante de productos')
  } catch (error) {
    toast.error('Error agregando cantidad faltante de productos')
    throw new Error('Error adding missing products')
  }
}

/**
 *
 * @returns {{ id: string, name: string, quantity: number, unity: string }[]} products data
 */
export async function fetchRawMaterial() {
  try {
    const { data: resp } = await bfaApi.get('/productos', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.PROCESSES
      }
    })
    /**
     * The respponse body from the request.
     * @typedef { { _id: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, ALMACEN: { ID_ALMACEN: string, NOMBRE_ALMACEN: string }, TIPO_PRODUCTO: { ID_TIPO_PRODUCTO: number, TIPO_PRODUCTO: string }[] } } ProductsBody
     * @type {{body: ProductsBody[]}} - The Products Types response body.
     */
    const json = resp
    const materials = json.body.map((product) => ({
      id: product._id,
      name: product.NOMBRE_PRODUCTO,
      quantity: product.CANTIDAD,
      unity: product.UNIDAD_MEDIDA
    }))
    return materials
  } catch (error) {
    throw new Error('Error searching products for details')
  }
}

/**
 *
 * @param {{ recipeId: string, status: { id: string, value: string }, recipeData: { recipeName: string, product: { id: string, name: string }, details: { id: string, name: string, unity: string }[] }, quantity: number, observations: string }} data
 * @returns {{ PROCESO: { ID_ESTADO: string, ESTADO: string }, FORMULA: { ID_FORMULA: string, NOMBRE_FORMULA: string, PRODUCTO: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string }, FORMULACION_DETALLE: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string }[] }, CANTIDAD: number, COMENTARIOS: string }} - The recipe to DB Schema.
 */
export function convertToDBSchema(data) {
  try {
    const dbSchemaLike = {
      PROCESO: {
        ID_ESTADO: data.status.id,
        ESTADO: data.status.value
      },
      FORMULA: {
        ID_FORMULA: data.recipeId,
        NOMBRE_FORMULA: data.recipeData.recipeName,
        PRODUCTO: {
          ID_PRODUCTO: data.recipeData.product.id,
          NOMBRE_PRODUCTO: data.recipeData.product.name
        },
        FORMULACION_DETALLE: data.recipeData.details.map((detail) => ({
          ID_PRODUCTO: detail.id,
          NOMBRE_PRODUCTO: detail.name,
          CANTIDAD: detail.quantity,
          UNIDAD_MEDIDA: detail.unity
        }))
      },
      CANTIDAD: data.quantity,
      COMENTARIOS: data.observations
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting to DB Schema')
  }
}

/**
 *
 * @param {{ _id: string, PROCESO: { ID_ESTADO: string, ESTADO: string }, FORMULA: { ID_FORMULA: string, NOMBRE_FORMULA: string, PRODUCTO: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string }, FORMULACION_DETALLE: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, COMENTARIOS: string, CANTIDAD: number, UNIDAD_MEDIDA: string }[] }, CANTIDAD: number, createdAt: string, updatedAt: string }} data
 * @returns {{ id: string, recipeId: string, status: { id: string, value: string }, recipeData: { recipeName: string, product: { id: string, name: string }, details: { id: string, name: string, observations: string, quantity: string, unity: string }[] }, qunatity: number, createdAt: string, createdAtFormatted: string }} - The recipe to App Schema.
 */
export function convertToAppSchema(data) {
  try {
    const appSchemaLike = {
      id: data._id,
      recipeId: data.FORMULA.ID_FORMULA,
      status: {
        id: data.PROCESO.ID_ESTADO,
        value: data.PROCESO.ESTADO
      },
      recipeData: {
        recipeName: data.FORMULA.NOMBRE_FORMULA,
        // quantity: data.FORMULA_DETALLE.CANTIDAD,
        // unity: data.FORMULA_DETALLE.UNIDAD_MEDIDA,
        product: {
          id: data.FORMULA.PRODUCTO.ID_PRODUCTO,
          name: data.FORMULA.PRODUCTO.NOMBRE_PRODUCTO
        },
        details: data.FORMULA.FORMULACION_DETALLE.map((detail) => ({
          id: detail.ID_PRODUCTO,
          name: detail.NOMBRE_PRODUCTO,
          quantity: detail.CANTIDAD,
          unity: detail.UNIDAD_MEDIDA
        }))
      },
      observations: data.COMENTARIOS,
      quantity: data.CANTIDAD,
      createdAt: data.createdAt,
      createdAtFormatted: new Date(data.createdAt).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
    return appSchemaLike
  } catch (error) {
    throw new Error('Error converting to App Schema')
  }
}

/**
 *
 * @param {{actionDB: { _id: string, PROCESO: { ID_ESTADO: string, ESTADO: string }, FORMULA: { ID_FORMULA: string, NOMBRE_FORMULA: string, PRODUCTO: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string }, FORMULACION_DETALLE: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string }[] }, CANTIDAD: number, createdAt: string, updatedAt: string }, checksMinAmountProducts: { CANTIDAD: number, CANTIDAD_MINIMA: number, DIFERENCIA: number, PRODUCTO: string }[] }} data
 * @returns {{ id: string, recipeId: string, status: { id: string, value: string }, recipeData: { recipeName: string, product: { id: string, name: string }, details: { id: string, name: string, quantity: string, unity: string }[] }, quantity: number, createdAt: string, createdAtFormatted: string }} - The recipe to App Schema.
 */
export function convertToAppSchemaUpdate(data) {
  try {
    const appSchemaLike = {
      id: data.actionDB._id,
      recipeId: data.actionDB.FORMULA.ID_FORMULA,
      status: {
        id: data.actionDB.PROCESO.ID_ESTADO,
        value: data.actionDB.PROCESO.ESTADO
      },
      recipeData: {
        recipeName: data.actionDB.FORMULA.NOMBRE_FORMULA,
        // quantity: data.actionDB.FORMULA_DETALLE.CANTIDAD,
        // unity: data.actionDB.FORMULA_DETALLE.UNIDAD_MEDIDA,
        product: {
          id: data.actionDB.FORMULA.PRODUCTO.ID_PRODUCTO,
          name: data.actionDB.FORMULA.PRODUCTO.NOMBRE_PRODUCTO
        },
        details: data.actionDB.FORMULA.FORMULACION_DETALLE.map((detail) => ({
          id: detail.ID_PRODUCTO,
          name: detail.NOMBRE_PRODUCTO,
          quantity: detail.CANTIDAD,
          unity: detail.UNIDAD_MEDIDA
        }))
      },
      quantity: data.actionDB.CANTIDAD,
      createdAt: data.actionDB.createdAt,
      createdAtFormatted: new Date(data.actionDB.createdAt).toLocaleDateString(
        'es-MX',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      )
    }
    if (data.checksMinAmountProducts.length > 0) {
      data.checksMinAmountProducts.forEach((check) => {
        toast.error(
          `¡Nivel Mínimo Alcanzado!
          La cantidad de ${check.PRODUCTO} sobrepasa la cantidad mínima establecida por: ${check.DIFERENCIA} unidades.`,
          {
            icon: '🚧',
            style: { backgroundColor: '#f59e0b', color: '#fff' },
            duration: 5000
          }
        )
      })
    }
    return appSchemaLike
  } catch (error) {
    throw new Error('Error converting to App Schema')
  }
}

/**
 *
 * @param {{error: {CANTIDAAD_EXISTENTE: number, CANTIDAD_FALTANTE: number, CANTIDAD_SOLICITADA: number, PRODUCTO: string}[], msg: string}} error
 * @returns {{errors: {product: string, requested: number, existing: number, missing: number}[], msg: string}} - The error to App Schema.
 */
export function convertCreateErrorToAppSchema({ error, msg }) {
  try {
    const appSchemaLike = {
      errors: error.map((x) => ({
        product: x.PRODUCTO,
        requested: x.CANTIDAD_SOLICITADA,
        existing: x.CANTIDAAD_EXISTENTE,
        missing: x.CANTIDAD_FALTANTE
      })),
      msg
    }
    return appSchemaLike
  } catch (error) {
    throw new Error('Error converting to App Schema')
  }
}
