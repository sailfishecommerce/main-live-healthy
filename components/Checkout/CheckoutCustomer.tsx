import Breadcrumb from '@/components/Breadcrumb'
import CheckoutForm from '@/components/Checkout/CheckoutForm'
import ReviewOrder from '@/components/Checkout/ReviewOrder'
import breadcrumbContent from '@/json/breadcrumb.json'

export default function CheckoutCustomer() {
  return (
    <>
      <div className="w-full bg-gray-100 mx-auto p-4 pb-8 checkoutcustomer">
        <div className="container flex flex-col mx-auto">
          <Breadcrumb breadcrumbItems={breadcrumbContent?.checkout} />
          <div className="content lg:grid lg:grid-cols-3 lg:gap-5 flex flex-col  w-full">
            <ReviewOrder />
            <CheckoutForm />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .checkoutcustomer {
            min-height: 1000px;
          }
        `}
      </style>
    </>
  )
}
