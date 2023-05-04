import { Toaster } from 'react-hot-toast'

export function CustomToast() {
  return (
    <Toaster
      position='top-right'
      toastOptions={{
        success: {
          // className: 'bg-emerald-600 text-white',
          style: {
            backgroundColor: '#059669',
            color: '#fff'
          }
        },
        error: {
          // className: 'bg-rose-600 text-white'
          style: {
            backgroundColor: '#e11d48',
            color: '#fff'
          }
        }
      }}
    />
  )
}
