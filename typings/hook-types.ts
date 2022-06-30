// useAccount types

export type checkoutData = {
  firstName: string
  lastName: string
  email?: string
}

export type userLoginType = {
  email: string
  password: string
}

export type userDetailsType = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type createUserAccountAtCheckoutData = checkoutData & {
  address1: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
}
