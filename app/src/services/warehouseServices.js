/**
 *
 * @param {string} url
 * @returns {{ id: number, name: string, quantity: number, unity: string, idProductType: number, idWarehouse: number }[]} warehouse data
 */
export async function fetchData(url) {
  try {
    const resp = await fetch(url)
    /**
     * @type {{ ID_PRODUCTO: number, NOMBRE: string, CANTIDAD: number, UNIDAD_MEDIDA: string, ID_TIPO_PRODUCTO: number, ID_ALMACEN: number }[]}
     */
    const json = await resp.json()

    const data = json.map((data) => ({
      id: data.ID_PRODUCTO,
      name: data.NOMBRE,
      quantity: data.CANTIDAD,
      unity: data.UNIDAD_MEDIDA,
      idProductType: data.ID_TIPO_PRODUCTO,
      idWarehouse: data.ID_ALMACEN
    }))
    return data
  } catch (error) {
    throw new Error('Error searching raw material')
  }
}

/**
 *
 * @param {{ id: number, name: string, quantity: number, unity: string, idProductType: number, idWarehouse: number }} data
 * @returns {{ ID_PRODUCTO: number, NOMBRE: string, CANTIDAD: number, UNIDAD_MEDIDA: string, ID_TIPO_PRODUCTO: number, ID_ALMACEN: number }} dbSchemaLike
 */
export async function convertToDBSchema(data) {
  try {
    const dbSchemaLike = {
      ID_PRODUCTO: data.id,
      NOMBRE: data.name,
      CANTIDAD: data.quantity,
      UNIDAD_MEDIDA: data.unity,
      ID_TIPO_PRODUCTO: data.idProductType,
      ID_ALMACEN: data.idWarehouse
    }
    return dbSchemaLike
  } catch (error) {
    throw new Error('Error converting to DB Schema')
  }
}
