import CustomercareView from '@/components/View/CustomercareView'
import JsonContent from '@/json/customer-care.json'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function CookiePolicy() {
  const pageContent = JsonContent.content[0]
  return (
    <CustomercareLayout>
      <CustomercareView pageContent={pageContent} />
    </CustomercareLayout>
  )
}
