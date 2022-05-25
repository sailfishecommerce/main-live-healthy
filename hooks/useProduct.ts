import axios from 'axios'

import useSwell from '@/hooks/useSwell'

export default function useProduct() {
  const { swellInit } = useSwell()

  async function getAProduct(productID: string) {
    const { swell } = await swellInit()
    return await swell.products.get(productID)
  }

  function getProductsInACategory(category: string) {
    return axios.post('/api/fetch-category-products', { category })
  }

  return { getAProduct, getProductsInACategory }
}
