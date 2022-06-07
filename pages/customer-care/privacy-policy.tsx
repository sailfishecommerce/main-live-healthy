import CustomercareView from '@/components/View/CustomercareView'
import useArticleData from '@/hooks/useArticleData'
import JsonContent from '@/json/customer-care.json'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function PrivacyPolicyPage() {
  const pageContent = JsonContent.content[1]
  const { loading, databaseData } = useArticleData()

  console.log('databaseData', databaseData)
  console.log('loading', loading)

  return (
    <CustomercareLayout>
      <CustomercareView pageContent={pageContent} />
    </CustomercareLayout>
  )
}
