import axios from 'axios'

export default function useCreateProduct() {
  function createProduct(product: any): any {
    axios.post('/api/create-product', { record: product })
  }

  return { createProduct }
}
