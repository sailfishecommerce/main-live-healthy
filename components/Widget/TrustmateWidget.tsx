import Script from 'next/script'
import { memo } from 'react'
import type { PropsWithChildren } from 'react'

interface Props {
  children: JSX.Element
}

function TrustmateWidgetComponent({ children }: PropsWithChildren<Props>) {
  return (
    <>
      <Script
        defer
        src="https://en.trustmate.io/api/widget/4420c1ed-e3a7-47c2-b6a2-2d7386a819da/script"
        strategy="lazyOnload"
        id="trustmate-widget-1-script"
      />
      {children}
      <div id="4420c1ed-e3a7-47c2-b6a2-2d7386a819da"></div>
    </>
  )
}

const TrustmateWidget = memo(TrustmateWidgetComponent)

export default TrustmateWidget
