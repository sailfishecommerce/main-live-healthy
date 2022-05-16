import { useReducedMotion } from 'framer-motion'
import { memo, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import type { InfiniteHitsProvided } from 'react-instantsearch-core'
import { connectInfiniteHits } from 'react-instantsearch-dom'

import ProductGridView from '@/components/View/ProductGridView'
import ProductListView from '@/components/View/ProductListView'
import type { ViewMode } from '@/components/ViewModes'
import selectRandomColor from '@/lib/selectRandomColor'
import { withDebugLayer } from '@dev/debug-layer/debug-layer'
import { LoadLess } from '@instantsearch/widgets/load-less/load-less'
import { LoadMore } from '@instantsearch/widgets/load-more/load-more'

export type InfiniteHitsProps = InfiniteHitsProvided & {
  hitComponent: React.ComponentType<any>
  showLess?: boolean
  showMore?: boolean
  viewMode?: ViewMode
  animation?: boolean
  gridClassName?: string
  listClassName?: string
  setCollectionHit: any[]
}

const listItemTransition = {
  ease: [0.16, 1, 0.3, 1],
  duration: 0.6,
}

const listItemVariants = {
  hidden: { opacity: 0 },
  show: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.06,
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

function InfiniteHitsComponent({
  hits,
  hasPrevious,
  refinePrevious,
  showLess = false,
  showMore = false,
  viewMode = 'grid',
  animation = true,
}: InfiniteHitsProps) {
  const [hitsPerPage, setHitsPerPage] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!hitsPerPage) setHitsPerPage(hits.length)
  }, [hitsPerPage, hits.length])
  console.log('hits', hits.length)
  return (
    <>
      {typeof window === "undefined" && (
          <section className="w-full">
            {showLess && (
              <LoadLess
                hasPrevious={hasPrevious}
                refinePrevious={refinePrevious}
              />
            )}
            {viewMode === 'grid' ? (
              <ProductGridView
                hits={hits}
                animation={animation}
                listItemTransition={listItemTransition}
                listItemVariants={listItemVariants}
                shouldReduceMotion={shouldReduceMotion}
                hitsPerPage={hitsPerPage}
                color={selectRandomColor()}
              />
            ) : (
              <ProductListView
                hits={hits}
                animation={animation}
                listItemTransition={listItemTransition}
                listItemVariants={listItemVariants}
                shouldReduceMotion={shouldReduceMotion}
                hitsPerPage={hitsPerPage}
                color={selectRandomColor()}
              />
            )}

            {showMore && <LoadMore />}
          </section>
        ))}
    </>
  )
}

const InfiniteHits = connectInfiniteHits<any, any>(
  memo(withDebugLayer(InfiniteHitsComponent, 'InfiniteHitsWidget'), isEqual)
)

export default InfiniteHits
