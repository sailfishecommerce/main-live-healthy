import axios from 'axios'

import useSwell from '@/hooks/useSwell'

export default function useProduct() {
  function useGetAProduct() {
    const { swellInit } = useSwell()

    async function getAProduct(productID: string) {
      const { swell } = await swellInit()
      return await swell.products.get(productID)
    }
    return { getAProduct }
  }

  function getProductsInACategory(category: string) {
    return axios.post('/api/fetch-category-products', { category })
  }

  function getProducts(query: string) {
    return axios.post('/api/fetch-category-products', { query })
  }

  function getVendorProduct(vendor?: string) {
    return axios.post('/api/get-vendor-products', { vendor })
  }

  return {
    useGetAProduct,
    getProductsInACategory,
    getVendorProduct,
    getProducts,
  }
}
