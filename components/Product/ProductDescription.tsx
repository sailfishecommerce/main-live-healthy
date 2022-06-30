import type { productType } from '@/typings/types'

interface Props {
  product: productType
}

export default function ProductDescription({ product }: Props) {
  return (
    <div className="w-11/12 md:w-4/5 mx-auto md:container  mt-4 border-2 border-gray-200 rounded-lg p-4 md:p-10 shadow-lg">
      <div className="w-full md:mx-4 mx-1 lg:mx-0">
        <h2 className="text-xl mb-0 mb-1 font-bold">Product description</h2>
        <h6 className="text-base mb-0">{product.name}</h6>
        <div
          className="productInfo"
          dangerouslySetInnerHTML={{
            __html: product.description,
          }}
        />
      </div>
    </div>
  )
}
