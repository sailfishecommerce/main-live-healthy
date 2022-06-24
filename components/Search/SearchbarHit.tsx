/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Image from 'next/image'
import Link from 'next/link'
import { Highlight, connectHitInsights } from 'react-instantsearch-dom'
import aa from 'search-insights'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import FormattedPrice from '@/components/Price/FormattedPrice'
import { indexName } from '@/utils/env'

function SearchbarHitComponent({ hit, insights }: any) {
  const hitImage =
    typeof hit?.images[0] === 'string'
      ? hit?.images[0]
      : hit?.images[0]?.file?.url

  function algoliaInsightEvent() {
    insights('clickedObjectIDsAfterSearch', {
      index: indexName,
      eventName: 'Product Clicked',
      position: hit.__position,
      objectID: hit.objectID,
      queryID: hit.__queryID,
    })
  }

  return (
    <>
      {hit ? (
        <Link passHref href={`/product/${hit.slug}`}>
          <a
            className="w-full flex items-center border-b px-2 py-1 hover:bg-gray-300"
            onClick={algoliaInsightEvent}
          >
            {hitImage && (
              <Image
                src={hitImage}
                alt={hit.name}
                height={80}
                width={80}
                blurDataURL={hitImage}
                placeholder="blur"
              />
            )}
            <div className="text-content ml-3">
              <div className="hit-name w-full">
                <Highlight attribute="name" hit={hit} />
              </div>
              <div className="hit-price">
                <FormattedPrice
                  className="text-sm font-semibold"
                  price={hit.sale_price}
                />
              </div>
            </div>
          </a>
        </Link>
      ) : (
        <SpinnerRipple centerRipple />
      )}
    </>
  )
}

const SearchbarHit: any = connectHitInsights(aa)(SearchbarHitComponent)
export default SearchbarHit
