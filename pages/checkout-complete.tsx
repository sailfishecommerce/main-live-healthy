/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-nested-ternary */
import Link from 'next/link'
import Script from 'next/script'
import { useQuery } from 'react-query'

import useOrder from '@/hooks/useOrder'
import { useAppSelector } from '@/hooks/useRedux'
import Applayout from '@/layouts/app-layout'

export default function CheckoutComplete() {
  const { getLastOrderDetails } = useOrder()
  const { data, status } = useQuery('getLastOrderDetails', getLastOrderDetails)
  const paymentData: any = useAppSelector((state) => state.payment)

  return (
    <Applayout title="Checkout Completed">
      <Script
        crossOrigin="use-credentials"
        id="trustMateInvitationScript"
        strategy="afterInteractive"
      >
        {` 
          TRUST_MATE_USER_NAME = '${paymentData?.submittedOrder?.account.name}';
          TRUST_MATE_USER_EMAIL = '${
            paymentData?.submittedOrder?.account.email
          }';
          TRUST_MATE_ORDER_NUMBER = '${
            paymentData?.submittedOrder?.orderNumber
          }';
          TRUST_MATE_COMPANY_UUID = '9bc41917-fb1a-457f-93e1-92359601ec36';
          TRUSTMATE_PRODUCTS = [${paymentData?.submittedOrder?.products.map(
            (item: any) => `{
              local_id:'${item.productId}',
              priority:'${item.id}',
              name:'${item.product.name}',
              brand:'${item.product.name}',
              product_url:'${`https://livehealthy.hk/products/${item?.product.slug}`}',
              image_url:'${item.product.images[0].file.url}'
            }`
          )}];
        `}
      </Script>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src="https://trustmate.io/api/invitation/script"
      />
      <div className="flex lg:flex-row flex-col mx-auto mb-sm-4 h-96 mt-5">
        <div className="flex items-center bg-gray-50 w-full lg:w-1/2 justify-center mx-auto">
          <div className="card py-3">
            <div className="card-body text-center">
              <h2 className="text-xl font-bold pb-3">
                Thank you for your order!
              </h2>
              <p>
                Your order has been placed and will be processed as soon as
                possible.
              </p>
              <p>
                Make sure you make note of your order number, which is{' '}
                {status === 'error' ? (
                  <span className="font-bold text-red-500">
                    unable to fetch order number
                  </span>
                ) : status === 'loading' ? (
                  <span className="font-bold text-red-500">
                    fetching order number ...
                  </span>
                ) : (
                  <span className="text-green-500 font-bold">
                    {data?.number}
                  </span>
                )}
              </p>
              <p>
                You will be receiving an email shortly with confirmation of your
                order.
              </p>
              <div className="link-row flex items-center mx-auto justify-between my-4 w-2/3">
                <Link passHref href="/collection">
                  <a
                    aria-label="go back shopping"
                    className="hover:bg-green-300 border-2 border-green-300 hover:text-white p-4"
                  >
                    Continue Shopping
                  </a>
                </Link>
                <Link passHref href="/order-tracking">
                  <a
                    aria-label="track order"
                    className="bg-mountain-green text-white p-4"
                  >
                    <i className="ci-location"></i>&nbsp;Track order
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="order-complete bg-gray-200 w-full lg:w-1/2 flex h-full">
          <img
            className="flex items-center m-auto justify-center"
            src="/thank-you-for-order.gif"
            alt="thank you for your order"
            height={200}
            width={200}
          />
        </div>
      </div>
    </Applayout>
  )
}
