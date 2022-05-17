/* eslint-disable no-nested-ternary */
import Image from 'next/image'

import ProductBannerCard from '@/components/Cards/ProductBannerCard'
import LazyLoader from '@/components/Loader/LazyLoader'
import { useMediaQuery } from '@/hooks'
import useLiveHealthyProduct from '@/hooks/useLivehealthyProduct'

export default function ProductBanner() {
  const [data, status] = useLiveHealthyProduct()
  const getThreeProducts = data?.slice(5, 8)
  const mobileWidth = useMediaQuery('(max-width:768px)')
  const tablet = useMediaQuery('(max-width:1024px)')

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
    {
      height: 650,
    },
    {
      height: 450,
    },
  ]
  const bannerDimension = mobileWidth ? imageSize[1] : imageSize[0]
  const loaderHeight = tablet ? imageSize[3] : imageSize[2]
  return (
    <LazyLoader height={loaderHeight.height} mobileHeight={690}>
      <div className="lg:pt-6 py-4 container mx-auto justify-between px-4 xl:px-0 flex flex-col md:flex-row items-start h-1/2">
        <div className="banner w-full md:w-4/5">
          <Image
            src={bannerImage}
            height={bannerDimension.height}
            width={bannerDimension.width}
            alt="skin care"
            layout="responsive"
          />
        </div>
        <div className="product-group w-full md:w-2/6 ml-0 md:ml-4">
          {status === 'error'
            ? 'unable to load products'
            : status === 'loading'
            ? 'loading'
            : data &&
              getThreeProducts.map((product: any) => (
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
