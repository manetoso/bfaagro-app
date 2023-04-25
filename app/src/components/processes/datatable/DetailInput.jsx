import { useState } from 'react'
import { ComboBox } from '@/components/form/ComboBox'

export function DetailInput({ detail, index, materials, isEmpty }) {
  const [useRest, setUseRest] = useState(false)
  const handleMaxValue = (e, maxValue) => {
    if (e.target.value > maxValue) {
      e.target.value = maxValue
    }
  }
  return (
    <li className='flex flex-col rounded-md border-2 border-black/25 p-2 shadow-md'>
      <div className='flex items-center justify-between'>
        <label className='text-black/50'>Sustituir:</label>
        <span className='flex items-center gap-2'>
          <input
            id={`useRest[${index}]`}
            type='checkbox'
            name={`useRest[${index}]`}
            onChange={(e) => setUseRest(e.target.checked)}
          />
          <label htmlFor={`useRest[${index}]`}>Usar material existente</label>
        </span>
      </div>
      <div className='flex items-center gap-1'>
        <span className='w-full'>{detail.name}</span>
        <input
          type='text'
          className='hidden'
          name={`material[${index}][oldName]`}
          defaultValue={detail.name}
        />
        <input
          type='text'
          className='hidden'
          name={`material[${index}][oldMaterialId]`}
          defaultValue={detail.id}
        />
        {useRest && (
          <input
            className={`input w-full max-w-none ${
              isEmpty && 'border-rose-500'
            }`}
            type='number'
            name={`material[${index}][oldQuantity]`}
            defaultValue={detail.quantity}
            onChange={(e) => handleMaxValue(e, detail.quantity)}
            max={detail.quantity}
            placeholder='Cantidad'
          />
        )}
      </div>
      <label className='text-black/50'>Por:</label>
      <div className='flex gap-1'>
        <ComboBox
          data={materials}
          dataDisplayAttribute='name'
          name={`material[${index}]`}
        />
        <input
          className={`input w-full max-w-none ${isEmpty && 'border-rose-500'}`}
          type='number'
          name={`material[${index}][newQuantity]`}
          placeholder='Cantidad'
        />
      </div>
    </li>
  )
}
