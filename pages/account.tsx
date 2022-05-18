import axios from 'axios'
import { useQuery } from 'react-query'

import Breadcrumb from '@/components/Breadcrumb'
import OrderHistory from '@/components/Order/OrderHistory'
import AccountDetail from '@/components/Shipping/AccountDetail'
import Tabs from '@/components/Tabs'
import { useAccount } from '@/hooks'
import breadcrumb from '@/json/breadcrumb.json'
import Applayout from '@/layouts/app-layout'
import FacebookScript, { FacebookButtonScript } from '@/scripts/facebook-script'

export default function Account() {
  const { getUserAccount } = useAccount()
  const { data, status } = useQuery('userDetails', getUserAccount)
  function listUserOrders() {
    return axios.post('/api/list-user-orders', { accountID: data?.id })
  }
  const { data: userOrders, status: orderStatus } = useQuery(
    'listUserOrders',
    listUserOrders
  )
  return (
    <>
      <FacebookScript />
      <FacebookButtonScript />
      <Applayout title="Account Details">
        <main className="container mx-auto px-4 md:px-0">
          <Breadcrumb breadcrumbItems={breadcrumb.account} />

          {status === 'success' && data === null ? (
            <div className="login bg-gray-100 mx-auto flex flex-col py-12 justify-center mb-4">
              <h1 className="text-center font-bold text-xl mb-4">
                Login / Sign up to access your account details
              </h1>
              <div className="w-full lg:w-1/2 mx-auto flex">
                <Tabs />
              </div>
            </div>
          ) : (
            <>
              {' '}
              <h1 className="text-2xl font-bold lg:mt-8 mt-2">My Account</h1>
              {orderStatus === 'success' && (
                <OrderHistory orders={userOrders.data} />
              )}
              {status === 'success' && <AccountDetail userDetail={data} />}
            </>
          )}
        </main>
      </Applayout>
    </>
  )
}
