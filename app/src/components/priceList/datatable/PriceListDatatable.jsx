import { Datatable } from '../../datatable'
import { DeleteAlert, EmptyModal } from '../../alert'
import { Form } from '.'

export function PriceListDatatable({
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
  showAddButton,
  editModal,
  field
}) {
  return (
    <div className='relative mt-4'>
      {showAddButton ? (
        <Datatable
          columns={columns}
          data={data}
          title={title}
          addHandler={toggleAddModal}
        />
      ) : (
        <Datatable
          columns={columns}
          data={data}
          title={title}
        />
      )}
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
