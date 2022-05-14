import type { PropsWithChildren } from 'react'
import LazyLoad from 'react-lazy-load'

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
      <LazyLoad height={componentHeight} offsetVertical={50}>
        {children}
      </LazyLoad>
    </>
  )
}
