import { Datatable } from '../../datatable'
import { DeleteAlert, EmptyModal } from '../../alert'
import { Form } from '.'

export function AccountsReceivableDatatable({
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
        <Form
          selectedRow={selected}
          submitAction={addOrEditElement}
          field={field}
          modalId={data.length + 1}
        />
      </EmptyModal>
    </div>
  )
}
