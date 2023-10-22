import axios from 'axios'

export const bfaApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=UTF-8'
  }
})

bfaApi.interceptors.request.use(
  async (config) => {
    const token = window.localStorage.getItem('bfa-auth-token')
    config.headers['jwt-token'] = token
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
