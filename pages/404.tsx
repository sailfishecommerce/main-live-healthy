import dynamic from 'next/dynamic'

import Applayout from '@/layouts/app-layout'

const DynamicError404 = dynamic(
  () => import(/* webpackChunkName: 'Error' */ '@/components/Error')
)

export default function Error404Page() {
  return (
    <Applayout title="Error page">
      <DynamicError404 />
    </Applayout>
  )
}
