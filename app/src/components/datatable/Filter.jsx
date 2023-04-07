/**
 *
 * @param {{column: any, table: Table<any>}} props Table from useReactTable '@tanstack/react-table'
 * @returns Filter input component for the table
 */
export function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className='flex gap-1'>
      <input
        type='number'
        value={columnFilterValue?.[0] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className='filter-input hidden w-full rounded border-2 px-1 placeholder:font-normal hover:border-black'
      />
      <input
        type='number'
        value={columnFilterValue?.[1] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className='filter-input hidden w-full rounded border-2 px-1 placeholder:font-normal hover:border-black'
      />
    </div>
  ) : (
    <input
      type='text'
      value={columnFilterValue ?? ''}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Buscar...`}
      className='filter-input hidden w-full rounded border-2 px-1 placeholder:font-normal hover:border-black'
    />
  )
}
