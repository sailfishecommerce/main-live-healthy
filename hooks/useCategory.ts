import { useQueryClient } from 'react-query'

import useSwell from '@/hooks/useSwell'

export default function useCategory() {
  const { swellInit } = useSwell()

  async function listAllCategory() {
    const { swell } = await swellInit()
    return await swell.categories.list({
      limit: 25,
    })
  }

  async function getACategory(categoryIdOrSlug: string) {
    const { swell } = await swellInit()
    return await swell.categories.get(categoryIdOrSlug)
  }

  async function getProductsInACategory(slug: string) {
    const { swell } = await swellInit()
    return await swell.products.list({
      category: slug,
      limit: 25,
      page: 1,
    })
  }

  function useAllCategories() {
    const queryClient = useQueryClient()
    const categories: any = queryClient.getQueryData('listAllCategory')
    return categories
  }

  return {
    listAllCategory,
    getACategory,
    getProductsInACategory,
    useAllCategories,
  }
}
