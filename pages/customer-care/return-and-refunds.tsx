import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import TempCustomercareView from '@/components/View/TempCustomerCareView'
import useArticleData from '@/hooks/useArticleData'
import CustomercareLayout from '@/layouts/customer-care-layout'

export default function ReturnrefundsPage() {
  const { databaseData } = useArticleData('return-and-refunds')

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
