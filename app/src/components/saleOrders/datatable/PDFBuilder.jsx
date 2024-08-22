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

import { useSaleOrdersStore } from '@/stores/useSaleOrdersStore'
import Logo from '@/assets/bfa-main-logo.png'
import LogoBG from '@/assets/bfa-bg.png'
import { formatDateV2, formatNumberToMoneyString } from '@/utils/utils'
import { t } from './pdf-styles'

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
    fontSize: 9,
    paddingHorizontal: 60,
    paddingTop: 10,
    paddingBottom: 20
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
    width: 100
  },
  headerWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  header: {
    color: '#008D36',
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: -2,
    textAlign: 'center'
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
    flexGrow: 3
  },
  tableHeader: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    borderBottom: '1px solid #000',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    paddingVertical: 2
  },
  tableRowCell: {
    textAlign: 'center',
    width: '30%'
  },
  tableRowCellBig: {
    width: '100%'
  },
  tableFooter: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  pageNumber: {
    bottom: 2,
    color: 'grey',
    fontSize: 12,
    left: 0,
    position: 'absolute',
    right: 0,
    textAlign: 'center'
  }
})

export function PDFBuilder() {
  const { selected, companyData, clientsData } = useSaleOrdersStore()
  if (
    (selected.id === undefined || companyData.id === undefined,
    clientsData.length === 0)
  ) {
    return null
  }
  const supplier = clientsData.find(
    (s) => s.id === selected?.destinationClient?.clientId
  )
  return (
    <div className='mt-4'>
      <PDFDownloadLink
        className='btn absolute bottom-12 right-16'
        document={
          <MyPDFDocument selected={selected} suppliersData={supplier} />
        }
        fileName={`Orden-de-venta-${selected?.folio
          ?.replace(' ', '-')
          .toLowerCase()}.pdf`}
      >
        {/* eslint-disable react/jsx-curly-newline */}
        {({ blob, url, loading, error }) =>
          loading ? 'Cargando documento...' : 'Descargar ahora!'
        }
        {/* eslint-enable react/jsx-curly-newline */}
      </PDFDownloadLink>
      <PDFViewer className='h-[78vh] w-full'>
        <MyPDFDocument selected={selected} suppliersData={supplier} />
      </PDFViewer>
    </div>
  )
}

