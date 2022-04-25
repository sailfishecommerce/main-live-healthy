import dynamic from 'next/dynamic'

import CheckoutWelcomeBanner from '@/components/Banners/CheckoutWelcomeBanner'
import CheckoutForm from '@/components/Form/CheckoutForm'
import Pagetitle from '@/components/Header/page-title'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useCart from '@/hooks/useCart'
import useMediaQuery from '@/hooks/useMediaQuery'

const CheckoutSidebar = dynamic(
  () =>
    import(
      /* webpackChunkName: 'common' */ '@/components/Sidebar/CheckoutSidebar'
    )
)

export default function Checkout() {
  const { useCartData } = useCart()
  const { data: cart } = useCartData()
  const tabWidth = useMediaQuery('(max-width:768px)')

  return (
    <>
      <Pagetitle title="Checkout your order" />
      <div className="container checkout-page-content flex mx-auto">
        <div className="w-full tablet:w-2/3 flex flex-col bg-white -mt-24 p-4 rounded-lg">
          <CheckoutWelcomeBanner />
          <CheckoutForm />
        </div>
        {!tabWidth && cart ? (
          <CheckoutSidebar cart={cart} />
        ) : (
          !tabWidth && (
            <div className="loader flex w-1/3 justify-center m-auto">
              <SpinnerRipple />
            </div>
          )
        )}
      </div>
      <style jsx>{`
        .checkout-page-content {
          min-height: 500px;
        }
      `}</style>
    </>
  )
}

// Checkout.whyDidYouRender = true;
