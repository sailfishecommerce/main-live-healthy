import type { PropsWithChildren } from 'react'
import LazyLoad from 'react-lazyload'

import { useMediaQuery } from '@/hooks'

interface Props {
  height: number
  mobileHeight: number
}

export default function LazyLoader({
  height,
  children,
  mobileHeight,
}: PropsWithChildren<Props>) {
  const mobileDevice = useMediaQuery('(max-width:768px)')
  const componentHeight = mobileDevice ? mobileHeight : height
  return (
    <>
      <LazyLoad once height={componentHeight} offset={100}>
        {children}
      </LazyLoad>
    </>
  )
}
