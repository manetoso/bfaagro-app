import toast from 'react-hot-toast'

/**
 *
 * @returns {{ id: string, recipeId: string, status: { id: string, value: string }, warehouse: { id: string, name: string }, recipeData: { recipeName: string, product: { id: string, name: string }, details: { id: string, name: string, quantity: string }[] }, createdAt: string, createdAtFormatted: string }} - The processes.
 */
export async function fetchData() {
  try {
    const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/procesos`)
    /**
     * The respponse body from the request.
     * @typedef { { _id: string, PROCESO: { ID_ESTADO: string, ESTADO: string }, ALMACEN: { ID_ALMACEN: string, NOMBRE_ALMACEN: string }, FORMULA: { ID_FORMULA: string, NOMBRE_FORMULA: string, PRODUCTO: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string }, FORMULACION_DETALLE: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number }[] }, createdAt: string, updatedAt: string } ProcessesBody
     * @type {{body: ProcessesBody[]}} - The Recipes response body.
     */
    const json = await resp.json()
    const data = json.body.map((process) => ({
      id: process._id,
      recipeId: process.FORMULA.ID_FORMULA,
      status: {
        id: process.PROCESO.ID_ESTADO,
        value: process.PROCESO.ESTADO
      },
      warehouse: {
        id: process.ALMACEN.ID_ALMACEN,
        name: process.ALMACEN.NOMBRE_ALMACEN
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
          quantity: detail.CANTIDAD
        }))
      },
      createdAt: process.createdAt,
      createdAtFormatted: new Date(process.createdAt).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }))
    return data
  } catch (error) {
    throw new Error('Error searching processes')
  }
}

/**
 *
 * @param {{ recipeName: string, unity: string, quantity: number, product: { id: string, name: string }, details: { id: string, name: string, quantity: number }[] }} data
 * @returns {{data: { id: string, recipeName: string, unity: string, quantity: number, product: { id: string, name: string }, details: { id: string, name: string, quantity: number }[] }, error: {errors: {product: string, requested: number, existing: number, missing: number}[], msg: string}}}
 */
export async function createData(data) {
  try {
    const elementToDBSchema = convertToDBSchema(data)
    const elementToSend = {
      ID_FORMULA: elementToDBSchema.FORMULA.ID_FORMULA,
      ID_ALMACEN: elementToDBSchema.ALMACEN.ID_ALMACEN,
      NOMBRE_ALMACEN: elementToDBSchema.ALMACEN.NOMBRE_ALMACEN,
      FORMULACION_DETALLE: elementToDBSchema.FORMULA.FORMULACION_DETALLE
    }
    const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/procesos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(elementToSend)
    })
    const json = await resp.json()
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
    toast.error('Error eliminando proceso')
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
    const resp = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/procesos/editar_estado/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const json = await resp.json()
    const respFormated = convertToAppSchema(json.body)
    toast.success('Proceso actualizado con éxito')
    return respFormated
  } catch (error) {
    toast.error('Error actualizando proceso')
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
      `${import.meta.env.VITE_API_BASE_URL}/procesos/${id}`,
      {
        method: 'DELETE'
      }
    )
    const json = await resp.json()
    if (json.error) {
      toast.error(json.error)
    } else {
      toast.success('Proceso eliminado con éxito')
    }
    return json.error ? false : true
  } catch (error) {
    toast.error('Error eliminando proceso')
    throw new Error('Error deleting recipe')
  }
}

/**
 *
 * @returns {{ id: string, name: string, quantity: number, unity: string }[]} products data
 */
export async function fetchRawMaterial() {
  try {
    const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/productos`)
    /**
     * The respponse body from the request.
     * @typedef { { _id: string, NOMBRE_PRODUCTO: string, CANTIDAD: number, UNIDAD_MEDIDA: string, ALMACEN: { ID_ALMACEN: string, NOMBRE_ALMACEN: string }, TIPO_PRODUCTO: { ID_TIPO_PRODUCTO: number, TIPO_PRODUCTO: string }[] } } ProductsBody
     * @type {{body: ProductsBody[]}} - The Products Types response body.
     */
    const json = await resp.json()
    const filtered1 = json.body.filter((x) =>
      x.TIPO_PRODUCTO.some((y) => y.TIPO_PRODUCTO === 'MATERIA PRIMA')
    )
    const materials = filtered1.map((product) => ({
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
 * @param {{ recipeId: string, status: { id: string, value: string }, warehouse: { id: string, name: string }, recipeData: { recipeName: string, product: { id: string, name: string }, details: { id: string, name: string, quantity: number }[] } }} data
 * @returns {{ PROCESO: { ID_ESTADO: string, ESTADO: string }, ALMACEN: { ID_ALMACEN: string, NOMBRE_ALMACEN: string }, FORMULA: { ID_FORMULA: string, NOMBRE_FORMULA: string, PRODUCTO: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string }, FORMULACION_DETALLE: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number }[] } }} - The recipe to DB Schema.
 */
export function convertToDBSchema(data) {
  try {
    const dbSchemaLike = {
      ALMACEN: {
        ID_ALMACEN: data.warehouse.id,
        NOMBRE_ALMACEN: data.warehouse.name
      },
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
          CANTIDAD: detail.quantity
        }))
      }
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting to DB Schema')
  }
}

/**
 *
 * @param {{ _id: string, PROCESO: { ID_ESTADO: string, ESTADO: string }, ALMACEN: { ID_ALMACEN: string, NOMBRE_ALMACEN: string }, FORMULA: { ID_FORMULA: string, NOMBRE_FORMULA: string, PRODUCTO: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string }, FORMULACION_DETALLE: { ID_PRODUCTO: string, NOMBRE_PRODUCTO: string, CANTIDAD: number }[] }, createdAt: string, updatedAt: string }} data
 * @returns {{ id: string, recipeId: string, status: { id: string, value: string }, warehouse: { id: string, name: string }, recipeData: { recipeName: string, product: { id: string, name: string }, details: { id: string, name: string, quantity: string }[] }, createdAt: string, createdAtFormatted: string }} - The recipe to App Schema.
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
      warehouse: {
        id: data.ALMACEN.ID_ALMACEN,
        name: data.ALMACEN.NOMBRE_ALMACEN
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
          quantity: detail.CANTIDAD
        }))
      },
      createdAt: data.createdAt,
      createdAtFormatted: new Date(data.createdAt).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
    return appSchemaLike
  } catch (error) {
    console.log(error)
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
