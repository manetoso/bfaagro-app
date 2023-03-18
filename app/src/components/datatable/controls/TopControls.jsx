import { Filter } from '@/components/Icons'
import { Plus } from '🚀'

import './filters.css'

/**
 *
 * @param {{table: Table<any>, addHandler: () => void}} props Table from useReactTable '@tanstack/react-table'
 * @returns Pagination controls for the table
 */
export function TopControls({ table, addHandler }) {
  return (
    <div className='flex items-center gap-2'>
      <span className='text-xs font-bold'>Registros por pág:</span>
      <select
        className='cursor-pointer rounded border-2 p-1 hover:border-black'
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
      <label
        htmlFor='filters-input'
        className='filter-label cursor-pointer rounded bg-black p-1 text-white hover:bg-opacity-80'
      >
        <Filter />
      </label>
      <button className='btn p-1' onClick={addHandler}>
        <Plus />
      </button>
    </div>
  )
}
