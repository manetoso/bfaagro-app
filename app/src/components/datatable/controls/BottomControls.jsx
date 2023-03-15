import { ChevronBack, ChevronRight } from '🚀'

/**
 *
 * @param {{table: Table<any>}} props Table from useReactTable '@tanstack/react-table'
 * @returns Pagination controls for the table
 */
export function BottomControls({ table }) {
  return (
    <div className='flex w-full items-center justify-end gap-2 overflow-x-auto bg-white py-2 px-2 md:py-4 md:px-6'>
      <button
        className='cursor-pointer rounded border-2 hover:border-black'
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronBack />
      </button>
      <span>
        <strong>
          {table.getState().pagination.pageIndex + 1} .. {table.getPageCount()}
        </strong>
      </span>
      <button
        className='cursor-pointer rounded border-2 hover:border-black'
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight />
      </button>
      <span className='flex items-center gap-1'>
        Ir a:
        <input
          type='number'
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(
              page > -1 && page <= table.getPageCount() && page
            )
          }}
          className='w-10 rounded border-2 px-1 hover:border-black'
        />
      </span>
    </div>
  )
}
