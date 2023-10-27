import { sleep } from '@/utils/sleep'
import { useState } from 'react'

export const useNotificationDropdown = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasFetch, setHasFetch] = useState(false)
  const [notifications, setNotifications] = useState([])

  const fetchNotifications = async () => {
    if (hasFetch) return
    try {
      await sleep(2)
      setNotifications([
        {
          id: 1,
          title: 'La factura 1234 tiene como fecha de vencimiento el 12/12/2020',
          type: 'Cuenta por cobrar'
        }
      ])
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setHasFetch(true)
    }
  }

  return {
    fetchNotifications,
    isLoading,
    notifications
  }
}
