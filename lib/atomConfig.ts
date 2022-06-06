import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import type {
  appModalAtomType,
  authAtomType,
  mobileViewAtomType,
  paymentFormAtomType,
  selectedVendorAtomType,
  socailAuthDetailsType,
  submitOrderAtomType,
} from '@/typings/atomtype'

// ui-state
export const appModalAtom = atom<appModalAtomType>({
  active: false,
  type: null,
  data: null,
})

export const modalAtom = atom(null)

export const slidingTabAtom = atom(null)

export const noticebarAtom = atomWithStorage('noticebar', true)

export const seemoreAtom = atom(null)

export const activeProductSlideAtom = atom(null)

export const appLoadingAtom = atom(false)

export const categoryDropdownAtom = atom(false)

export const selectedCategoryAtom = atom('Beauty')

export const mobileSlideMenuViewAtom = atom('LINK')

export const mobileViewAtom = atom<mobileViewAtomType>({
  mobileMenu: false,
  showMobileSearch: false,
})
// end of ui-state

// form
export const paymentFormAtom = atomWithStorage<paymentFormAtomType>(
  'paymentForm',
  {
    form: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      address: '',
      region: '',
      district: '',
      zip: '',
      phone: '',
    },
    completed: false,
  }
)
export const completeOrderAtom = atom(false)
export const countryAtom = atom<{ country: string } | null>(null)
export const userAddressAtom = atom(null)

// airwallex
export const airwallexAtom = atom<{
  clientSecret: string | null
  paymentIntentId: string | null
}>({
  clientSecret: null,
  paymentIntentId: null,
})

// order
export const sendProductReviewAtom = atom<boolean | null>(null)
export const submitOrderAtom = atom<submitOrderAtomType>(null)

// auth
export const authAtom = atom<authAtomType>(null)

export const socailAuthDetailsAtom = atomWithStorage<socailAuthDetailsType>(
  'socialAuth',
  {
    user: null,
    token: null,
    error: null,
    email: null,
    errorMessage: null,
    credential: null,
    loggedIn: false,
    socialLoginMethod: null,
  }
)
export const logsAtom = atomWithStorage('logs', null)

// admin-auth
export const adminAuthAtom = atomWithStorage<any>('adminAuth', null)

// admin-invoice
export const adminInvoiceAtom = atom(null)
export const selectedInvoiceAtom = atom<{
  selected: number[]
  selectAll: boolean
  type: 'body' | 'head' | null
}>({
  selected: [],
  selectAll: false,
  type: null,
})
export const deletedIndexAtom = atom<number[]>([])
export const allIndexAtom = atom<number[]>([])
export const loadingInvoiceAtom = atom(false)
export const invoiceProductsAtom = atom<any>([])

// ProductShowcase
export const selectedVendorAtom = atom<selectedVendorAtomType>(null)

// ProductTabSliderDropdown
export const productRatingAtom = atom(3)

// checkout form
export const submitCheckoutFormAtom = atom(false)
