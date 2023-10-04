import { PaymentsDatatable } from './datatable'
import { CustomToast } from '@/components/toast'
import { Loader, PageTransition } from '@/components/layout'

import { usePaymentsDatatable } from '@/hooks/usePaymentsDatatable'
import { FIELDS_TYPES } from '@/stores/usePaymentsStore'

export function Payments() {
  const {
    paymentsData,
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
  } = usePaymentsDatatable({ field: FIELDS_TYPES.PAYMENTS })
  if (isLoading) return <Loader />
  return (
    <PageTransition>
      <CustomToast />
      <PaymentsDatatable
        columns={columns}
        data={paymentsData}
        title='Pagos'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.PAYMENTS}
      />
    </PageTransition>
  )
}
