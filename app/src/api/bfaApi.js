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

bfaApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error.response.data.msg)
    if (
      error.response.status === 401 ||
      error.response.data.msg === 'Token no Valid'
    ) {
      window.localStorage.removeItem('bfa-auth-token')
      window.location.href = '/autenticacion'
    }
  }
)
