import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from 'react-query'

import FormattedPrice from '@/components/Price/FormattedPrice'
import useProduct from '@/hooks/useProduct'

export default function OrderHistoryProductItem({ item }: any) {
  const { useGetAProduct } = useProduct()
  const { getAProduct } = useGetAProduct()
  const { data, status } = useQuery('productDetails', () =>
    getAProduct(item.product_id)
  )

  const productImage =
    typeof data?.images[0] === 'string'
      ? data?.images[0]
      : data?.images[0].file.url

  return (
    <>
      {status === 'success' && data !== null && (
        <Link passHref href={`/product/${data.slug}`}>
          <a className="order-history border-b pb-3 flex items-center my-4">
            <span className="w-1/12 mr-4">
              <Image
                src={productImage}
                alt={data.name}
                height={70}
                width={70}
                layout="responsive"
                className="rounded-lg bg-gray-100"
              />
            </span>
            <div className="content flex flex-col justify-between h-16">
              <h3 className="font-normal text-md">{data.name}</h3>
              <span className="flex items-center">
                <div className="quantity border px-4 rounded-lg mx-2 hover:bg-green-500 hover:text-white">
                  {item.quantity}
                </div>
                X{' '}
                <FormattedPrice
                  className="text-black font-normal ml-2"
                  price={data.salePrice}
                />
              </span>
            </div>
          </a>
        </Link>
      )}
    </>
  )
}
