import classNames from 'classnames'
import { Configure, Index } from 'react-instantsearch-dom'

import LazyLoader from '@/components/Loader/LazyLoader'
import InfiniteHitsSlider from '@/components/Slider/InfiniteHitSlider'
import { indexName as defaultIndexName } from '@/utils/env'

export type ProductsShowcaseProps = {
  title?: string
  indexName?: string
  indexId?: string
  className?: string
  tabColor?: string
  [index: string]: any
}

export default function MainProductShowcase({
  indexName = defaultIndexName,
  indexId,
  title,
  className,
  tabColor,
  ...searchParameters
}: ProductsShowcaseProps) {
  return (
    // <LazyLoader height={500} mobileHeight={420}>
    <Index indexName={indexName} indexId={indexId}>
      <Configure
        enablePersonalization={true}
        hitsPerPage={15}
        {...searchParameters}
      />
      <section
        className={classNames('lg:pt-6 my-3 pl-3 container mx-auto', className)}
      >
        {title && (
          <h4 className="text-2xl -mt-3 font-bold  mb-2 lg:mb-4 lg:ml-3">
            {title}
          </h4>
        )}
        <InfiniteHitsSlider tabColor={tabColor} />
      </section>
    </Index>
    // </LazyLoader>
  )
}
