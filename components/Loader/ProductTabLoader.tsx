/* eslint-disable react/no-array-index-key */
import ContentLoader from 'react-content-loader'

export function ProductLoader(props: any) {
  return (
    <ContentLoader
      animate
      speed={2}
      height={245}
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
  const loaderArray = new Array(2).fill(0)

  return (
    <div className="flex flex-wrap mt-5 w-full">
      {loaderArray.map((_, index: number) => (
        <div key={index} className="w-1/2 pr-4">
          <ProductLoader />
        </div>
      ))}
    </div>
  )
}
