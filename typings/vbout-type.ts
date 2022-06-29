export type createCartType = {
  customer: string
  uniqueid?: string
  cartid: number
  cartcurrency: string
  storename: string
  customerinfo: {
    firstname: string
    lastname: string
    phone: string
    country: string
  }
}

export type addCartItemType = {
  customer?: string
  cartid: string
  productid: string
  name: string
  price: string
  quantity: number
  image: string
}

export type removeCartItemType = {
  cartid: string
  productid: string
}

export type emptyCartItemType = {
  cartid: string
}

export type createOrderType = {
  customer?: string
  cartid: string
  orderid: string
  paymentmethod: string
  shippingcost: string
  storename: string
  grandtotal: string
  promocode: string
  currency: string
  customerinfo: {
    firstname: string
    lastname: string
    phone: string
    country: string
  }
  billinginfo: {
    firstname: string
    lastname: string
    phone: string
    address: string
    zipcode: string
    countryname: string
    countrycode: string
    statename: string
  }
  shippinginfo: {
    firstname: string
    lastname: string
    phone: string
    address: string
    zipcode: string
    countryname: string
    countrycode: string
    statename: string
  }
}
