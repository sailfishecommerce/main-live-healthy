import CheckoutCustomer from '@/components/Checkout/CheckoutCustomer'
import Pagetitle from '@/components/Header/page-title'
import MobileCheckoutView from '@/components/MobileCheckoutView'
import { useMediaQuery } from '@/hooks'

export default function Checkout() {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  return (
    <>
      <Pagetitle title="Checkout - Thanks for shopping with us" />
      <main className="mx-auto bg-light-gray">
        {mobileWidth ? <MobileCheckoutView /> : <CheckoutCustomer />}
      </main>
    </>
  )
}
