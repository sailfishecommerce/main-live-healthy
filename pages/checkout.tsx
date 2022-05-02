import CheckoutCustomer from '@/components/Checkout/CheckoutCustomer'
import Pagetitle from '@/components/Header/page-title'
import MobileCheckoutView from '@/components/MobileCheckoutView'
import { useMediaQuery } from '@/hooks'
import { useAppSelector } from '@/hooks/useRedux'

export default function Checkout() {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const { paymentForm } = useAppSelector((state) => state.payment)
  console.log('paymentForm', paymentForm)
  return (
    <>
      <Pagetitle title="Checkout - Thanks for shopping with us" />
      <main className="mx-auto bg-light-gray">
        {mobileWidth ? <MobileCheckoutView /> : <CheckoutCustomer />}
      </main>
    </>
  )
}
