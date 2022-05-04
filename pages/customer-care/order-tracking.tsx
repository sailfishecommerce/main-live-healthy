import CustomercareView from '@/components/View/CustomercareView'
import JsonContent from '@/json/customer-care.json'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function OrderTrackingPage() {
  const pageContent = JsonContent.content[5]
  return (
    <CustomercareLayout>
      <CustomercareView pageContent={pageContent} />
    </CustomercareLayout>
  )
}
