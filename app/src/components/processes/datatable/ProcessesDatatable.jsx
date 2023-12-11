import { Datatable } from '../../datatable'
import { DeleteAlert, EmptyModal } from '../../alert'
import { Form, IncompleteForm } from '.'

export function ProcessesDatatable({
  columns,
  data,
  title,
  toggleAddModal,
  toggleAlert,
  toggleEditModal,
  toggleIncompleteModal,
  selected,
  addOrEditElement,
  removeElement,
  alert,
  editModal,
  incompleteModal,
  markAsIncompleteStatus,
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
        title={
          Object.keys(selected).length === 0 ? 'Generar Proceso' : 'Editar'
        }
      >
        <Form
          selectedRow={selected}
          submitAction={addOrEditElement}
          field={field}
          modalId={data.length + 1}
        />
      </EmptyModal>
      <EmptyModal
        closeModal={() => toggleIncompleteModal({})}
        isOpen={incompleteModal}
        title='Marcar como incompleto'
      >
        <IncompleteForm
          selectedRow={selected}
          submitAction={markAsIncompleteStatus}
          field={field}
        />
      </EmptyModal>
    </div>
  )
}
