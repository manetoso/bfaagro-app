import { AccountsPayableDatatable } from './datatable'
import { CustomToast } from '@/components/toast'
import { Loader } from '@/components/layout'

import { useAccountsPayableDatatable } from '@/hooks/useAccountsPayableDatatable'
import { FIELDS_TYPES } from '@/stores/useAccountsPayableStore'

export function AccountsPayable() {
  const {
    accountsPayableData,
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
  } = useAccountsPayableDatatable({ field: FIELDS_TYPES.ACCOUNTS_PAYABLE })
  if (isLoading) return <Loader />
  return (
    <>
      <CustomToast />
      <AccountsPayableDatatable
        columns={columns}
        data={accountsPayableData}
        title='Cuentas por pagar'
        // toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.ACCOUNTS_PAYABLE}
      />
    </>
  )
}
