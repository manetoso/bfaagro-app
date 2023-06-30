import { ChaoticOrbit } from '@uiball/loaders'

export function Loader() {
  return (
    <dialog open className='fixed top-0 left-0 min-h-screen min-w-full'>
      <div className='flex min-h-screen items-center justify-center'>
        <ChaoticOrbit size={35} color='#231F20' />
      </div>
    </dialog>
  )
}
