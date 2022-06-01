import Script from 'next/script'
import { memo } from 'react'
import type { PropsWithChildren } from 'react'

import { useMediaQuery } from '@/hooks'

interface Props {
  children: JSX.Element
}

function TrustmateWidgetComponent({ children }: PropsWithChildren<Props>) {
  const mobileWidth = useMediaQuery('(max-width:768px)')
  return (
    <>
      {!mobileWidth && (
        <Script
          defer
          src="https://en.trustmate.io/api/widget/4420c1ed-e3a7-47c2-b6a2-2d7386a819da/script"
          strategy="afterInteractive"
          id="trustmate-widget-1-script"
        />
      )}
      {children}
      {!mobileWidth && (
        <div
          className="trustmateWidget"
          id="4420c1ed-e3a7-47c2-b6a2-2d7386a819da"
        ></div>
      )}
      <style jsx>
        {`
          @media (max-width: 768px) {
            .trustmateWidget {
              display: none;
            }
          }
        `}
      </style>
    </>
  )
}

const TrustmateWidget = memo(TrustmateWidgetComponent)

export default TrustmateWidget
