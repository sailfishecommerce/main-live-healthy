import axios from 'axios'
import { useQuery } from 'react-query'

import useSwellProducts from './useSwellProducts'
import useCategory from '@/hooks/useCategory'

export default function useAlgoliaIndex() {
  const { allProducts } = useSwellProducts()
  const { useAllCategories } = useCategory()
  const categories = useAllCategories()

  const { data, status } = useQuery('allProducts', allProducts)

  function addProductToAlgoliaIndex() {
    axios
      .post('/api/add-products-to-algolia-index', data?.results)
      .then((response) => {
        console.log('response addProductToAlgoliaIndex', response)
      })
      .catch((error) => console.error('error addProductToAlgoliaIndex', error))
  }

  function addCategoriesToAlgoliaIndex() {
    axios
      .post('/api/add-products-to-algolia-index', categories?.results)
      .then((response) => {
        console.log('response addProductToAlgoliaIndex', response)
      })
      .catch((error) => console.error('error addProductToAlgoliaIndex', error))
  }

  return {
    addProductToAlgoliaIndex,
    status,
    addCategoriesToAlgoliaIndex,
  }
}
