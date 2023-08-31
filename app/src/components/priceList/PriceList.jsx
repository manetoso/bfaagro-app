import { PriceListDatatable } from './datatable'
import { CustomToast } from '@/components/toast'
import { Loader } from '@/components/layout'

import { usePriceListDatatable } from '@/hooks/usePriceListDatatable'
import { FIELDS_TYPES } from '@/stores/usePriceListStore'

export function PriceList() {
  const {
    priceListData,
    addOrEditElement,
    alert,
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
    <>
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
        editModal={editModal}
        field={FIELDS_TYPES.PRICE_LIST}
      />
    </>
  )
}
