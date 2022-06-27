import PolicyView from '@/components/View/PolicyView'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function OrderTrackingPage() {
  return (
    <CustomercareLayout>
      <PolicyView dbNode="articles/order-tracking/content" />
    </CustomercareLayout>
  )
}
