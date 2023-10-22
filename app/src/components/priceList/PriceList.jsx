import { PriceListDatatable } from './datatable'
import { CustomToast } from '@/components/toast'
import { Loader, PageTransition } from '@/components/layout'

import { usePriceListDatatable } from '@/hooks/usePriceListDatatable'
import { FIELDS_TYPES } from '@/stores/usePriceListStore'

export function PriceList() {
  const {
    priceListData,
    addOrEditElement,
    alert,
    showAddButton,
    editModal,
    removeElement,
    selected,
    columns,
    toggleAddModal,
    toggleAlert,
    toggleEditModal,
    isLoading
  } = usePriceListDatatable({ field: FIELDS_TYPES.PRICE_LIST })
  if (isLoading) return <Loader />
  return (
    <PageTransition>
      <CustomToast />
      <PriceListDatatable
        columns={columns}
        data={priceListData}
        title='Lista de Precios'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        showAddButton={showAddButton}
        editModal={editModal}
        field={FIELDS_TYPES.PRICE_LIST}
      />
    </PageTransition>
  )
}
