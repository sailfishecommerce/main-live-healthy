import { createElement, loadAirwallex } from 'airwallex-payment-elements'
import type { ElementType } from 'airwallex-payment-elements'
import jwtDecode from 'jwt-decode'

export function isTokenValid(tokenExpiryDate: string | null) {
  if (tokenExpiryDate) {
    const formatTokenExpiryDate = new Date(tokenExpiryDate)
    const currentDate = new Date()
    const isTokenNowValid = formatTokenExpiryDate > currentDate
    return isTokenNowValid
  }
  return false
}

type decodeType = {
  iat: number
  exp: number
}

export function decodeAirwallexClientSecretToken(
  clientSecret: any | string
): decodeType {
  const decodeClientSecret: decodeType = jwtDecode(clientSecret)
  //
  return decodeClientSecret
}

export function loadAirwallexUi() {
  loadAirwallex({
    env: 'demo',
    origin: window.location.origin,
    fonts: [
      {
        src: 'https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2',
        family: 'AxLLCircular',
        weight: 400,
      },
    ],
  }).then(() => {
    return createElement('card' as ElementType, {
      authFormContainer: 'authFormContainer',
    })?.mount('airwallexCard')
  })
}
