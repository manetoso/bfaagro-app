import { formatNumberToString } from '@/utils/utils'
import { ChevronBack, ChevronRight } from '🚀'

/**
 *
 * @param {{table: Table<any>}} props Table from useReactTable '@tanstack/react-table'
 * @returns Pagination controls for the table
 */
export function BottomControls({ table }) {
  return (
    <div className='flex w-full items-center justify-end gap-2 overflow-x-auto py-2 px-2 md:py-4 md:px-6'>
      <button
        className={`btn p-1 ${
          !table.getCanPreviousPage() &&
          'cursor-not-allowed bg-opacity-50 hover:bg-black/50'
        }`}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronBack />
      </button>
      <span>
        <strong>
          {table.getState().pagination.pageIndex + 1} ..{' '}
          {formatNumberToString(table.getPageCount())}
        </strong>
      </span>
      <button
        className={`btn p-1 ${
          !table.getCanNextPage() &&
          'cursor-not-allowed bg-opacity-50 hover:bg-black/50'
        }`}
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
            if (e.target.value <= 0 || e.target.value > table.getPageCount())
              return
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
          }}
          className='w-16 rounded border-2 px-1 hover:border-black'
        />
      </span>
    </div>
  )
}
