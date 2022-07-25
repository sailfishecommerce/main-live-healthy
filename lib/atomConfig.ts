import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import type {
  appModalAtomType,
  authAtomType,
  checkoutFormType,
  mobileViewAtomType,
  selectedVendorAtomType,
  socailAuthDetailsType,
  submitOrderAtomType,
} from '@/typings/atomtype'
import type { FormInputsProps } from '@/typings/input-type'
import type { blogFormDataType } from '@/typings/types'

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

// admin-auth
export const adminAuthAtom = atomWithStorage<any>('adminAuth', null)

// admin-invoice
export const loadingInvoiceAtom = atom(false)
export const paymentInvoiceAtom = atom([])

// ProductShowcase
export const selectedVendorAtom = atom<selectedVendorAtomType>(null)

// ProductTabSliderDropdown
export const productRatingAtom = atom(3)

// checkout form
export const shippingformAtom = atom<FormInputsProps | null>(null)

// airwallex paymentArray
export const airwallexAdminPaymentAtom = atomWithStorage<any>(
  'airwallexAdminPaymentAtom',
  []
)

export type colorType = Array<{
  colorCode: string
  colorKey: string
  colorName: string
}>

// edit color
export const siteColorsAtom = atom<colorType>([])

// algolia query search
export const algoliaQuerySearchStatus = atom(false)

// blog author
export const blogAuthorFormAtom = atom<blogFormDataType>({
  dbNode: 'articles/blog/blog-author',
  data: {
    authorName: '',
    aboutAuthor: '',
  },
})
// cookie consent atom
export const cookieConsentAtom = atomWithStorage('showCookieNotification', true)

// save shipping address
export const checkoutFormAtom = atom<checkoutFormType>({
  shipping: {
    form: null,
  },
  billing: {
    form: null,
  },
})

export const watchCheckoutFormAtom = atom<string[]>([])

export const reloadPageAtom = atomWithStorage('reloadPageAtom', false)

export const checkoutAddressAtom = atomWithStorage<any>(
  'checkoutAddressAtom',
  null
)

export const courierAtom = atomWithStorage<string | null>('courier', null)
