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
  },
  logout: () => {
    set({
      isAuthenticated: false,
      roles: [],
      token: '',
      username: ''
    })
  }
}))
