import { ChargesDatatable } from './datatable'
import { CustomToast } from '@/components/toast'
import { Loader } from '@/components/layout'

import { useChargesDatatable } from '@/hooks/useChargesDatatable'
import { FIELDS_TYPES } from '@/stores/useChargesStore'

export function Charges() {
  const {
    chargesData,
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
  } = useChargesDatatable({ field: FIELDS_TYPES.CHARGES })
  if (isLoading) return <Loader />
  return (
    <>
      <CustomToast />
      <ChargesDatatable
        columns={columns}
        data={chargesData}
        title='Cobros'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.CHARGES}
      />
    </>
  )
}
