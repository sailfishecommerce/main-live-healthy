import CheckoutCustomer from '@/components/Checkout'
import Pagetitle from '@/components/Header/page-title'

export default function Checkout() {
  return (
    <>
      <Pagetitle title="Checkout - Thanks for shopping with us" />
      <main className="mx-auto bg-light-gray">
        <CheckoutCustomer />
      </main>
    </>
  )
}
