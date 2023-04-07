import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  isAuthenticated: true,
  permissions: ['read', 'write'],
  roles: ['admin'],
  username: 'admin',
  login: ({ username }) => {
    set({
      isAuthenticated: true,
      permissions: ['read', 'write'],
      roles: ['admin'],
      username
    })
  },
  logout: () => {
    set({ isAuthenticated: false, permissions: [], roles: [], username: '' })
  }
}))
