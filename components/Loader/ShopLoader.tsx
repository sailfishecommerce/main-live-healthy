/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import { useMemo } from 'react'
import ContentLoader from 'react-content-loader'

import useMediaQuery from '@/hooks/useMediaQuery'

export function Loader(props: any) {
  const loaderStyle = useMemo(() => ({ width: '100%' }), [])

  return (
    <ContentLoader
      animate
      speed={2}
      viewBox="0 0 250 250"
      style={loaderStyle}
      backgroundColor="#e3d9d9"
      foregroundColor="#ada4a4"
      title="loading product..."
      {...props}
    >
      <rect x="0" y="0%" rx="5px" ry="5px" width="100%" height="90%" />
    </ContentLoader>
  )
}

export default function ShopLoader() {
  const loaderArray = new Array(9).fill(0)
  const tabWidth = useMediaQuery('(max-width:768px)')
  const mobileWidth = useMediaQuery('(max-width:500px)')

  const mobileStyle = mobileWidth
    ? 'w-1/2 px-2'
    : tabWidth
    ? 'w-1/2 px-2'
    : 'w-1/3 px-2'

  return (
    <div className="flex flex-wrap mt-5 w-full px-2 md:pl-6">
      {loaderArray.map((_, index: number) => (
        <div key={index} className={mobileStyle}>
          <Loader />
        </div>
      ))}
    </div>
  )
}
