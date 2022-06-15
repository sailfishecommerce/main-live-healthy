/* eslint-disable no-console */

import CustomercareView from '@/components/View/CustomercareView'
import useArticleData from '@/hooks/useArticleData'
import JsonContent from '@/json/customer-care.json'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function ReturnrefundsPage() {
  const pageContent = JsonContent.content[4]
  const { loading, databaseData } = useArticleData('return-and-refunds')

  console.log('databaseData', databaseData)
  console.log('loading', loading)

  return (
    <CustomercareLayout>
      <CustomercareView pageContent={pageContent} />
    </CustomercareLayout>
  )
}
