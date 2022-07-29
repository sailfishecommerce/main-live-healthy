export type productType = {
  name: string
  description?: any | string
  attributes?: any
  sale_price: number
  meta_title?: string
  content: {
    maxQuantity: number
    productBenefits: Array<{
      icon: string
      text: string
    }>
  }
  __queryID?: any
  __position?: any
  objectID?: any
  vendor: string
  product_image: Array<{ file: { url: string } }> | any
  product_images: Array<{ link: string; alt: string }>
  image_alt_text?: any
  images: Array<{ file: { url: string } }> | any
  id: string
  options: any[]
  quantity: string
  hkd_selling_price?: number
  sku?: string
  rating: number
  product_type?: string
  hkd_compare_at_price: number
  category: string
  oldPrice?: number
  rrp?: any
  origPrice?: number
  slug: string
  tags?: string[]
  review_rating?: number
  price: number
  colorOption?: string[]
  sizeOption?: string[]
  purchaseOptions?: {
    standard: {
      salePrice: number | null
      price: number
      sale: boolean
    }
  }
}

export type reviewFormContentType = {
  label: string
  required?: boolean
  name: string
  inputType?: string
  type: string
  options?: Array<{ name: string; value: string }>
  helperText?: string
  size?: string
  placeholder?: string
}

export type cartType = {
  grandTotal: number
  items: any
  subTotal: number
  price: number
  quantity: number
  options: any[]
  discounts: any[]
  salePrice: number
  slug: string
  tags: string[]
  priceTotal: number
  product: productType
  productId: string
  currency: string
  shipping: { [key: string]: any }
  billing: { [key: string]: any }
  account: { [key: string]: any }
  shipmentTotal: number
  taxTotal: number
  id: string
  discountTotal: number
}

export type useCartType = {
  cart: cartType | null
}

export type itemType = {
  productId: string
  product: productType
  price: number
  quantity: number
}

export type checkoutStageProcess =
  | 'cart'
  | 'complete'
  | 'details'
  | 'payment'
  | 'review'
  | 'shipping'

export type categoryType = {
  name: string
  id: string
  parentId?: string
  slug: string
  images: Array<{
    id: string
    file: {
      url: string
    }
  }>
  meta_description?: string
  topId?: string
  meta_title?: string
}

export type formType = {
  firstName: string
  lastName: string
  email: string
  address1: string
  address2: string
  country: string
  companyName: string
  state: string
  city: string
  zip: string
}

export type categorySlugType = 'categories' | 'shop'

export type airwallexType = {
  isAccessTokenValid: boolean
  accessToken: string | null
  paymentIntentId: string | null
  clientSecret: string | null
  error: any | null
  paymentSuccessful: boolean | null
  tokenExpiryDate: string | null
}

export type paymentDetailsType = {
  request_id: string
  amount: string
  currency: string
  merchant_order_id: string
  order: {
    products: any[]
  }
}

export type paymentStateType = {
  paymentMethod: string | null
  country: string | null
  paymentForm: paymentFormType | null
  userAddress: any
  isShippingFormCompleted: boolean
}

export type paymentFormType = {
  firstName: string
  lastName: string
  email: string
  companyName: string
  country: string
  address1: string
  state: string
  city: string
  zip: string
  address2: string
}

export type productOptions = {
  name: string
  id: string
  values: Array<{ id: string; name: string }>
}

export type productOptionType = Array<{
  name: string
  value: string
}>

export type cartDetailsType = {
  name: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
  card: string
  token: string
}

export interface ModalType {
  onHide: () => void
  show: boolean
}

export type contentType = Array<{
  name: string
  placeholder: string
  type: string
  inputText: string
}>

export type createVboutContentType = {
  email: string
  id: string
  cartId: string
  customerInfo: {
    firstname: string
    lastname: string
  }
}

export type updateVboutCartContentType = createVboutContentType & {
  firstName: string
  lastName: string
  company: string
  country: string
}

export type addCartItemVboutType = {
  email: string
  id: string
  cartId: string
  productId: string
  productName: string
  price: number
  quantity: number
  productImage: string
}

