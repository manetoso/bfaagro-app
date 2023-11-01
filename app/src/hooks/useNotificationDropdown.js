import { useEffect, useState } from 'react'
import {
  fetchData,
  deleteData
} from '@/services/notificationsServices'

export const useNotificationDropdown = (isOpen) => {
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState([])

  const fetchNotifications = async () => {
    try {
      const notifications = await fetchData()
      setNotifications(notifications)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      throw new Error('Error fetching notifications')
    } finally {
      setIsLoading(false)
    }
  }

  const removeNotification = async (id) => {
    try {
      await deleteData(id)
      setNotifications((prev) => prev.filter((not) => not.id !== id))
    } catch (error) {
      console.log(error)
      throw new Error('Error deleting notification')
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  return {
    isLoading,
    notifications,
    removeNotification
  }
}
