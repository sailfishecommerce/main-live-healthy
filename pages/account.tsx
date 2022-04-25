import Breadcrumb from '@/components/Breadcrumb'
import Pagetitle from '@/components/Header/page-title'
import OrderHistory from '@/components/Order/OrderHistory'
import AccountDetail from '@/components/Shipping/AccountDetail'
import breadcrumb from '@/json/breadcrumb.json'

export default function Account() {
  return (
    <>
      <Pagetitle title="Account Details" />
      <main className="container mx-auto px-4 md:px-0">
        <Breadcrumb breadcrumbItems={breadcrumb.account} />
        <h1 className="text-2xl font-bold lg:mt-8 mt-2">My Account</h1>
        <OrderHistory />
        <AccountDetail />
      </main>
    </>
  )
}
