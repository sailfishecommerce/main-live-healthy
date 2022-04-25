import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState, useCallback } from 'react'
import { BsCartPlusFill } from 'react-icons/bs'

import { ProductQuantityCounter } from '@/components/Product/ProductView'
import useAlgoliaEvents from '@/hooks/useAlgoliaEvents'
import useProductOptions from '@/hooks/useProductOptions'
import useShoppingCart from '@/hooks/useShoppingCart'
import type { productType, productOptions } from '@/typings'

const ProductBoxTable: any = dynamic((): any =>
  import(
    /* webpackChunkName: 'ProductBoxTable' */ '@/components/Product/ProductView'
  ).then((mod) => mod.ProductBoxTable)
)
const ProductOptionSelect: any = dynamic((): any =>
  import(
    /* webpackChunkName: 'ProductOptionSelect' */ '@/components/Product/ProductView'
  ).then((mod) => mod.ProductOptionSelect)
)
const ProductOptionSelectBox: any = dynamic((): any =>
  import(
    /* webpackChunkName: 'ProductOptionSelectBox' */ '@/components/Product/ProductView'
  ).then((mod) => mod.ProductOptionSelectBox)
)

const ProductColorOption: any = dynamic((): any =>
  import(
    /* webpackChunkName: 'ProductColorOption' */ '@/components/Form/ProductFormElement'
  ).then((mod) => mod.ProductColorOption)
)

interface ProductFormType {
  product: productType
}

const quantityArr = [10, 20, 30, 40, 50]

export default function ProductForm({ product }: ProductFormType) {
  const router = useRouter()
  const { convertedItemAfterSearch, productAddedToCart } = useAlgoliaEvents()
  const queryID: any = router.query['query-id']
  const { addItemToCartModal } = useShoppingCart()

  const { optionHandler, selectedOptions } = useProductOptions()

  const [productQty, setProductQty] = useState<any | number | null>(null)

  function productQtyHandler(e: any) {
    setProductQty(e.target.value)
  }

  function algoliaEvent() {
    const itemId =
      product.objectID !== undefined ? [product.objectID] : [product.id]
    return queryID
      ? convertedItemAfterSearch(
          'product_added_to_cart_after_search',
          queryID,
          [product.objectID]
        )
      : productAddedToCart(itemId)
  }

  const counterType = product.attributes

  function onSubmitHandler(e: any) {
    e.preventDefault()
    algoliaEvent()
    addItemToCartModal.mutate({ product, productQty, selectedOptions })
  }

  const optionsClassName = counterType?.box
    ? 'mb-3 align-items-end'
    : 'mb-3 items-center'

  const formBg = useCallback((name: string) => {
    const style = { backgroundColor: name.toLowerCase() }
    return style
  }, [])

  return (
    <div className="productform mb-3">
      {product?.options?.length > 0 ? (
        <form onSubmit={onSubmitHandler}>
          {product?.options?.map((option: productOptions) => {
            return option?.name === 'Color' ? (
              <ProductColorOption
                option={option}
                optionHandler={optionHandler}
                formBg={formBg}
                product={product}
              />
            ) : (
              option.name === 'Size' && (
                <ProductOptionSelect
                  key={option.id}
                  option={option}
                  selectedItemHandler={optionHandler}
                />
              )
            )
          })}
          {product?.attributes?.box && <ProductBoxTable />}
          {product?.attributes?.box && productQty && (
            <div className="alert bg-danger text-white">
              {productQty} cartons has a total of {Number(productQty) * 10}{' '}
              boxes with 100 pcs each
            </div>
          )}
          <div className={`cartCounter row pe-3 ${optionsClassName}`}>
            {counterType?.box && (
              <ProductOptionSelectBox
                quantityArr={quantityArr}
                productQtyHandler={productQtyHandler}
              />
            )}
            <button
              aria-label="Add to cart"
              className="bg-red-500 rounded-lg text-white"
              type="submit"
            >
              <BsCartPlusFill />
              Add to Cart
            </button>
          </div>
        </form>
      ) : (
        <ProductQuantityCounter product={product} />
      )}
    </div>
  )
}
