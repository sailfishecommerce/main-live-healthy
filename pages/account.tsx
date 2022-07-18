/* eslint-disable no-nested-ternary */
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useQuery } from 'react-query'

import Breadcrumb from '@/components/Breadcrumb'
import Error404 from '@/components/Error'
import Tabs from '@/components/Tabs'
import { useAccount } from '@/hooks'
import breadcrumb from '@/json/breadcrumb.json'
import Applayout from '@/layouts/app-layout'

const DynamicSpinnerRipple = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SpinnerLoader' */ '@/components/Loader/SpinnerLoader'
    )
)

const DynamicOrderHistory = dynamic(
  () =>
    import(
      /* webpackChunkName: 'OrderHistory' */ '@/components/Order/OrderHistory'
    )
)

const DynamicAccountDetail = dynamic(
  () =>
    import(
      /* webpackChunkName: 'AccountDetail' */ '@/components/Shipping/AccountDetail'
    )
)

export default function Account() {
  const { getUserAccount } = useAccount()
  const { data, status } = useQuery('userDetails', getUserAccount)
  function listUserOrders() {
    return axios.post('/api/list-user-orders', { accountID: data?.id })
  }

  const { data: userOrders, status: orderStatus } = useQuery(
    `listUserOrders-${data?.id}`,
    listUserOrders
  )

  return (
    <>
      <Applayout title="Account Details">
        <section className="container mx-auto px-4 md:px-0">
          <Breadcrumb breadcrumbItems={breadcrumb.account} />

          {status === 'error' ? (
            <Error404 />
          ) : status === 'loading' ? (
            <DynamicSpinnerRipple centerRipple />
          ) : data === null ? (
            <div className="login bg-gray-100 mx-auto flex flex-col py-12 justify-center mb-4 px-4">
              <h1 className="text-center font-bold text-md lg:text-xl mb-4">
                Login / Sign up to access your account details
              </h1>
              <div className="w-full lg:w-1/2 mx-auto flex">
                <Tabs />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold lg:mt-8 mt-2">My Account</h1>
              {orderStatus === 'success' && userOrders.data.length > 1 && (
                <DynamicOrderHistory orders={userOrders.data} />
              )}
              {status === 'success' && (
                <DynamicAccountDetail userDetail={data} />
              )}
            </>
          )}
        </section>
      </Applayout>
    </>
  )
}
