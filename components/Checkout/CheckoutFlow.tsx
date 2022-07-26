/* eslint-disable no-nested-ternary */
import dynamic from 'next/dynamic'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import { useCart, useMediaQuery } from '@/hooks'

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

interface Props {
  checkoutId: any
}

export default function CheckoutFlow({ checkoutId }: Props) {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { useRecoverCartData } = useCart()
  const { data: recoveredCart, status } = useRecoverCartData(checkoutId)

  return (
    <>
      {status === 'error' ? (
        <EmptyCart />
      ) : status === 'loading' ? (
        <SpinnerRipple centerRipple />
      ) : recoveredCart === null ||
        recoveredCart?.items?.length === 0 ||
        recoveredCart?.items === undefined ? (
        <EmptyCart />
      ) : (
        <div className="mx-auto bg-light-gray">
          {mobileWidth ? <MobileCheckoutView /> : <CheckoutCustomer />}
        </div>
      )}
    </>
  )
}