export type createVboutOrderType = {
  cartId: string
  uniqueId: string
  orderId: string
  orderNumber: string
  paymentMethod: string
  grandTotal: string
  subtotal: string
  status: string
  customerInfo: customerInfoType
  billingInfo: vboutInfoType
  shippingInfo: vboutInfoType
}

type customerInfoType = {
  firstname: string
  lastname: string
  email: string
  country: string
}

type vboutInfoType = {
  firstname: string
  lastname: string
  email: string
  address: string
  city: string
  statename: string
  countryname: string
  zipcode: string
}

export type addCategoryViewVboutType = {
  id: string
  categoryId: string
  productName: string
  categoryImage: string
}

export type addProductViewVboutType = {
  id: string
  productId: string
  productName: string
  price: number
  productImage: string
  description: string
  link: string
}

export interface FormStagesType {
  formStages: {
    stage: number
    shippingForm: any | null
  }
}

export type attributeType = {
  name: string
  values: string[]
}

export type filterType = {
  color: string | null
  size: string | null
  price: number
}

export type hitType = {
  name: string
  __queryID: string
  __position: number
  objectID: string
  description?: any | string
  attributes?: any
  meta_title?: string
  content: {
    maxQuantity: number
    productBenefits: Array<{
      icon: string
      text: string
    }>
  }
  vendor?: string
  product_image?: string
  product_images: Array<{ link: string; alt: string }>
  image_alt_text?: any
  images: Array<{
    id: string
    file: {
      url: string
    }
  }>
  id: string
  options: any[]
  quantity: string
  rating: number
  category: string
  oldPrice?: number
  origPrice?: number
  slug: string
  review_rating?: number
  price: number
  colorOption?: string[]
  sizeOption?: string[]
  purchaseOptions?: {
    standard: {
      salePrice: number | null
      price: number
      sale: boolean
    }
  }
}

export interface PaginationProps {
  pagination: Array<{
    count: number
    active: boolean
  }>
}

export type contentLinkType = {
  id: string
  slug: string
  name: string
  images: Array<{
    file: {
      url: string
    }
  }>
}

export interface CartItemProps {
  item: cartType
  removeFromCart: (item: cartType) => void
}

export interface ProductProps {
  product: productType
  forCategory?: boolean
  algoliaEvent?: 'click' | 'filter' | 'search'
  homepage?: boolean
  slider?: boolean
}

export type typeModal =
  | 'AUTH_MODAL'
  | 'AUTHFORM'
  | 'CHECKOUT_NOTIFICATION_MODAL'
  | 'SECURE_CHECKOUT'

export type addCategoryViewType = {
  id: string
  categoryId: string
  categoryName: string
  categoryLink: string
  categoryImage: string
}

export type addProductSearchType = {
  id: string
  email: string
  query: string
}

export type contactInfoType = {
  icon: string
  title: string
  type?: string
  anchor?: string
  group: Array<{ text: string; value?: string; phone?: string }>
}

export type progressStateType = {
  uploaded: number
  total: number
  loading: boolean
}

export type blogFormDataType = {
  dbNode: string
  data: {
    authorName: string
    aboutAuthor: string
  }
}

export type addressType = {
  active: boolean
  id: string
  address1: string
  address2: string
  city: string
  country: string
  firstName: string
  lastName: string
  name: string
  phone: string
  state: string
  zip: string
}
export interface AddressFormProps {
  addressType: 'billing' | 'shipping'
}

export type ShippingRateCardType = {
  currency: string
  courier_id: string
  shipment_charge: number
  fuel_surcharge: number
  courier_name: string
  total_charge: number
  shipment_charge_total: number
  oversized_surcharge: number
  additional_services_surcharge: number
  residential_full_fee: number
  residential_discounted_fee: number
  insurance_fee: number
  remote_area_surcharge: number
  ddp_handling_fee: number
  warehouse_handling_fee: number
  import_duty_charge: number
  sales_tax: number
  provincial_sales_tax: number
  import_tax_charge: number
  estimated_import_tax: number
  import_tax_non_chargeable: number
  estimated_import_duty: number
  minimum_pickup_fee: number
  payment_recipient: string
  tracking_rating: number
  easyship_rating: number
  courier_remarks: string
  full_description: string
}
