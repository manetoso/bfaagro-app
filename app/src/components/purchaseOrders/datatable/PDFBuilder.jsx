import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
  Font
} from '@react-pdf/renderer'

import { usePurchaseOrdersStore } from '@/stores/usePurchaseOrdersStore'
import Logo from '@/assets/bfa-main-logo.png'
import LogoBG from '@/assets/bfa-bg.png'
import {
  formatDate,
  formatNumberToMoneyString,
  formatPhoneNumber
} from '@/utils/utils'

Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf'
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf',
      fontWeight: 600
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-800.ttf',
      fontWeight: 800
    }
  ]
})

// Create styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Open Sans',
    fontSize: 12,
    paddingHorizontal: 60,
    paddingVertical: 40
  },
  topDecorationWrapper: {
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100vw'
  },
  decoration: {
    backgroundColor: '#008D36',
    borderRadius: 10,
    height: 10,
    margin: 'auto',
    width: '65vw'
  },
  bottomDecorationWrapper: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: '100vw'
  },
  logoBG: {
    alignItems: 'center',
    bottom: 200,
    display: 'flex',
    justifyContent: 'center',
    left: 80,
    opacity: 0.1,
    position: 'absolute',
    right: 120,
    top: 200,
    zIndex: -1
  },
  mainLogo: {
    aspectRatio: 16 / 9,
    width: 130
  },
  headerWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40
  },
  header: {
    color: '#000',
    color: '#008D36',
    fontSize: 32,
    fontWeight: 800,
    letterSpacing: -2,
    textAlign: 'center'
  },
  mainInfoWrapper: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    marginBottom: 40
  },
  infoRow: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between'
  },
  strong: {
    color: '#008D36',
    fontWeight: 800
  },
  muted: {
    color: 'grey'
  },
  small: {
    fontSize: 10
  },
  table: {
    marginBottom: 40
  },
  tableHeader: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16
  },
  tableHeaderCell: {
    color: '#008D36',
    fontWeight: 800,
    textAlign: 'center',
    width: '30%'
  },
  tableHeaderCellBig: {
    color: '#008D36',
    fontWeight: 800,
    width: '100%'
  },
  tableRow: {
    alignItems: 'center',
    borderBottom: '1px solid #008D36',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16
  },
  tableRowCell: {
    textAlign: 'center',
    width: '30%'
  },
  tableRowCellBig: {
    color: '#008D36',
    fontWeight: 800,
    width: '100%'
  },
  tableFooter: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between'
  },
  tableFooterColBig: {
    width: '100%'
  },
  tableFooterCol: {
    width: '50%'
  },
  tableFooterTotalsRow: {
    alignItems: 'flex-start',
    color: '#008D36',
    display: 'flex',
    flexDirection: 'row',
    fontWeight: 800,
    gap: 10,
    justifyContent: 'space-between'
  },
  signaturesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 80
  },
  signature: {
    alignItems: 'center',
    color: '#008D36',
    display: 'flex',
    flexDirection: 'column'
  },
  signatureLine: {
    backgroundColor: '#008D36',
    height: 2,
    width: 160
  },
  pageNumber: {
    bottom: 20,
    color: 'grey',
    fontSize: 12,
    left: 0,
    position: 'absolute',
    right: 0,
    textAlign: 'center'
  }
})

