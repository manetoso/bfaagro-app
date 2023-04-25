import { Toaster } from 'react-hot-toast'

export function CustomToast() {
  return (
    <Toaster
      position='top-right'
      toastOptions={{
        success: {
          className: 'bg-emerald-600 text-white'
        },
        error: {
          className: 'bg-rose-600 text-white'
        }
      }}
    />
  )
}
