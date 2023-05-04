import { Datatable } from '../../datatable'
import { CustomToast } from '@/components/toast'
import { DeleteAlert, EmptyModal } from '../../alert'
import { Form } from '.'

export function WareHouseDatatable({
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
	field,
  warehouse,
  productType,
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
        <Form
          selectedRow={selected}
          submitAction={addOrEditElement}
          field={field}
          productType={productType}
          warehouse={warehouse}
        />
      </EmptyModal>
    </div>
  )
}
