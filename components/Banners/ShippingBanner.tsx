import Image from 'next/image'

import { useMediaQuery } from '@/hooks'

export default function ShippingBanner() {
  const mobileWidth = useMediaQuery('(max-width:768px)')
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
  ]
  const imageDimension = mobileWidth ? imageSize[1] : imageSize[0]
  return (
    <section className="container -ml-2 mx-auto -mt-2 md:-mt-16 mb-6 md:mb-8 md:px-0 px-4">
      <Image
        src={imageSrc}
        alt="free shipping"
        className="flex items-center justify-center mx-auto"
        height={imageDimension.height}
        width={imageDimension.width}
        layout="responsive"
      />
    </section>
  )
}
