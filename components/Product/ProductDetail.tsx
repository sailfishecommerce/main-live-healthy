import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import ProductForm from '@/components/Form/ProductForm'
import FormattedPrice from '@/components/Price/FormattedPrice'
import { PaymentNote, ShareProductLink } from '@/components/Product/ProductView'
import Rating from '@/components/Rating'
import { replaceSpaceWithHypen } from '@/lib/formatString'
import type { productType } from '@/typings'

interface Props {
  product: productType
}

const DynamicContactModal = dynamic(
  () =>
    import(
      /* webpackChunkName: 'common' */ '@/components/Modal/ContactForMoreModal'
    )
)

export default function ProductDetail({ product }: Props) {
  const [modal, setModal] = useState(false)

  const toggleModal = useCallback(() => setModal(!modal), [modal])

  return (
    <div className="w-full laptop:w-1/3 pt-4 laptop:pt-0">
      <DynamicContactModal
        show={modal}
        productName={product.name}
        onHide={toggleModal}
      />
      <div className="flex justify-between items-center mb-2 w-full">
        <div className="flex items-center flex-col tablet:flex-row">
          <span className="text-blue-800 font-bold text-xl mx-1">
            <FormattedPrice
              isProduct
              className="laptop:text-xl"
              price={product.price}
            />
          </span>
          {product.rrp && (
            <span className="text-blue-800 text-xl mx-1">
              <del>
                <FormattedPrice
                  isProduct
                  className="laptop:text-xl"
                  price={product.rrp}
                />
              </del>
            </span>
          )}
        </div>
        <Rating product={product} />
      </div>
      <ProductForm product={product} />
      <div className="flex my-2 flex-col tablet:flex-row items-center justify-between">
        <Link
          passHref
          href={`/shop/vendors/${replaceSpaceWithHypen(product.vendor)}`}
        >
          <a
            aria-label={product.vendor}
            className="underline px-0 text-blue-500 hover:text-red-500"
          >
            + All {product.vendor} products
          </a>
        </Link>
        <button
          type="button"
          aria-label="Contact for more"
          className="font-medium text-red-500 hover:underline"
          onClick={toggleModal}
        >
          Not enough? Contact us for more
        </button>
      </div>
      <ShareProductLink />
      <PaymentNote />
    </div>
  )
}
