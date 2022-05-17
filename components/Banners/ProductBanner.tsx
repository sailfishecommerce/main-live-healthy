/* eslint-disable no-nested-ternary */
import Image from 'next/image'

import ProductBannerCard from '@/components/Cards/ProductBannerCard'
import { useMediaQuery } from '@/hooks'
import useLiveHealthyProduct from '@/hooks/useLivehealthyProduct'

export default function ProductBanner() {
  const [data, status] = useLiveHealthyProduct()
  const getThreeProducts = data?.slice(5, 8)
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
    {
      height: 700,
    },
    {
      height: 450,
    },
  ]
  const bannerDimension = mobileWidth ? imageSize[1] : imageSize[0]
  return (
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
      <div className="product-group mt-4 md:mt-0 w-full lg:w-2/6 ml-0 md:ml-4">
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
  )
}
