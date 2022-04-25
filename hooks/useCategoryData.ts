import { useQuery } from 'react-query'

import useCategory from '@/hooks/useCategory'

export default function useCategoryData() {
  const { listAllCategory } = useCategory()
  const { data, status } = useQuery('listAllCategory', listAllCategory, {
    staleTime: Infinity,
  })
  return [data, status]
}
