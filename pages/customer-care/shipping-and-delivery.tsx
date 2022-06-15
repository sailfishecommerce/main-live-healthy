import PolicyView from '@/components/View/PolicyView'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function ShippingDeliveriesPage() {
  return (
    <CustomercareLayout>
      <PolicyView dbNode="shipping-info" />
    </CustomercareLayout>
  )
}
