import Image from 'next/image'

import { useMediaQuery } from '@/hooks'

export default function HeaderBanner() {
  const mobile = useMediaQuery('(max-width:768px)')
  const imageHeight = mobile ? 60 : 45
  const imageWidth = mobile ? 450 : 1440

  const imageSrc = mobile ? '/mobile-promo-banner-gif.gif' : '/promo-banner.gif'

  return (
    <div className="w-full">
      <Image
        src={imageSrc}
        height={imageHeight}
        width={imageWidth}
        alt="store-banner"
        layout="responsive"
      />
    </div>
  )
}
