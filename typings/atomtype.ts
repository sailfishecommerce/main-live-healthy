import type { typeModal } from '@/typings/types'

export type appModalAtomType = {
  active?: boolean
  type: typeModal | null
  data?: string | null
}

export type mobileViewAtomType = {
  mobileMenu: boolean
  showMobileSearch: boolean
}

export type paymentFormAtomType = {
  form: {
    firstName: string
    lastName: string
    email: string
    country: string
    address: string
    region: string
    district: string
    zip: string
    phone: string
  }
  completed: boolean
}

export type submitOrderAtomType = {
  account: null
  orderNumber: null
  products: null
} | null

export type socailAuthDetailsType = {
  user: string | null
  token: string | null
  error: string | null
  email: string | null
  errorMessage: string | null
  credential: string | null
  loggedIn: boolean
  socialLoginMethod: 'facebook' | 'google' | null
}

export type authAtomType = {
  loading: boolean | null
  authorized: any | null
  userDetail: any | null
  error: boolean | null
} | null

export type selectedVendorAtomType = {
  vendor: string
  index: number
} | null
