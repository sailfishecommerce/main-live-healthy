import dynamic from 'next/dynamic'

import Breadcrumb from '@/components/Breadcrumb'
import breadcrumbContent from '@/json/breadcrumb.json'

const CheckoutForm = dynamic(
  () =>
    import(
      /* webpackChunkName: 'CheckoutForm' */ '@/components/Checkout/CheckoutForm'
    )
)

const ReviewOrder = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ReviewOrder' */ '@/components/Checkout/ReviewOrder'
    )
)

export default function CheckoutCustomer() {
  return (
    <div className="w-full bg-gray-100 mx-auto p-4 pb-8">
      <div className="container flex flex-col mx-auto">
        <Breadcrumb breadcrumbItems={breadcrumbContent?.checkout} />
        <div className="content lg:grid lg:grid-cols-3 lg:gap-5 flex flex-col  w-full">
          <ReviewOrder />
          <CheckoutForm />
        </div>
      </div>
    </div>
  )
}
