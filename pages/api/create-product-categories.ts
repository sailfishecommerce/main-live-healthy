/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next'
import swell from 'swell-node'

import swellProducts from '../../swellProduct.json'

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
        productCategories.push(product.product_type_2)
      }
    })
    const newProductCategories = new Set(productCategories)
    const newProductCategoriesArray = Array.from(newProductCategories)
    return newProductCategoriesArray
  }

  async function createCategories(category: any) {
    await swell
      .post('/categories', {
        name: category.name,
        products: category.products,
        active: true,
        store_name: 'livehealthy_store',
        description:
          "No minimum orders and free shipping to Hong Kong. Quality imported products from Australia. Choose from over 10,000 genuine health, beauty and baby care products. Get vitamins, health and food supplements, cosmetics, quit smoking aids, hair colours, baby food and much more. Owned & operated by HK'ers.",
        meta_description:
          "No minimum orders and free shipping to Hong Kong. Quality imported products from Australia. Choose from over 10,000 genuine health, beauty and baby care products. Get vitamins, health and food supplements, cosmetics, quit smoking aids, hair colours, baby food and much more. Owned & operated by HK'ers.",
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
                (product: any) => product.product_type_2 === productResponse
              )
              .map((product: any, index: number) => {
                const productObj = {
                  id: `${product.id}-${index}`,
                  product_id: product.id,
                }
                return productObj
              })
            categoryData.categories = response
          })
          console.log('categoryData', categoryData)
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
        .catch((err: any) => console.log('err', err))
    }
    default:
      return null
  }
}
