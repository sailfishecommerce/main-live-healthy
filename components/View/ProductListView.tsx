import { AnimatePresence, m } from 'framer-motion'

import ProductListCard from '@/components/Cards/ProductListCard'

export default function ProductListView({
  hits,
  animation,
  listItemTransition,
  listItemVariants,
  shouldReduceMotion,
  hitsPerPage,
  color,
}: any) {
  return (
    <m.ol
      className={
        'overflow-hidden flex flex-col gap-4 lg:grid lg:gap-0 lg:grid-cols-1'
      }
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <AnimatePresence>
        {hits.map((hit: any, i: number) => (
          <m.li
            key={hit?.objectID}
            layout={shouldReduceMotion || !animation ? false : 'position'}
            transition={listItemTransition}
            variants={listItemVariants}
            custom={i % hitsPerPage}
          >
            <ProductListCard hit={hit} color={color} />
          </m.li>
        ))}
      </AnimatePresence>
    </m.ol>
  )
}
