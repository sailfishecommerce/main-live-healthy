import CheckoutCustomer from '@/components/Checkout/CheckoutCustomer'
import EmptyCart from '@/components/Checkout/EmptyCart'
import Pagetitle from '@/components/Header/page-title'
import MobileCheckoutView from '@/components/MobileCheckoutView'
import { useCart, useMediaQuery } from '@/hooks'

export default function Checkout() {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  return (
    <>
      <Pagetitle title="Checkout - Thanks for shopping with us" />
      {cart !== null ? (
        <main className="mx-auto bg-light-gray">
          {mobileWidth ? <MobileCheckoutView /> : <CheckoutCustomer />}
        </main>
      ) : (
        <EmptyCart />
      )}
    </>
  )
}
