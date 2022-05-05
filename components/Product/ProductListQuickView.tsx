/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { BsFillEyeFill } from 'react-icons/bs'

import ProductListForm from '@/components/Form/ProductListForm'
import useEvent from '@/hooks/useEvent'
import type { productType } from '@/types'

interface ProductProps {
  product: productType
}

export default function ProductListQuickView({ product }: ProductProps) {
  const { algoliaQuickViewEvent } = useEvent()

  // loadingState(addItemToCart, `${product.name}  added to cart`)

  function quickViewHandler() {
    algoliaQuickViewEvent(product)
  }

  return (
    <div className="flex mt-4 items-center justify-between">
      <ProductListForm product={product} />
      <a
        aria-label={`Quick view of ${product.name}`}
        className="hover:text-red-500 border flex items-center border-red-500 rounded-md px-2 p-1 cursor-pointer"
        data-bs-toggle="quickViewModal"
        onClick={quickViewHandler}
      >
        <BsFillEyeFill className="text-red-500 mx-1" />
        Quick view
      </a>
    </div>
  )
}
