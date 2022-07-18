/* eslint-disable no-nested-ternary */
import Image from 'next/image'

import ProductBannerCard from '@/components/Cards/ProductBannerCard'
import LazyLoader from '@/components/Loader/LazyLoader'
import { useMediaQuery } from '@/hooks'
import { useGetProduct } from '@/hooks/useLivehealthyProduct'

export default function ProductBanner() {
  const [data, status] = useGetProduct({
    limit: 3,
    key: 'skinCare',
    query: { product_type: 'Skin Care' },
  })
  const mobileWidth = useMediaQuery('(max-width:768px)')

  const bannerImage = mobileWidth
    ? '/skin-care-small.webp'
    : '/skin-care-banner.webp'

  const imageSize = [
    {
      height: 530,
      width: 900,
    },
    {
      height: 200,
      width: 382,
    },
  ]
  const bannerDimension = mobileWidth ? imageSize[1] : imageSize[0]
  return (
    <LazyLoader height={550} mobileHeight={400}>
      <div className="lg:pt-6 py-4 container mx-auto justify-between px-4 xl:px-0 flex flex-col md:flex-row items-start">
        <div className="banner w-full lg:w-4/6">
          <Image
            src={bannerImage}
            height={bannerDimension.height}
            width={bannerDimension.width}
            alt="skin care"
            layout="responsive"
          />
        </div>
        <div className="product-group mt-4 lg:mt-0 w-full lg:w-2/6 ml-0 lg:ml-4">
          {status === 'error'
            ? 'unable to load products'
            : status === 'loading'
            ? 'loading'
            : data.map((product: any) => (
                <ProductBannerCard
                  key={product.id}
                  color="#24BFCE"
                  className="items-center justify-between"
                  product={product}
                />
              ))}
        </div>
      </div>
    </LazyLoader>
  )
}
