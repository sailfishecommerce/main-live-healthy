/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Highlight } from 'react-instantsearch-dom'

import Image from '@/components/Image'
import useAlgoliaEvents from '@/hooks/useAlgoliaEvents'
import { useAppSelector } from '@/hooks/useRedux'
import { closeSearch, updateViewSearch } from '@/redux/algolia-slice'
import { useAppDispatch } from '@/redux/store'
import type { hitType } from '@/typings'

interface SearchHitsProps {
  hits: hitType[]
}

export default function ViewSearchQuery({ hits }: SearchHitsProps) {
  const formattedHit = hits.slice(0, 6)
  const { query } = useAppSelector((state) => state.algolia)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { clickedItemAfterSearch } = useAlgoliaEvents()

  function viewHits() {
    dispatch(updateViewSearch())
    dispatch(closeSearch())
    router.push({ pathname: '/search', query: { query } })
  }

  return (
    <div className="w-full md:w-3/5 flex flex-col md:flex-row searchbarhit absolute bg-white border left-0 md:left-36 h-full md:h-96 rounded-xl shadow-lg z-20 top-36 md:top-20 px-3 md:px-6 py-4">
      <div className="w-full mx-auto flex flex-col justify-center md:justify-start px-2 lg:w-1/5 md:border-r">
        <h6 className="text-lg text-center font-medium px-2">
          Popular Suggestions
        </h6>
        {hits.length > 0 && (
          <button
            type="button"
            aria-label="view all searched product"
            className="bg-red-500 text-sm p-2 text-white rounded-md my-2 hover:bg-white hover:text-red-500 hover:border-red-500 border-2 border-red-500"
            onClick={viewHits}
          >
            VIEW ALL {hits.length} ITEMS{' '}
          </button>
        )}
      </div>
      <div className="w-full md:w-4/5 search-results">
        <h6 className="text-xl text-center font-medium">Products</h6>
        {formattedHit.length > 1 ? (
          <ul className="ais-Hits-list flex flex-col md:grid grid-cols-2 pl-4">
            {formattedHit.map((hit, index) => (
              <li
                className="ais-Hits-item w-1/2 h-1/2 my-6 md:my-3"
                key={index}
              >
                <Link
                  passHref
                  href={`/products/${hit.slug}?query-id=${hit.__queryID}`}
                >
                  <a
                    className="hit flex w-full items-center my-0 py-1 hover:text-red-500"
                    onClick={() =>
                      clickedItemAfterSearch(
                        hit.__queryID,
                        [hit.objectID],
                        [hit.__position],
                        'product clicked after a search'
                      )
                    }
                  >
                    <div className="hit-image pr-2">
                      <Image
                        src={hit.images[0]}
                        alt={hit.name}
                        className="productImage"
                        height={100}
                        width={100}
                        placeholder="blur"
                        blurDataURL={hit.images[0]?.file?.url}
                        loading="lazy"
                      />
                    </div>
                    <div className="hit-content ml-3 flex">
                      <h6 className="font-bold">
                        <Highlight attribute="name" hit={hit} />
                      </h6>
                      <div className="price font-bold"> ${hit.price}</div>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Start typing for search results</p>
        )}
      </div>
      <style jsx>
        {`
          .hit-content.flex h6 {
            font-size: 13px;
            padding: 0px;
            white-space: nowrap;
            width: 180px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .hit-content.flex {
            flex-direction: column;
          }
          .price {
            font-size: 13px;
          }
          .hit-image {
            height: 70px;
            width: 100px;
          }
          .searchBox {
            display: flex;
            flex-direction: column;
            width: 55%;
          }
          .navbar-tool:hover .logout {
            color: red;
          }
          .results {
            position: absolute;
            z-index: 100;
            background-color: white;
            left: 6%;
            width: 85%;
            height: 380px;
            overflow: auto;
            margin-top: 1%;
            border-radius: 0;
            padding: 16px;
            box-shadow: 0px 8px 16px 0px #33333329;
          }
          .results h6 {
            line-height: 1;
            text-transform: uppercase;
            border-bottom: 1px solid #333;
            font-weight: 500;
            color: #333;
            font-size: 14px;
            letter-spacing: 0;
            margin: 0 8px 0;
            padding-bottom: 7px;
            margin-bottom: 4px;
          }
          .search-box {
            position: relative;
          }
          button.btn.btn-primary {
            border-radius: 0px;
            margin-top: 10px;
          }
          @media (max-width: 768px) {
            .results {
              z-index: 1000;
              left: 5%;
              top: 24%;
              padding: 0px;
              width: 90%;
            }
          }
        `}
      </style>
    </div>
  )
}
