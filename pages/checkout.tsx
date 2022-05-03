import CheckoutCustomer from '@/components/Checkout/CheckoutCustomer'
import EmptyCart from '@/components/Checkout/EmptyCart'
import MobileCheckoutView from '@/components/MobileCheckoutView'
import { useCart, useMediaQuery } from '@/hooks'
import Applayout from '@/layouts/app-layout'

export default function Checkout() {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  return (
    <Applayout title="Checkout - Thanks for shopping with us">
      {cart !== null ? (
        <main className="mx-auto bg-light-gray">
          {mobileWidth ? <MobileCheckoutView /> : <CheckoutCustomer />}
        </main>
      ) : (
        <EmptyCart />
      )}
    </Applayout>
  )
}
