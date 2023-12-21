import axios from 'axios'
import { toast } from 'react-hot-toast'

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

bfaApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      toast.error(
        'Ups, el servidor no responde. Espera unos minutos y vuelve a intentarlo.',
        {
          duration: 6000
        }
      )
    }
    if (
      error.response.status === 401 ||
      error.response.data.msg === 'Token no Valid'
    ) {
      window.localStorage.removeItem('bfa-auth-token')
      window.location.href = '/autenticacion'
    }
    throw error
  }
)
