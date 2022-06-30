import useSwell from '@/hooks/useSwell'
import type {
  checkoutData,
  createUserAccountAtCheckoutData,
  userDetailsType,
  userLoginType,
} from '@/typings/hook-types'

export default function useAccount() {
  const { swellInit } = useSwell()

  async function createUserAccount(userDetails: userDetailsType) {
    const { swell } = await swellInit()

    const { firstName, lastName, email, password } = userDetails
    return await swell.account.create({
      firstName,
      lastName,
      email,
      password,
    })
  }

  async function signedUserDetails() {
    const { swell } = await swellInit()

    return await swell.account.get()
  }

  async function loginUser(userLogin: userLoginType) {
    const { email, password } = userLogin
    const { swell } = await swellInit()

    return await swell.account.login(email, password)
  }

  async function logoutUser() {
    const { swell } = await swellInit()

    return await swell.account.logout()
  }

  async function forgotPassword(email: string) {
    const { swell } = await swellInit()

    return await swell.account.recover({
      email,
      reset_url: `https://livehealthy.hk/password-reset?key={reset_key}`,
    })
  }

  async function getUserAccount() {
    const { swell } = await swellInit()

    return await swell.account.get()
  }

  async function recoverPassword(password: string, reset_key: string) {
    const { swell } = await swellInit()

    return await swell.account.recover({
      password,
      reset_key,
    })
  }

  async function createUserAccountAtCheckout(
    data: createUserAccountAtCheckoutData
  ) {
    const { swell } = await swellInit()

    return await swell.account.createAddress({
      name: `${data.firstName} ${data.lastName}`,
      address1: data.address,
      city: data.district,
      state: data.region,
      zip: data.zip,
      country: data.country,
    })
  }

  async function createUserAddresstAtCheckout(data: checkoutData) {
    const { swell } = await swellInit()

    return await swell.account.create({
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
    })
  }

  async function updateUserBillingInfo(
    data: createUserAccountAtCheckoutData,
    token: string
  ) {
    const { swell } = await swellInit()

    return await swell.cart.update({
      billing: {
        name: `${data.firstName} ${data.lastName}`,
        address1: data.address,
        city: data.district,
        state: data.region,
        zip: data.zip,
        country: data.country,
        card: {
          token,
        },
      },
      shipping: {
        name: `${data.firstName} ${data.lastName}`,
        address1: data.address,
        city: data.district,
        state: data.region,
        zip: data.zip,
        country: data.country,
        phone: data.phone,
      },
    })
  }

  async function updateUserShipping(data: createUserAccountAtCheckoutData) {
    const { swell } = await swellInit()

    return await swell.cart.update({
      shipping: {
        name: `${data.firstName} ${data.lastName}`,
        address1: data.address,
        city: data.district,
        state: data.region,
        zip: data.zip,
        country: data.country,
        phone: data.phone,
      },
    })
  }

  async function updateShippingAddressById(addressId: string) {
    const { swell } = await swellInit()

    return await swell.cart.update({
      shipping: {
        account_address_id: addressId,
      },
    })
  }

  async function listUserAddress() {
    const { swell } = await swellInit()

    return await swell.account.listAddresses()
  }

  async function deleteUserAddress(addressId: string) {
    const { swell } = await swellInit()

    return await swell.account.deleteAddress(addressId)
  }

  async function listUserSavedCreditCards() {
    const { swell } = await swellInit()

    return await swell.account.listCards()
  }

  return {
    createUserAccount,
    signedUserDetails,
    loginUser,
    logoutUser,
    deleteUserAddress,
    listUserAddress,
    forgotPassword,
    updateShippingAddressById,
    getUserAccount,
    createUserAccountAtCheckout,
    recoverPassword,
    updateUserShipping,
    createUserAddresstAtCheckout,
    updateUserBillingInfo,
    listUserSavedCreditCards,
  }
}
