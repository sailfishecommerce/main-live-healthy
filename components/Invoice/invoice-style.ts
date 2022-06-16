import { StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
  family: 'Open Sans',
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
})

Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
})

Font.register({
  family: 'Lato Italic',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
})

Font.register({
  family: 'Lato Bold',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
})

export const styles = StyleSheet.create({
  page: {
    width: '100%',
    padding: 20,
  },
  image: {
    height: 50,
    width: 150,
  },
  shippingView: {
    width: '30%',
  },
  customerView: {
    width: '22%',
  },
  paymentMethod: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '48%',
  },
  date: {
    fontSize: 14,
    fontWeight: 300,
  },
  toRight: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  orderNumber: {
    fontSize: 25,
    fontWeight: 1000,
  },
  idNumber: {
    fontSize: 15,
    fontWeight: 1000,
  },
  fbIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: 300,
    fontFamily: 'Lato',
    fontColor: 'gray',
    lineHeight: '1.5px',
  },
  title: {
    fontSize: 14,
    fontWeight: 800,
    fontFamily: 'Lato Bold',
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: 800,
    fontFamily: 'Lato Bold',
    width: '60%',
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: 800,
    fontFamily: 'Lato Bold',
    width: '15%',
    textAlign: 'center',
  },
  quantity: {
    fontSize: 14,
    fontWeight: 800,
    fontFamily: 'Lato Bold',
    width: '10%',
    textAlign: 'center',
  },
  priceTitle: {
    fontSize: 14,
    fontWeight: 800,
    fontFamily: 'Lato Bold',
    width: '15%',
    textAlign: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  row2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    height: 100,
  },
  row3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 15,
    borderTop: '1px solid gray',
    borderBottom: '1px solid gray',
    paddingVertical: 5,
  },

  storeName: {
    fontWeight: 1000,
    fontFamily: 'Lato Bold',
    fontSize: 14,
    marginTop: 10,
  },
  row4: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: 5,
    justifyItems: 'end',
  },
  link: {
    margin: '2px 0px',
    fontSize: 12,
    fontFamily: 'Lato',
  },
  row5: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
  },
  fbLink: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  innerRow: {
    display: 'flex',
    flexDirection: 'row',
    width: 200,
    margin: '5px 0px',
    justifyContent: 'space-between',
  },
  totalEnd: {
    border: '1px solid gray',
    width: 200,
  },
})

export const itemStyles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  itemRow: {
    height: 120,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottom: '1px solid gray',
  },
  imageWrapper: {
    height: 100,
    width: 100,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  imageRow: {
    fontSize: 12,
    fontFamily: 'Lato',
    display: 'flex',
    flexDirection: 'row',
    width: '60%',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: 'light',
    fontFamily: 'Lato',
  },
  productName: {
    fontSize: 12,
    fontWeight: 'light',
    fontFamily: 'Lato',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'auto',
    width: '60%',
  },
  price: {
    fontSize: 12,
    fontWeight: 'light',
    textAlign: 'left',
    fontFamily: 'Lato',
    width: 100,
    display: 'flex',
    flexDirection: 'column',
  },
  strikeThrough: {
    textDecoration: 'line-through',
    fontWeight: 'light',
    fontSize: 12,
    fontFamily: 'Lato',
    textAlign: 'center',
  },
  itemTotal: {
    fontFamily: 'Lato',
    fontWeight: 'light',
    fontSize: 12,
    width: '15%',
    textAlign: 'center',
  },
  quantity: {
    width: '10%',
    fontSize: 12,
    fontWeight: 'light',
    textAlign: 'center',
    fontFamily: 'Lato',
  },
})
