import { useLogbookDatatable } from '@/hooks/useLogbookDatatable'

import { CustomToast } from '@/components/toast'
import { Loader } from '@/components/layout'
import { ChartCard, CustomAreaChart, CustomPieChart } from '@/components/charts'

import { Datatable } from '../datatable'
import { LogbookDetails } from './components/LogbookDetails'
import { EmptyModal } from '../alert'

export function LogbookDatatable() {
  const {
    logbookData,
    detailsModal,
    selected,
    toggleDetailsModalModal,
    columns,
    isLoading
  } = useLogbookDatatable()
  if (isLoading) return <Loader />
  return (
    <>
      <CustomToast />
      <div className='relative mt-4'>
        <Datatable columns={columns} data={logbookData} title='Bitácora' />
        <EmptyModal
          closeModal={() => toggleDetailsModalModal({})}
          isOpen={detailsModal}
          title='Detalles'
        >
          <LogbookDetails selected={selected} />
        </EmptyModal>
        <section className='mt-10 grid md:grid-cols-2'>
          <ChartCard title='Grafica de puntos'>
            <CustomAreaChart xLabel='Meses' yLabel='Valores' />
          </ChartCard>
          <ChartCard title='Grafica de pastel'>
            <CustomPieChart />
          </ChartCard>
          <ChartCard title='Grafica de pastel'>
            <CustomPieChart />
          </ChartCard>
          <ChartCard title='Grafica de puntos'>
            <CustomAreaChart xLabel='Meses' yLabel='Valores' />
          </ChartCard>
        </section>
      </div>
    </>
  )
}
