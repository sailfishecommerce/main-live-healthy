import { useQuery } from 'react-query'

import useCategory from '@/hooks/useCategory'
import categoryData from '@/json/category-placeholder-data.json'

export default function useCategoryData() {
  const { listAllCategory } = useCategory()
  const { data, status } = useQuery('listAllCategory', listAllCategory, {
    staleTime: Infinity,
    placeholderData: { results: categoryData },
  })

  return [data, status]
}
