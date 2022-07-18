/* eslint-disable no-nested-ternary */
import Image from 'next/image'

import LazyLoader from '@/components/Loader/LazyLoader'
import { useMediaQuery } from '@/hooks'

export default function ShippingBanner() {
  const mobileWidth = useMediaQuery('(max-width:550px)')
  const tabWidth = useMediaQuery('(max-width:768px) and (min-width:600px)')

  const imageSrc = mobileWidth
    ? '/free-shipping-mobile.webp'
    : '/free-shipping.webp'

  const imageSize = [
    {
      height: 280,
      width: 1400,
    },
    {
      height: 335,
      width: 400,
    },
    {
      height: 200,
      width: 700,
    },
  ]
  const imageDimension = mobileWidth
    ? imageSize[1]
    : tabWidth
    ? imageSize[2]
    : imageSize[0]
  return (
    <LazyLoader height={250} mobileHeight={200}>
      <section className="container mb-8 -ml-2 md:ml-0 px-4 xl:px-0 lg:mb-0 flex justify-center lg:mx-auto my-1">
        <div className="w-full">
          <Image
            src={imageSrc}
            alt="free shipping"
            className="flex items-center justify-center mx-auto"
            height={imageDimension.height}
            width={imageDimension.width}
            layout="responsive"
            priority={true}
          />
        </div>
      </section>
    </LazyLoader>
  )
}
