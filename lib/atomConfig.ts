import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// ui
export const modalAtom = atom(null)
export const slidingTabAtom = atom(null)
export const noticebarAtom = atomWithStorage('noticebar', true)
export const seemoreAtom = atom(null)
export const activeProductSlideAtom = atom(null)
export const appLoadingAtom = atom(false)
export const categoryDropdownAtom = atom(false)
export const selectedCategoryAtom = atom('Beauty')
export const mobileSlideMenuViewAtom = atom('LINK')

// form
export const paymentFormAtom = atom<{ form: any; completed: boolean } | null>(
  null
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