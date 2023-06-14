import axios from 'axios'

export const bfaApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=UTF-8'
  }
})

// soloApi.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem('@auth-token')
//     config.headers.Authorization = 'Bearer ' + token
//     return config
//   },
//   (error) => {
//     Promise.reject(error)
//   }
// )
