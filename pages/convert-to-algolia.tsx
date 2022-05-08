import axios from 'axios'
import { useEffect } from 'react'

import products from '../new-products-1.json'

export default function ConvertToAlgolia() {
  useEffect(() => {
    axios
      .post('/api/add-products-to-algolia-index', { productArray: products })
      .then((response) => console.log('algolia response', response))
      .catch((err) => console.log('err', err))
  }, [])

  return <div>Hello dave</div>
}
