import { StyleSheet } from '@react-pdf/renderer'

export const t = StyleSheet.create({
  flex: { display: 'flex' },
  flexRow: { flexDirection: 'row' },
  flexAlignSelfEnd: { alignSelf: 'flex-end' },
  justifyBetween: { justifyContent: 'space-between' },
  p6: { padding: 6 },
  border: {
    border: '1px solid #000'
  },
  border2: {
    border: '2px solid #000'
  },
  widthFull: { width: '100%' },
  widthHalf: { width: '50%' },
  fontBold: { fontWeight: 'bold' },
  fontSemibold: { fontWeight: 'semibold' },
  textPrimary: { color: '#008D36' },
  textRight: { textAlign: 'right' },
  textCenter: { textAlign: 'center' },
  tableCell: {
    border: '1px solid #000',
    padding: '2px',
    width: '80px',
    borderRight: 'none',
    borderBottom: 'none'
  },
  tableCellRight: {
    border: '1px solid #000',
    padding: '2px',
    width: '80px',
    borderBottom: 'none'
  },
  tableCellBottom: {
    border: '1px solid #000',
    padding: '2px',
    width: '80px',
    borderRight: 'none'
  },
  tableCellRightBottom: {
    border: '1px solid #000',
    padding: '2px',
    width: '80px'
  }
})
