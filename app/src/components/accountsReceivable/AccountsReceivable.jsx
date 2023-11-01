import { AccountsReceivableDatatable } from './datatable'
import { CustomToast } from '@/components/toast'
import { Loader, PageTransition } from '@/components/layout'

import { useAccountsReceivableDatatable } from '@/hooks/useAccountsReceivableDatatable'
import { FIELDS_TYPES } from '@/stores/useAccountsReceivableStore'

export function AccountsReceivable() {
  const {
    accounts,
    addOrEditElement,
    alert,
    editModal,
    removeElement,
    selected,
    columns,
    toggleAlert,
    toggleEditModal,
    isLoading
  } = useAccountsReceivableDatatable({
    field: FIELDS_TYPES.ACCOUNTS_RECEIVABLES
  })
  if (isLoading) return <Loader />
  return (
    <PageTransition>
      <CustomToast />
      <AccountsReceivableDatatable
        columns={columns}
        data={accounts}
        title='Cuentas por Cobrar'
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.ACCOUNTS_RECEIVABLES}
      />
    </PageTransition>
  )
}
