import { bfaApi } from '@/api/bfaApi'
import { ROLES } from '@/utils/consts'

export async function fetchData() {
  try {
    const { data: resp } = await bfaApi.get('/notificaciones')
    /**
     * The respponse body from the request.
     * @typedef {{ _id: string, VISTA: boolean, NOTIFICACION: { NOTIFICACION: string, TIPO_NOTIFICACION: string }, createdAt }[]} NotificationsBody
     * @type {{body: NotificationsBody}} - The notifications response body.
     */
    const json = resp

    const data = json.body.map((notification) =>
      convertNotificationToAppSchema(notification)
    )
    return data
  } catch (error) {
    throw new Error('Error searching notifications')
  }
}

export async function deleteData(id) {
  try {
    const { data: resp } = await bfaApi.delete(`/notificaciones/${id}`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        section: ROLES.ADMIN
      }
    })
    const json = resp
    return !json.error
  } catch (error) {
    throw new Error('Error deleting notification')
  }
}

function convertNotificationToAppSchema(notification) {
  return {
    id: notification._id,
    viewed: notification.VISTA,
    notification: notification.NOTIFICACION.NOTIFICACION,
    type: notification.NOTIFICACION.TIPO_NOTIFICACION,
    createdAt: notification.createdAt,
    createdAtFormatted: new Date(notification.createdAt).toLocaleDateString(
      'es-MX',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
    )
  }
}
