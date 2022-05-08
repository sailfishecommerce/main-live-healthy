import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellProducts from '../../json/swellProducts.json'

export default function createSwellCategoriesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productCategories: any = []
  const categories: any = []
  const categoryData: any = {}
  const products: any = swellProducts

  async function getCategoriesName() {
    await products.filter((product: any) => {
      if (!productCategories.includes(product.product_type)) {
        productCategories.push(product.product_type)
      }
    })
    return productCategories
  }

  async function createCategories(category: any) {
    await swell
      .post('/categories', {
        name: category.name,
        products: category.products,
        active: true,
        store_name: 'livehealthy store',
      })
      .then((response: any) => console.log('response', response))
      .catch((error: any) => console.error('error', error))
  }

  switch (req.method) {
    case 'GET': {
      return getCategoriesName()
        .then((response: any) => {
          response.map((productResponse: any) => {
            categoryData[productResponse] = products
              .filter(
                (product: any) => product.product_type === productResponse
              )
              .map((product: any, index: number) => {
                const productObj = {
                  id: `${product.id}-${index}`,
                  product_id: product.id,
                }
                return productObj
              })
            categoryData['categories'] = response
          })
          return categoryData
        })
        .then((response: any) => {
          response.categories.map((category: any) => {
            categories.push({
              name: category,
              products: response[category],
            })
          })
          return categories
        })
        .then((response: any) => {
          response.map((category: any) => createCategories(category))
          res.status(200).json(response)
        })
        .catch((err: any) => console.log('error', err))
    }
    default:
      return null
  }
}
