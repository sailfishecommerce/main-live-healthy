import { useMediaQuery } from '@/hooks'

export default function HeaderBanner() {
  const mobile = useMediaQuery('(max-width:700px)')

  const videoSrc = !mobile ? '/promo-banner.mp4' : '/mobile-promo-banner.mp4'

  return (
    <>
      <div className="w-full headerBanner">
        <video autoPlay loop muted playsInline width="100%" height="30px">
          <source src={videoSrc} type="video/webm" />
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
      <style jsx>
        {`
          .headerBanner {
            height: 82px;
          }
          @media (max-width: 770px) and (min-width: 460px) {
            .headerBanner {
              height: 32px;
            }
          }
          @media (max-width: 460px) and (min-width: 370px) {
            .headerBanner {
              height: 45px;
            }
          }
          @media (max-width: 375px) and (min-width: 330px) {
            .headerBanner {
              height: 38px;
            }
          }
          @media (max-width: 330px) {
            .headerBanner {
              height: 35px;
            }
          }
          @media (max-width: 1100px) and (min-width: 770px) {
            .headerBanner {
              height: 40px;
            }
          }
        `}
      </style>
    </>
  )
}
