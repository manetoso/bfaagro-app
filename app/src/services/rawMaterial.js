// import data from '@/mocks/rawMaterial.json'
import data from '@/mocks/defaultTableData.json'

export const getRawMaterial = () => {
  try {
    // const resp = await fetch('https://www.omdbapi.com/?apikey=613195d2&')
    // const json = await resp.json()
    // const movies = json.Search

    // return data.map((rawMaterial) => ({
    //   id: rawMaterial.ID_PRODUCTO,
    //   name: rawMaterial.NOMBRE,
    //   quantity: rawMaterial.CANTIDAD,
    //   unity: rawMaterial.UNIDAD_MEDIDA,
    //   idProductType: rawMaterial.ID_TIPO_PRODUCTO,
    //   idWarehouse: rawMaterial.ID_ALMACEN
    // }))
    return data.map((rawMaterial) => ({
      id: rawMaterial.id,
      name: rawMaterial.first_name,
      quantity: rawMaterial.email,
      unity: rawMaterial.gender,
      idProductType: rawMaterial.ip_address,
      idWarehouse: rawMaterial.ip_address
    }))
  } catch (error) {
    throw new Error('Error searching raw material')
  }
}
