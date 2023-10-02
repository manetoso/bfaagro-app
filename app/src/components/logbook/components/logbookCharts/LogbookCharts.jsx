import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { GraphButton, MovementsCharts, ProductsCharts } from './components'

const POSIBLE_TABLES = {
  MOVEMENTS: 'Movimientos',
  PRODUCTS: 'Productos'
}

export function LogbookCharts() {
  const [selectedTable, setSelectedTable] = useState(POSIBLE_TABLES.MOVEMENTS)
  return (
    <section className='mb-10 flex flex-col gap-2'>
      <div className='flex space-x-1 rounded-xl bg-black/10 p-1'>
        <GraphButton
          id={POSIBLE_TABLES.MOVEMENTS}
          selected={selectedTable}
          onClick={() => setSelectedTable(POSIBLE_TABLES.MOVEMENTS)}
        />
        <GraphButton
          id={POSIBLE_TABLES.PRODUCTS}
          selected={selectedTable}
          onClick={() => setSelectedTable(POSIBLE_TABLES.PRODUCTS)}
        />
      </div>
      <div>
        <AnimatePresence mode='wait'>
          {selectedTable === POSIBLE_TABLES.MOVEMENTS ? (
            <motion.div
              key={POSIBLE_TABLES.MOVEMENTS}
              className='grid md:grid-cols-2'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transitions={{ duration: 0.5 }}
            >
              <MovementsCharts />
            </motion.div>
          ) : (
            <motion.div
              key={POSIBLE_TABLES.PRODUCTS}
              className='grid md:grid-cols-2'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transitions={{ duration: 0.5 }}
            >
              <ProductsCharts />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
