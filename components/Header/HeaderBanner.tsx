import { useMediaQuery } from '@/hooks'

export default function HeaderBanner() {
  const mobile = useMediaQuery('(max-width:700px)')

  const videoSrc = !mobile ? '/promo-banner.mp4' : '/mobile-promo-banner.mp4'

  return (
    <>
      <div className="w-full headerBanner">
        <video autoPlay loop muted playsInline width="100%" height="30">
          <source src={videoSrc} type="video/webm" />
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
      <style jsx>
        {`
          .headerBanner {
            height: 80px;
          }
          @media (max-width: 1440px) {
            .headerBanner {
              height: 61px;
            }
          }
          @media (max-width: 768px) {
            .headerBanner {
              height: 40px;
            }
          }
        `}
      </style>
    </>
  )
}
