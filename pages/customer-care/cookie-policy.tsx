import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import TempCustomercareView from '@/components/View/TempCustomerCareView'
import useArticleData from '@/hooks/useArticleData'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function CookiePolicy() {
  const { databaseData } = useArticleData('cookie-policy')

  return (
    <CustomercareLayout>
      {databaseData === null ? (
        <SpinnerRipple />
      ) : (
        databaseData && (
          <TempCustomercareView pageContent={databaseData?.blocks} />
        )
      )}
    </CustomercareLayout>
  )
}
