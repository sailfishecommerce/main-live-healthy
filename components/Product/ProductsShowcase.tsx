import classNames from 'classnames'
import { Configure, Index } from 'react-instantsearch-dom'

import { Container } from '@/components/Container'
import { indexName as defaultIndexName } from '@/utils/env'
import { InfiniteHits } from '@instantsearch/widgets/infinite-hits/infinite-hits'

export type ProductsShowcaseProps = {
  title?: string
  indexName?: string
  indexId?: string
  className?: string
  hitComponent: React.ComponentType<any>
  [index: string]: any
}

export function ProductsShowcase({
  indexName = defaultIndexName,
  indexId,
  title,
  className,
  hitComponent,
  ...searchParameters
}: ProductsShowcaseProps) {
  // console.log('searchParameters', searchParameters)
  return (
    <Index indexName={indexName} indexId={indexId}>
      <Configure {...searchParameters} />

      <section
        className={classNames('py-4 lg:py-10 container mx-auto', className)}
      >
        <Container>
          {title && (
            <h4 className="text-lg font-semibold tracking-[2px] uppercase mb-2 lg:mb-4 lg:ml-3">
              {title}
            </h4>
          )}
          <InfiniteHits
            hitComponent={hitComponent}
            animation={false}
            gridClassName="grid-cols-2 lg:grid-cols-5"
          />
        </Container>
      </section>
    </Index>
  )
}
