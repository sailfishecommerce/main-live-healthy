import { Configure, Index } from 'react-instantsearch-core'

import InfiniteHitsSlider from '@/components/Slider/InfiniteHitSlider'
import '@splidejs/splide/dist/css/splide.min.css'
import { indexName } from '@/utils/env'

interface Props {
  title: string
  tabColor?: string
  productName?: string
  productClassName?: string
  randomColor?: boolean
  query: string
  indexId: string
}
export default function ProductSlider({
  title,
  tabColor,
  productName,
  randomColor,
  query,
  indexId,
}: Props) {
  return (
    <Index indexName={indexName} indexId={indexId}>
      <Configure filters={query} hitsPerPage={18} />
      <section className="itemSlider relative container mx-auto flex flex-col my-0 mb-2 md:my-4 px-4 md:px-0">
        <div className="top mb-4 flex items-center justify-between">
          {productName ? (
            <h1 className="font-bold text-md md:text-xl 2xl:text2xl">
              {title} <span className="mountain-green">{productName}</span>{' '}
              users
            </h1>
          ) : (
            <h1 className="font-bold text-xl 2xl:text-2xl">{title}</h1>
          )}
        </div>
        <InfiniteHitsSlider tabColor={tabColor} randomColor={randomColor} />
      </section>
    </Index>
  )
}
