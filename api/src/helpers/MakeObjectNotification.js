const makeObjectNotification = (type) => {
  let NOTIFICACION = ''
  switch (type) {
    case 'ARTICULOS':
      NOTIFICACION = {
        TIPO_NOTIFICACION: type,
        NOTIFICACION:
          'LA CANTIDAD DEL SIGUIENTE ARTICULO HA LLEGADO O BAJADO DE SU CANTIDIAD MINIMA REQUERIDA EN ALMACEN '
      }
      break
    case 'VENTAS':
      NOTIFICACION = {
        TIPO_NOTIFICACION: type,
        NOTIFICACION: 'SE HA REALIZADO LA SIGUIENTE VENTA '
      }
      break
    case 'COMPRAS':
      NOTIFICACION = {
        TIPO_NOTIFICACION: type,
        NOTIFICACION: 'SE HA REALIZADO LA SIGUIENTE COMRPA '
      }
      break
    case 'CUENTAS_COBRAR':
      NOTIFICACION = {
        TIPO_NOTIFICACION: type,
        NOTIFICACION: 'LA SIGUIENTE CUENTA POR COBRAR ESTA A PUNTO DE VENCER. '
      }
      break
    case 'CUENTAS_PAGAR':
      NOTIFICACION = {
        TIPO_NOTIFICACION: type,
        NOTIFICACION: 'LA SIGUIENTE CUENTA POR PAGAR ESTA A PUNTO DE VENCER. '
      }
      break
  }
  return NOTIFICACION
}

export { makeObjectNotification }
