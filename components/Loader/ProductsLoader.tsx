/* eslint-disable react/no-array-index-key */
import { useMemo } from 'react'
import ContentLoader from 'react-content-loader'

import useMediaQuery from '@/hooks/useMediaQuery'

export function ProductLoader(props: any) {
  const loaderStyle = useMemo(() => ({ width: '100%' }), [])

  return (
    <ContentLoader
      animate
      speed={2}
      viewBox="0 0 150 150"
      style={loaderStyle}
      backgroundColor="#e3d9d9"
      foregroundColor="#ada4a4"
      title="loading product..."
      {...props}
    >
      <rect x="0" y="0%" rx="0" ry="0" width="100%" height="50%" />
      <rect x="0%" y="55%" rx="3" ry="3" width="20%" height="5%" />
      <rect x="0" y="63%" rx="0" ry="0" width="100%" height="5%" />
      <rect x="0" y="72%" rx="0" ry="0" width="100%" height="15%" />
    </ContentLoader>
  )
}

export function LineLoader(props: any) {
  const loaderStyle = useMemo(() => ({ width: '100%' }), [])

  return (
    <ContentLoader
      animate
      speed={2}
      viewBox="0 0 25 2"
      style={loaderStyle}
      backgroundColor="#e3d9d9"
      className="mx-2"
      foregroundColor="#ada4a4"
      title="loading ..."
      {...props}
    >
      <rect x="0" y="0px" rx="0" ry="0" width="10" height="1" />
    </ContentLoader>
  )
}

export default function LoadProducts() {
  const mobileWidth = useMediaQuery('(max-width:768px)')

  const mobileStyle = mobileWidth ? 'w-1/2 px-1' : 'w-1/5 px-2'

  const numberOfLoaders = mobileWidth ? 2 : 5

  const productsArray = new Array(numberOfLoaders).fill(0)
  return (
    <div className="container flex flex-wrap px-1">
      {productsArray.map((_, index: number) => (
        <div key={index} className={mobileStyle}>
          <ProductLoader />
        </div>
      ))}
    </div>
  )
}
