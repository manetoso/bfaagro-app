import Logo from '@/assets/bfa-bg.png'

export function AuthHeader() {
  return (
    <section className='flex flex-col gap-2'>
      <h1 className='text-center text-2xl font-black text-gray-700'>
        Inicio de Sesión
      </h1>
      <div className='flex justify-center'>
        <img alt='app logo' src={Logo} className='h-14 w-14 md:w-20 md:h-20' />
      </div>
    </section>
  )
}
