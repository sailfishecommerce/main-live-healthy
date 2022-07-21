import axios from 'axios'

export default async function getEasyShipItemCategories() {
  const result = await axios.get(
    'https://api.easyship.com/reference/v1/categories'
  )
  return Promise.all(result.data)
}
