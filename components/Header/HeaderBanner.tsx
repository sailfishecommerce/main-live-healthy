import { useMediaQuery } from '@/hooks'

export default function HeaderBanner() {
  const mobile = useMediaQuery('(max-width:700px)')

  const videoSrc = !mobile ? '/promo-banner.mp4' : '/mobile-promo-banner.mp4'

  return (
    <div className="w-full">
      <video autoPlay loop muted playsInline width="100%">
        <source src={videoSrc} type="video/webm" />
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  )
}
