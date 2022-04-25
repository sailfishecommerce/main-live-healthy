/* eslint-disable no-nested-ternary */
import Link from 'next/link'
import Script from 'next/script'
import { useQuery } from 'react-query'

import Pagetitle from '@/components/Header/page-title'
import useOrder from '@/hooks/useOrder'
import { useAppSelector } from '@/hooks/useRedux'

export default function CheckoutComplete() {
  const { getLastOrderDetails } = useOrder()
  const { data, status } = useQuery('getLastOrderDetails', getLastOrderDetails)
  const paymentData: any = useAppSelector((state) => state.payment)

  return (
    <>
      <Pagetitle title="Checkout Completed" />
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
      <div className="container pb-5 mb-sm-4">
        <div className="pt-5">
          <div className="card py-3 mt-sm-3">
            <div className="card-body text-center">
              <h2 className="h4 pb-3">Thank you for your order!</h2>
              <p className="fs-sm mb-2">
                Your order has been placed and will be processed as soon as
                possible.
              </p>
              <p className="fs-sm mb-2">
                Make sure you make note of your order number, which is{' '}
                {status === 'error' ? (
                  <span className="fw-medium">
                    unable to fetch order number
                  </span>
                ) : status === 'loading' ? (
                  <span className="fw-medium">fetching order number ...</span>
                ) : (
                  <span className="fw-medium">{data?.number}</span>
                )}
              </p>
              <p className="fs-sm">
                You will be receiving an email shortly with confirmation of your
                order.
              </p>
              <Link passHref href="/shop">
                <a
                  aria-label="go back shopping"
                  className="btn btn-secondary mt-3 me-3"
                >
                  Go back shopping
                </a>
              </Link>
              <Link passHref href="/order-tracking">
                <a aria-label="track order" className="btn btn-primary mt-3">
                  <i className="ci-location"></i>&nbsp;Track order
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
