/**
 *
 * @param {string} url
 * @returns {{ id: number; idProduct: number; productName: string; unity: string; recipeName: string; quantity: number; rawMaterials: { idProduct: number; name: string; quantity: number; }[] }[]} recipes
 */
export async function fetchData(url) {
  try {
    const resp = await fetch(url)
    const json = await resp.json()
    const data = json.map((element) => ({
      id: element.ID_FORMULA,
      idProduct: element.ID_PRODUCTO,
      productName: element.NOMBRE_PRODUCTO,
      unity: element.UNIDAD_MEDIDA,
      recipeName: element.NOMBRE_FORMULA,
      quantity: element.CANTIDAD,
      rawMaterials: element.RAW_MATERIAL.map((material) => ({
        idProduct: material.ID_PRODUCTO,
        name: material.NOMBRE,
        quantity: material.CANTIDAD
      }))
    }))
    return data
  } catch (error) {
    throw new Error('Error searching recipes')
  }
}

/**
 *
 * @param {{ id: number; idProduct: number; productName: string; unity: string; recipeName: string; quantity: number; rawMaterials: { idProduct: number; name: string; quantity: number; }[] }} data
 * @returns
 */
export async function convertToDBSchema(data) {
  try {
    const dbSchemaLike = {
      ID_FORMULA: data.id,
      ID_PRODUCTO: data.idProduct,
      NOMBRE_PRODUCTO: data.productName,
      UNIDAD_MEDIDA: data.unity,
      NOMBRE_FORMULA: data.recipeName,
      CANTIDAD: data.quantity,
      RAW_MATERIAL: data.rawMaterials.map((material) => ({
        ID_PRODUCTO: material.idProduct,
        NOMBRE: material.name,
        CANTIDAD: material.quantity
      }))
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting to DB Schema')
  }
}
