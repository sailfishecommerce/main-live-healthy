import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import CustomercareView from '@/components/View/CustomerCareView'
import useArticleData from '@/hooks/useArticleData'

interface Props {
  dbNode: string
}

export default function PolicyView({ dbNode }: Props) {
  const { databaseData } = useArticleData(dbNode)

  return (
    <>
      {databaseData === null ? (
        <SpinnerRipple />
      ) : (
        databaseData && <CustomercareView pageContent={databaseData?.blocks} />
      )}
    </>
  )
}
