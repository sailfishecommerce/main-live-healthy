import { AnimatePresence, m } from 'framer-motion'

import ProductHitCard from '@/components/Cards/ProductHitCard'

export default function ProductGridView({
  hits,
  animation,
  listItemTransition,
  listItemVariants,
  shouldReduceMotion,
  hitsPerPage,
  color,
}: any) {
  return (
    <>
      {hits ? (
        <m.ol
          className={
            'overflow-hidden grid grid-cols-2 gap-2 grid-cols-2 lg:grid-cols-4 w-full'
          }
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <AnimatePresence>
            {hits?.map((hit: any, i: number) => (
              <m.li
                key={hit?.objectID}
                layout={shouldReduceMotion || !animation ? false : 'position'}
                transition={listItemTransition}
                variants={listItemVariants}
                custom={i % hitsPerPage}
              >
                <ProductHitCard hit={hit} color={color} />
              </m.li>
            ))}
          </AnimatePresence>
        </m.ol>
      ) : null}
    </>
  )
}
