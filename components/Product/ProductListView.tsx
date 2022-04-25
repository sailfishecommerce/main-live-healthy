import Link from 'next/link'

import FormattedPrice from '@/components/Price/FormattedPrice'
import ProductListQuickView from '@/components/Product/ProductListQuickView'
import RatingStar from '@/components/Rating/RatingStar'
import useAlgoliaEvents from '@/hooks/useAlgoliaEvents'
import useShoppingCart from '@/hooks/useShoppingCart'

export default function ProductListView({ product }: any) {
  const { itemViewed } = useAlgoliaEvents()
  const { loadingState, addItemToCart } = useShoppingCart()

  loadingState(addItemToCart, `${product.name} added to cart`)

  function productViewedHandler() {
    itemViewed('product_viewed', [product.objectID])
  }
  return (
    <div className="card-body py-2 w-full">
      <a
        aria-label={product.vendor}
        className="text-lg tablet:text-2xl font-medium mb-1"
      >
        {product.vendor}
      </a>
      <h3 className="text-md tablet:text-xl font-normal">
        <Link passHref href={`/products/${product.slug}`}>
          <button type="button" onClick={productViewedHandler}>
            {product.name}
          </button>
        </Link>
      </h3>
      <div className="flex justify-between">
        <div className="flex flex-col items">
          <FormattedPrice
            isProduct
            price={product.price}
            className="text-md font-bold"
          />
          {product.rrp && (
            <del>
              <FormattedPrice
                isProduct
                price={product.rrp}
                className="text-sm"
              />
            </del>
          )}
        </div>
        <RatingStar rate={product.rating} />
      </div>
      <ProductListQuickView product={product} />
    </div>
  )
}
