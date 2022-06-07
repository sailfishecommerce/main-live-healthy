import CustomercareView from '@/components/View/CustomercareView'
import useArticleData from '@/hooks/useArticleData'
import JsonContent from '@/json/customer-care.json'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function CookiePolicy() {
  const pageContent = JsonContent.content[0]
  const { loading, databaseData } = useArticleData()

  console.log('databaseData', databaseData)
  console.log('loading', loading)

  return (
    <CustomercareLayout>
      <CustomercareView pageContent={pageContent} />
    </CustomercareLayout>
  )
}
