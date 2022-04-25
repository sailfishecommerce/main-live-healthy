import classNames from 'classnames'
import { Configure, Index } from 'react-instantsearch-dom'

import { Container } from '@/components/Container'
import InfiniteHitsSlider from '@/components/Slider/InfiniteHitSlider'
import { indexName as defaultIndexName } from '@/utils/env'

export type ProductsShowcaseProps = {
  title?: string
  indexName?: string
  indexId?: string
  className?: string
  hitComponent?: React.ComponentType<any>
  [index: string]: any
}

export default function MainProductShowcase({
  indexName = defaultIndexName,
  indexId,
  title,
  className,
  ...searchParameters
}: ProductsShowcaseProps) {
  return (
    <Index indexName={indexName} indexId={indexId}>
      <Configure {...searchParameters} />
      <section
        className={classNames('py-4 lg:py-10 container mx-auto', className)}
      >
        <Container>
          {title && (
            <h4 className="text-2xl font-bold  mb-2 lg:mb-4 lg:ml-3">
              {title}
            </h4>
          )}
          <InfiniteHitsSlider />
        </Container>
      </section>
    </Index>
  )
}
