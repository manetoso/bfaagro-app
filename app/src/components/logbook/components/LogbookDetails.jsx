import { formatNumberToMoneyString } from '@/utils/utils'

export function LogbookDetails({ selected }) {
  return (
    <section className='mt-10'>
      <div className='grid grid-cols-2 text-xl text-[#008D36]'>
        <p className='font-black'>{selected?.movement}</p>
        <p className='text-right font-black'>{selected?.createdAtFormatted}</p>
      </div>
      <ul className='mt-4 grid grid-cols-5 gap-y-2'>
        <li className='col-span-5 grid grid-cols-5 font-bold text-[#008D36]'>
          <span className='text-center'>#</span>
          <span className='col-span-3'>Producto</span>
          <span className='text-center'>Cantidad</span>
        </li>
        {selected?.product?.map(({ id, productName, quantity }, index) => (
          <li
            key={id}
            className='col-span-5 grid grid-cols-5 border-b-2 border-[#008D36] pb-2'
          >
            <span className='text-center'>{index + 1}</span>
            <span className='col-span-3'>{productName}</span>
            <span className='text-center'>{quantity}</span>
          </li>
        ))}
        <li className='col-span-5 grid grid-cols-5 pb-2 font-black'>
          <span className='col-span-4 text-right'>Total:</span>
          <span className='text-center'>
            {`${formatNumberToMoneyString(selected?.total)} ${
              selected?.currency
            }`}
          </span>
        </li>
      </ul>
    </section>
  )
}
