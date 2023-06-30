import { CustomToast } from '@/components/toast'
import { DeleteAlert, EmptyModal } from '../../alert'

import { Datatable } from '../../datatable'
import { UsersForm, RolesForm } from '.'

import { FIELDS_TYPES } from '@/stores/useSettingsStore'

export function SettingsDatatable({
  columns,
  data,
  title,
  toggleAddModal,
  toggleAlert,
  toggleEditModal,
  selected,
  addOrEditElement,
  removeElement,
  alert,
  editModal,
  field
}) {
  return (
    <div className='relative mt-4'>
      <CustomToast />
      <Datatable
        columns={columns}
        data={data}
        title={title}
        addHandler={toggleAddModal}
      />
      <DeleteAlert
        closeAlert={toggleAlert}
        deleteOnClick={() => removeElement(field)}
        isOpen={alert}
      />
      <EmptyModal
        closeModal={() => toggleEditModal({})}
        isOpen={editModal}
        title={Object.keys(selected).length === 0 ? 'Agregar' : 'Editar'}
      >
        {field === FIELDS_TYPES.USERS && (
          <UsersForm
            selectedRow={selected}
            submitAction={addOrEditElement}
            field={field}
          />
        )}
        {field === FIELDS_TYPES.ROLES && (
          <RolesForm
            selectedRow={selected}
            submitAction={addOrEditElement}
            field={field}
          />
        )}
      </EmptyModal>
    </div>
  )
}
