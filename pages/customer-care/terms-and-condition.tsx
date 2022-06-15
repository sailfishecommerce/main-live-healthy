import PolicyView from '@/components/View/PolicyView'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function TermsconditionPage() {
  return (
    <CustomercareLayout>
      <PolicyView dbNode="terms-and-condition" />
    </CustomercareLayout>
  )
}
