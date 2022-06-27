import PolicyView from '@/components/View/PolicyView'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function ShippingDeliveriesPage() {
  return (
    <CustomercareLayout>
      <PolicyView dbNode="articles/shipping-info/content" />
    </CustomercareLayout>
  )
}
