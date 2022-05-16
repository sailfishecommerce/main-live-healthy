import dynamic from 'next/dynamic'

import EmptyCart from '@/components/Checkout/EmptyCart'
import { useCart, useMediaQuery } from '@/hooks'
import Applayout from '@/layouts/app-layout'
import VboutScript from '@/lib/vbout-script'

const CheckoutCustomer = dynamic(
  () =>
    import(
      /* webpackChunkName: 'CheckoutCustomer' */ '@/components/Checkout/CheckoutCustomer'
    )
)

const MobileCheckoutView = dynamic(
  () =>
    import(
      /* webpackChunkName: 'CheckoutCustomer' */ '@/components/MobileCheckoutView'
    )
)

export default function Checkout() {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { useCartData } = useCart()
  const { data: cart } = useCartData()

  return (
    <Applayout title="Checkout - Thanks for shopping with us">
      <VboutScript />
      {cart !== null && cart?.items?.length > 0 ? (
        <main className="mx-auto bg-light-gray">
          {mobileWidth ? <MobileCheckoutView /> : <CheckoutCustomer />}
        </main>
      ) : (
        <EmptyCart />
      )}
    </Applayout>
  )
}
