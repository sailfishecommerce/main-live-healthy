import CustomercareView from '@/components/View/CustomercareView'
import JsonContent from '@/json/customer-care.json'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function PrivacyPolicyPage() {
  const pageContent = JsonContent.content[1]

  return (
    <CustomercareLayout>
      <CustomercareView pageContent={pageContent} />
    </CustomercareLayout>
  )
}
