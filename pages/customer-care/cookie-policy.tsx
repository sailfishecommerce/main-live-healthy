import PolicyView from '@/components/View/PolicyView'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function CookiePolicy() {
  return (
    <CustomercareLayout>
      <PolicyView dbNode="cookie-policy" />
    </CustomercareLayout>
  )
}