function MyPDFDocument({ selected, suppliersData }) {
  // const test = Array.from(Array(112).keys())
  const calculateFooterMargin = () => {
    let margin = 0
    const arrayLength = selected?.saleDetails?.products?.length
    // const arrayLength = test.length
    if (
      (arrayLength >= 27 && arrayLength <= 35) ||
      (arrayLength >= 70 && arrayLength <= 78)
    ) {
      margin = 180
    }
    return margin
  }
  return (
    <Document language='Español'>
      <Page size='A4' style={styles.page}>
        <View style={styles.header}>
          <Text>REMISIÓN PEDIDO</Text>
        </View>
        <Image style={styles.logoBG} src={LogoBG} fixed />
        <View style={styles.headerWrapper}>
          <Image style={styles.mainLogo} src={Logo} />
          <View style={[t.flex]}>
            <View style={[t.flex, t.flexRow, t.flexAlignSelfEnd]}>
              <Text style={[t.tableCell, t.fontBold]}>FOLIO:</Text>
              <Text style={[t.tableCellRight, t.textRight]}>
                {selected?.folio?.split(' ')[1]}
              </Text>
            </View>
            <View style={[t.flex, t.flexRow, t.flexAlignSelfEnd]}>
              <Text style={[t.tableCell, t.fontBold]}>FECHA:</Text>
              <Text style={[t.tableCellRight, t.textRight]}>
                {formatDateV2(selected?.createdAt)}
              </Text>
            </View>
            <View style={[t.flex, t.flexRow]}>
              <Text
                style={[t.tableCell, t.textCenter, t.fontBold, t.textPrimary]}
              >
                CLIENTE:
              </Text>
              <Text style={[t.tableCellRight, { width: '200px' }]}>
                {selected?.destinationClient?.clientName}
              </Text>
            </View>
            <View style={[t.flex, t.flexRow]}>
              <Text
                style={[t.tableCell, t.textCenter, t.fontBold, t.textPrimary]}
              >
                DOMICILIO:
              </Text>
              <Text style={[t.tableCellRight, { width: '200px' }]}>
                {suppliersData?.address}
              </Text>
            </View>
            <View style={[t.flex, t.flexRow]}>
              <Text
                style={[
                  t.tableCellBottom,
                  t.textCenter,
                  t.fontBold,
                  t.textPrimary
                ]}
              >
                TIPO:
              </Text>
              <Text style={[t.tableCellRightBottom, { width: '200px' }]}>
                {suppliersData?.clientType?.clientType}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCellBig, t.textCenter]}>
              Descripción
            </Text>
            <Text style={styles.tableHeaderCell}>Cant.</Text>
            <Text style={styles.tableHeaderCell}>P.U.</Text>
            <Text style={styles.tableHeaderCell}>Desc.</Text>
            <Text style={styles.tableHeaderCell}>Sub.</Text>
            <Text style={styles.tableHeaderCell}>Total</Text>
          </View>
          {/* {test.map((product) => ( */}
          {selected?.saleDetails?.products?.map((product) => (
            <View
              key={product?.productId}
              style={[styles.tableRow, t.fontSemibold]}
            >
              <Text style={styles.tableRowCellBig}>{product?.name}</Text>
              <Text style={styles.tableRowCell}>{product?.quantity}</Text>
              <Text style={styles.tableRowCell}>
                {formatNumberToMoneyString(product?.unitPrice)}
              </Text>
              <Text style={styles.tableRowCell}>
                {product?.increment || 0}%
              </Text>
              <Text style={styles.tableRowCell}>
                {formatNumberToMoneyString(
                  product?.unitPrice * product?.quantity
                )}
              </Text>
              <Text style={styles.tableRowCell}>
                {/* eslint-disable */}
                {product?.increment
                  ? formatNumberToMoneyString(
                      product?.unitPrice * product?.quantity -
                        (product?.unitPrice *
                          product?.quantity *
                          product?.increment) /
                          100
                    )
                  : formatNumberToMoneyString(
                      product?.unitPrice * product?.quantity
                    )}
                {/* eslint-enable */}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            ...styles.tableFooter,
            marginTop: calculateFooterMargin()
          }}
        >
          <View
            style={[t.flexRow, t.flexAlignSelfEnd, t.fontBold, t.textPrimary]}
          >
            <Text>Total: </Text>
            <Text style={[t.textRight, { width: '80px' }]}>
              {`${formatNumberToMoneyString(selected?.saleDetails?.total)}`}{' '}
            </Text>
          </View>
          <View style={[t.border2, t.flex, t.p6]}>
            <View style={[t.flex, t.flexRow]}>
              <Text style={[t.widthHalf, t.textCenter, t.fontBold]}>
                PAGARÉ
              </Text>
            </View>
            <Text style={[t.textCenter, t.fontBold]}>
              DEBO(EMOS) Y PAGARÉ(MOS) a BFA Agro, S.A. de C.V. la cantidad de
              $_____________________, valor de mercancía recibida a mi(nuestra)
              entera satisfacción, el día _____________________ en la ciudad de
              ________________ o en cualquier otra que BFA Agro, S.A. de C.V.
              determine. De no pagarse el importe total en la fecha anotada en
              este pagaré se causarán intereses moratorios a la tase del
              ________% mensual.
            </Text>
            <Text style={[t.textCenter, t.fontBold]}>ACEPTO(AMOS)</Text>
            <View
              style={[
                t.flex,
                t.flexRow,
                t.justifyBetween,
                { gap: 50, marginTop: 50 }
              ]}
            >
              <View style={[t.flex, t.widthFull]}>
                <View style={[t.border, t.widthFull]} />
                <Text style={[t.textCenter, t.fontBold]}>Nombre Completo</Text>
              </View>
              <View style={[t.flex, t.widthFull]}>
                <View style={[t.border, t.widthFull]} />
                <Text style={[t.textCenter, t.fontBold]}>Firma</Text>
              </View>
            </View>
          </View>
        </View>
        {/* eslint-disable react/jsx-curly-newline */}
        {/* <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        /> */}
        <Text style={styles.pageNumber} fixed>
          Ventas: administración@bfaagro.com
        </Text>
        {/* eslint-enable react/jsx-curly-newline */}
      </Page>
    </Document>
  )
}
