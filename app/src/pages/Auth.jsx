import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { useAuthStore } from '@/stores'

import { PageTransition } from '@/components/layout/PageTransition'
import { CustomToast } from '@/components/toast'
import { Input } from '@/components/form'

export function Auth({ isAuthenticated }) {
  const login = useAuthStore((store) => store.login)
  const [localLoginData] = useState({
    username: JSON.parse(localStorage.getItem('user'))?.username,
    password: JSON.parse(localStorage.getItem('user'))?.password
  })
  if (isAuthenticated) {
    return <Navigate to='/app/inicio' replace />
  }
  const handleLogin = (e) => {
    // login({ username: 'admin' })
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const data = {}
    for (const [key, value] of formData.entries()) {
      if (!isNaN(value) && value !== '') {
        data[key] = parseFloat(value)
      } else {
        data[key] = value
      }
    }
    const newIsEmpty = Object.values(data).some((x) => x === null || x === '')
    if (newIsEmpty) {
      toast.error('Favor de llenar todos los campos')
      return
    }
    const loginData = {
      username: data.username,
      password: data.password,
      remember: data.remember?.length > 0 ? true : false
    }
    loginData.remember ? saveOnLocalStorage(loginData) : null
    login(loginData)
  }

  const saveOnLocalStorage = (data) => {
    localStorage.setItem('user', JSON.stringify(data))
  }

  return (
    <PageTransition>
      <CustomToast />
      <div className='flex min-h-screen items-center justify-center'>
        <form onSubmit={handleLogin} className='flex flex-col gap-4'>
          <h1 className='text-center text-2xl font-black text-gray-700'>
            Inicio de Sesion
          </h1>
          <Input
            defaultValue={localLoginData.username}
            id='username'
            label='Usuario'
            name='username'
            placeholder='admin'
            required={false}
            type='text'
          />
          <Input
            defaultValue={localLoginData.password}
            id='password'
            label='Contraseña'
            name='password'
            placeholder='********'
            required={false}
            type='password'
          />
          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='rememberMe'
              name='remember'
              // checked={localLoginData.remember}
            />
            <label htmlFor='rememberMe'>Recordarme</label>
          </div>
          <button className='btn' type='submit'>
            Acceder
          </button>
        </form>
      </div>
    </PageTransition>
  )
}
