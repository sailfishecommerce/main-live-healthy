import Image from 'next/image'

import { useMediaQuery } from '@/hooks'

export default function HeaderBanner() {
  const mobile = useMediaQuery('(max-width:768px)')
  const imageHeight = mobile ? 30 : 45
  const imageWidth = mobile ? 400 : 1440

  return (
    <div className="w-full">
      <Image
        src="/promo-banner.gif"
        height={imageHeight}
        width={imageWidth}
        alt="store-banner"
        layout="responsive"
      />
    </div>
  )
}
