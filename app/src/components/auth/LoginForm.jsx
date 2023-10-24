import { useState } from 'react'
import toast from 'react-hot-toast'

import { useAuthStore } from '@/stores'
import { Input } from '../form'

export function LoginForm() {
  const { login } = useAuthStore()
  const [localLoginData] = useState({
    username: JSON.parse(window.localStorage.getItem('bfa-user'))?.username,
    password: JSON.parse(window.localStorage.getItem('bfa-user'))?.password
  })
  const [isEmpty, setIsEmpty] = useState(false)

  const handleLogin = (e) => {
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
      setIsEmpty(newIsEmpty)
      return
    }
    const loginData = {
      username: data.username,
      password: data.password
    }
    data.remember?.length > 0 && saveOnLocalStorage(loginData)
    login(loginData)
  }

  const saveOnLocalStorage = (data) => {
    window.localStorage.setItem('bfa-user', JSON.stringify(data))
  }
  return (
    <form onSubmit={handleLogin} className='flex flex-col gap-2'>
      <Input
        defaultValue={localLoginData.username}
        isEmpty={isEmpty}
        id='username'
        label='Usuario'
        name='username'
        placeholder='admin'
        required={false}
        type='text'
      />
      <Input
        defaultValue={localLoginData.password}
        isEmpty={isEmpty}
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
  )
}
