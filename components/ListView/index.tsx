import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { connectInfiniteHits } from 'react-instantsearch-dom'

import ProductListView from '@/components/ListView/ProductListView'
import ProductTags from '@/components/Tag/ProductTags'
import { withDebugLayer } from '@dev/debug-layer/debug-layer'

interface Props {
  title: string
  tags?: string[]
  tabColor?: string
  productName?: string
  productClassName: string
  randomColor: boolean
  hits: any[]
  indexName?: string
  indexId?: string
  className?: string
}

function ListViewComponent({
  title,
  hits,
  tags,
  tabColor,
  productClassName,
  randomColor,
}: Props) {
  return (
    <section className="mx-auto container listview">
      <h4 className="text-2xl font-bold  mb-2 lg:mb-4 lg:ml-3">{title}</h4>
      {tags && <ProductTags tags={tags} tabColor={tabColor} />}
      {hits.length === 0 ? null : (
        <ProductListView
          size={hits.length}
          hits={hits}
          randomColor={randomColor}
          tabColor={tabColor}
          productClassName={productClassName}
        />
      )}
    </section>
  )
}

const ListView = connectInfiniteHits<any, any>(
  memo(withDebugLayer(ListViewComponent, 'InfiniteHitsWidget'), isEqual)
)

export default ListView