export function PDFBuilder() {
  const { selected, companyData, suppliersData } = usePurchaseOrdersStore()
  if (
    (selected.id === undefined || companyData.id === undefined,
    suppliersData.length === 0)
  )
    return null
  const supplier = suppliersData.find(
    (s) => s.id === selected?.supplier?.supplierId
  )
  return (
    <div className='mt-4'>
      <PDFDownloadLink
        className='btn absolute bottom-12 right-16'
        document={
          <MyPDFDocument
            selected={selected}
            companyData={companyData}
            suppliersData={supplier}
          />
        }
        fileName={`Orden-de-compra-${selected?.folio
          ?.replace(' ', '-')
          .toLowerCase()}-${selected?.currency}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Cargando documento...' : 'Descargar ahora!'
        }
      </PDFDownloadLink>
      <PDFViewer className='h-[78vh] w-full'>
        <MyPDFDocument
          selected={selected}
          companyData={companyData}
          suppliersData={supplier}
        />
      </PDFViewer>
    </div>
  )
}

function MyPDFDocument({ selected, companyData, suppliersData }) {
  return (
    <Document language='Español'>
      <Page size='A4' style={styles.page}>
        <View style={styles.topDecorationWrapper} fixed>
          <View style={styles.decoration} />
        </View>
        <Image style={styles.logoBG} src={LogoBG} fixed />
        <View style={styles.headerWrapper}>
          <Image style={styles.mainLogo} src={Logo} />
          <View style={styles.header}>
            <Text>ORDEN DE COMPRA</Text>
          </View>
        </View>
        <View style={styles.mainInfoWrapper}>
          <View style={styles.infoRow}>
            <Text style={styles.strong}>Proveedor:</Text>
            <View>
              <Text style={styles.strong}>{selected?.supplier?.agent}</Text>
              <Text style={{ ...styles.muted, ...styles.small }}>
                {selected?.supplier?.supplierCompany}
              </Text>
              <Text style={{ ...styles.muted, ...styles.small }}>
                {formatPhoneNumber(suppliersData?.phoneNumber)}
              </Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <View style={{ ...styles.infoRow, justifyContent: 'flex-start' }}>
              <Text style={styles.strong}>Folio:</Text>
              <View>
                <Text style={styles.strong}>
                  #{selected?.folio?.split(' ')[1]}
                </Text>
              </View>
            </View>
            <View style={{ ...styles.infoRow, justifyContent: 'flex-start' }}>
              <Text style={styles.strong}>Fecha:</Text>
              <View>
                <Text>{formatDate(selected?.date)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>#</Text>
            <Text style={styles.tableHeaderCellBig}>Descripción</Text>
            <Text style={styles.tableHeaderCell}>Cantidad</Text>
            <Text style={styles.tableHeaderCell}>P.U.</Text>
            <Text style={styles.tableHeaderCell}>Subtotal</Text>
            <Text style={styles.tableHeaderCell}>Total</Text>
          </View>
          {selected?.products?.map((product, index) => (
            <View key={product?.productId} style={styles.tableRow}>
              <Text style={styles.tableRowCell}>{index + 1}</Text>
              <Text style={styles.tableRowCellBig}>{product?.name}</Text>
              <Text style={styles.tableRowCell}>{product?.quantity}</Text>
              <Text style={styles.tableRowCell}>
                {formatNumberToMoneyString(product?.unitPrice)}
              </Text>
              <Text style={styles.tableRowCell}>
                {formatNumberToMoneyString(product?.subtotal)}
              </Text>
              <Text style={styles.tableRowCell}>
                {formatNumberToMoneyString(product?.totalUnit)}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.tableFooter}>
          <View style={styles.tableFooterColBig}>
            <Text style={{ ...styles.strong, marginBottom: 10 }}>
              Informaci&oacute;n de la empresa:
            </Text>
            <Text style={styles.small}>{companyData?.name}</Text>
            <Text style={styles.small}>{companyData?.address}</Text>
          </View>
          <View style={styles.tableFooterCol}>
            <View
              style={{
                ...styles.tableFooterTotalsRow
              }}
            >
              <Text>Subtotal:</Text>
              <Text style={{ textAlign: 'right' }}>
                {formatNumberToMoneyString(
                  selected?.products?.reduce((acc, curr) => {
                    return acc + curr.subtotal
                  }, 0)
                )}
              </Text>
            </View>
            <View
              style={{
                ...styles.tableFooterTotalsRow,
                marginBottom: 12
              }}
            >
              <Text>IVA:</Text>
              <Text style={{ textAlign: 'right' }}>
                {formatNumberToMoneyString(selected?.totalIva)}
              </Text>
            </View>
            <View
              style={{
                ...styles.tableFooterTotalsRow,
                fontSize: 16
              }}
            >
              <Text>Total:</Text>
              <Text style={{ textAlign: 'right' }}>
                {`${formatNumberToMoneyString(selected?.total)} ${
                  selected?.currency
                }`}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.signaturesWrapper}>
          <View style={styles.signature}>
            <View style={styles.signatureLine} />
            <Text style={{ ...styles.small }}>Autoriza</Text>
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
        <View style={styles.bottomDecorationWrapper} fixed>
          <View style={styles.decoration} />
        </View>
      </Page>
    </Document>
  )
}
