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
    width: 600,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: 800,
    fontFamily: 'Lato Bold',
    width: 200,
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
    justifyContent: 'space-between',
    marginTop: 15,
    borderTop: '1px solid gray',
    paddingTop: 5,
  },
  paymentMethod: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    borderTop: '1px solid gray',
    paddingTop: 5,
    marginTop: 20,
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
  },
  imageWrapper: {
    height: 100,
    width: 100,
  },
  viewHeight: {
    height: 100,
  },
})
