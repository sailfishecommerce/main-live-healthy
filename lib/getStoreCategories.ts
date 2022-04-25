import swell from 'swell-node'

import swellNodeInit from '@/lib/swellNode'

export default async function getStoreCategories() {
  swellNodeInit()
  const categories = await swell.get('/categories', {
    where: {
      store_name: 'livehealthy store',
    },
  })
  return Promise.all(categories.results)
}
