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
      {/* <Script
        defer
        src="https://en.trustmate.io/api/widget/01739a85-4698-4d4c-90d5-876048fba847/script"
        strategy="lazyOnload"
        id="trustmate-widget-2-script"
      /> */}
      {children}
      <div id="4420c1ed-e3a7-47c2-b6a2-2d7386a819da"></div>
      {/* <div id="01739a85-4698-4d4c-90d5-876048fba847"></div> */}
    </>
  )
}

const TrustmateWidget = memo(TrustmateWidgetComponent)

export default TrustmateWidget
