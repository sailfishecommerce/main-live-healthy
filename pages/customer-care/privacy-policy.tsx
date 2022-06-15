import PolicyView from '@/components/View/PolicyView'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function PrivacyPolicyPage() {
  return (
    <CustomercareLayout>
      <PolicyView dbNode="privacy-and-policy" />
    </CustomercareLayout>
  )
}
