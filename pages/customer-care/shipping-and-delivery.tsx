/* eslint-disable no-console */
import CustomercareView from '@/components/View/CustomercareView'
import useArticleData from '@/hooks/useArticleData'
import JsonContent from '@/json/customer-care.json'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function ShippingDeliveriesPage() {
  const pageContent = JsonContent.content[3]
  const { loading, databaseData } = useArticleData('shipping-info')

  console.log('ShippingDeliveriesPage-databaseData', databaseData)

  return (
    <CustomercareLayout>
      <CustomercareView pageContent={pageContent} />
    </CustomercareLayout>
  )
}
 