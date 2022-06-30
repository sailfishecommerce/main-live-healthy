/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'

import PaymentMethodView from '@/components/Payment/PaymentMethodView'
import SeeMoreProductInfo from '@/components/Product/SeeMoreProductInfo'
import useSlidingTab from '@/hooks/useSlidingTab'
import { activeProductSlideAtom, seemoreAtom } from '@/lib/atomConfig'
import type { productType } from '@/typings'
import type { seemoreType } from '@/typings/atomtype'

interface Props {
  product: productType
}

export default function ProductDetail({
  product,
  children,
}: PropsWithChildren<Props>) {
  const [seeMore, setSeeMoreState]: any = useAtom<seemoreType>(seemoreAtom)
  const { updateSlideTab } = useSlidingTab()

  const [, setActiveProductSlide]: any = useAtom<any>(activeProductSlideAtom)

  useEffect(() => {
    setActiveProductSlide(product)
  }, [seeMore])

  function setSeeMoreHandler(infoType: seemoreType) {
    updateSlideTab('SLIDING-INFO')
    setSeeMoreState(infoType)
  }

  return (
    <div className="lg:w-1/2 w-full flex flex-col justify-start">
      {children}

      <SeeMoreProductInfo
        title="Product Information"
        onClick={() => setSeeMoreHandler('Product Information')}
      />
      <SeeMoreProductInfo
        title="Storage Instructions"
        onClick={() => setSeeMoreHandler('STORAGE INSTUCTIONS')}
      />
      <SeeMoreProductInfo
        title="Directions"
        onClick={() => setSeeMoreHandler('Directions')}
      />
      <hr className="my-4 border border-gray-100" />
      <PaymentMethodView />
    </div>
  )
}
