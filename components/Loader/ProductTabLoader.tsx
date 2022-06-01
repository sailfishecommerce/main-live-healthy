/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import ContentLoader from 'react-content-loader'

import useMediaQuery from '@/hooks/useMediaQuery'

export function Loader(props: any) {
  return (
    <ContentLoader
      animate
      speed={2}
      height={150}
      width="100%"
      backgroundColor="#e3d9d9"
      foregroundColor="#ada4a4"
      title="loading product..."
      {...props}
    >
      <rect x="0" y="0" rx="10px" ry="10px" width="100%" height="100%" />
    </ContentLoader>
  )
}

export default function ProductTabLoader() {
  const tabWidth = useMediaQuery('(max-width:768px)')
  const mobileWidth = useMediaQuery('(max-width:500px)')

  const arrayCount = mobileWidth ? 2 : 3

  const loaderArray = new Array(arrayCount).fill(0)
  const mobileStyle = mobileWidth
    ? 'w-1/2 pr-4'
    : tabWidth
    ? 'w-1/2 pr-4'
    : 'w-1/3 pr-4'

  return (
    <div className="flex flex-wrap mt-5 w-full">
      {loaderArray.map((_, index: number) => (
        <div key={index} className={mobileStyle}>
          <Loader />
        </div>
      ))}
    </div>
  )
}
