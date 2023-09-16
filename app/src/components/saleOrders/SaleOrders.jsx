import { SaleOrdersDatatable, PDFBuilder } from './datatable'
import { CustomToast } from '@/components/toast'
import { PDFView, RedirectAlert } from '@/components/alert'
import { Loader } from '@/components/layout'

import { useSaleOrdersDatatable } from '@/hooks/useSaleOrdersDatatable'
import { FIELDS_TYPES } from '@/stores/useSaleOrdersStore'

export function SaleOrders() {
  const {
    saleOrdersData,
    addOrEditElement,
    alert,
    priceListWarning,
    editModal,
    pdfView,
    removeElement,
    selected,
    columns,
    toggleAddModal,
    printPurchaseOrder,
    toggleAlert,
    toggleEditModal,
    isLoading
  } = useSaleOrdersDatatable({ field: FIELDS_TYPES.SALE_ORDERS })
  if (isLoading) return <Loader />
  return (
    <>
      <CustomToast />
      <SaleOrdersDatatable
        columns={columns}
        data={saleOrdersData}
        title='Ordenes de Ventas'
        toggleAddModal={toggleAddModal}
        toggleAlert={toggleAlert}
        toggleEditModal={toggleEditModal}
        selected={selected}
        addOrEditElement={addOrEditElement}
        removeElement={removeElement}
        alert={alert}
        editModal={editModal}
        field={FIELDS_TYPES.SALE_ORDERS}
      />
      <RedirectAlert href='/app/ventas/lista-precios' isOpen={priceListWarning} />
      <PDFView
        closeModal={() => printPurchaseOrder({})}
        isOpen={pdfView}
        title='Orden de Compra PDF'
      >
        <PDFBuilder />
      </PDFView>
    </>
  )
}
