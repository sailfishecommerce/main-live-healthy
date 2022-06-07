/* eslint-disable no-nested-ternary */
import dynamic from 'next/dynamic'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import { useCart, useMediaQuery } from '@/hooks'
import Applayout from '@/layouts/app-layout'

const CheckoutCustomer = dynamic(
  () =>
    import(
      /* webpackChunkName: 'CheckoutCustomer' */ '@/components/Checkout/CheckoutCustomer'
    ),
  { ssr: false }
)

const MobileCheckoutView = dynamic(
  () =>
    import(
      /* webpackChunkName: 'CheckoutCustomer' */ '@/components/MobileCheckoutView'
    ),
  { ssr: false }
)

const EmptyCart = dynamic(
  () =>
    import(
      /* webpackChunkName: 'EmptyCart' */ '@/components/Checkout/EmptyCart'
    )
)

export default function Checkout() {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { useCartData } = useCart()
  const { data: cart, status } = useCartData()

  return (
    <Applayout title="Checkout - Thanks for shopping with us">
      {status === 'error' ? (
        <EmptyCart />
      ) : status === 'loading' ? (
        <SpinnerRipple centerRipple />
      ) : cart === null ||
        cart?.items?.length === 0 ||
        cart?.items === undefined ? (
        <EmptyCart />
      ) : (
        <main className="mx-auto bg-light-gray pb-12">
          {mobileWidth ? <MobileCheckoutView /> : <CheckoutCustomer />}
        </main>
      )}
    </Applayout>
  )
}
