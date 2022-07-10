import dynamic from 'next/dynamic'

import OrderTrackingBanner from '@/components/Banners/OrderTrackingBanner'
import Applayout from '@/layouts/app-layout'

const DynamicOrderTrackingView = dynamic(
  () =>
    import(
      /* webpackChunkName: 'OrderTrackingView' */ '@/components/View/OrderTrackingView'
    )
)

export default function OrderTracking() {
  return (
    <Applayout title="Track your order">
      <OrderTrackingBanner />
      <DynamicOrderTrackingView />
    </Applayout>
  )
}
