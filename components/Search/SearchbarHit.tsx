import Image from 'next/image'
import Link from 'next/link'
import { Highlight } from 'react-instantsearch-dom'

import FormattedPrice from '@/components/Price/FormattedPrice'

export default function SearchbarHit({ hit }: any) {
  return (
    <>
      {hit && (
        <Link passHref href={`/product/${hit.slug}`}>
          <div className="w-full flex items-center border-b px-2 py-1 hover:bg-gray-300">
            <Image src={hit.images[0]} alt={hit.name} height={80} width={80} />
            <div className="text-content ml-3">
              <div className="hit-name w-full">
                <Highlight attribute="name" hit={hit} />
              </div>
              <div className="hit-price">
                <FormattedPrice
                  className="text-sm font-semibold"
                  price={hit.price}
                />
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  )
}
