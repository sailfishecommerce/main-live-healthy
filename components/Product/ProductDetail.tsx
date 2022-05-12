import { useAtom } from 'jotai'
import Link from 'next/link'
import { useEffect } from 'react'

import PaymentMethodView from '@/components/Payment/PaymentMethodView'
import ProductPriceView from '@/components/Product/ProductPriceView'
import SeeMoreProductInfo from '@/components/Product/SeeMoreProductInfo'
import CustomerReview from '@/components/Reviews/CustomerReview'
import useSlidingTab from '@/hooks/useSlidingTab'
import { activeProductSlideAtom, seemoreAtom } from '@/lib/atomConfig'
import type { seemoreType } from '@/lib/atomConfigType'

export default function ProductDetail({ product }: any) {
  const [, setSeeMoreState]: any = useAtom<seemoreType>(seemoreAtom)
  const { updateSlideTab } = useSlidingTab()

  const [activeProductSlide, setActiveProductSlide]: any = useAtom<any>(
    activeProductSlideAtom
  )

  useEffect(() => {
    if (activeProductSlide === null) {
      setActiveProductSlide(product)
    }
  }, [])

  function setSeeMoreHandler(infoType: seemoreType) {
    updateSlideTab('SLIDING-INFO')
    setSeeMoreState(infoType)
  }

  const productVendorLink = product?.vendor?.includes(' ')
    ? `/search/${product.vendor}`
    : `/collection/${product.vendor}`
  return (
    <div className="lg:w-1/2 w-full flex flex-col justify-start">
      <h3 className="lg:text-2xl text-lg font-bold">{product.name}</h3>
      <p>
        By{' '}
        <Link passHref href={productVendorLink}>
          <a className="text-green-500">{product.vendor}</a>
        </Link>
      </p>
      <CustomerReview
        reviews={product?.review_rating}
        ratings={product?.rating}
      />
      <ProductPriceView product={product} />
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
