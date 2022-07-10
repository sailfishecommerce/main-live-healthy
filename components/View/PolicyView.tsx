import dynamic from 'next/dynamic'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useArticleData from '@/hooks/useArticleData'

interface Props {
  dbNode: string
}

const DynamicCustomercareView = dynamic(
  () =>
    import(
      /* webpackChunkName: 'CustomercareView' */ '@/components/View/CustomercareView'
    )
)

export default function PolicyView({ dbNode }: Props) {
  const { databaseData } = useArticleData(dbNode)

  return (
    <>
      {databaseData === null ? (
        <SpinnerRipple centerRipple />
      ) : (
        databaseData && (
          <DynamicCustomercareView pageContent={databaseData?.blocks} />
        )
      )}
    </>
  )
}
