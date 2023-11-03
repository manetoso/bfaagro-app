import { create } from 'zustand'

import { login } from '@/services/globalServices'

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  roles: [],
  username: '',
  token: window.localStorage.getItem('bfa-auth-token') || '',
  isLoading: false,
  login: async ({ username, password }) => {
    set({ isLoading: true })
    try {
      const user = await login({ username, password })
      if (!user) {
        set({ isLoading: false })
        return
      }
      set({
        isAuthenticated: true,
        isLoading: false,
        roles: user.roles,
        token: user.token,
        username: user.username
      })
    } catch (error) {
    } finally {
      set({
        isLoading: false
      })
    }
  },
  logout: () => {
    window.localStorage.removeItem('bfa-auth-token')
    set({
      isAuthenticated: false,
      roles: [],
      token: '',
      username: ''
    })
  }
}))
