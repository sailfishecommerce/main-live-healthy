import { useQuery } from 'react-query'

import useEasyShip from '@/hooks/useEasyShip'

export default function ShippingRate() {
  const { requestRate } = useEasyShip()
  const { data, status, error } = useQuery('requestRate', requestRate)

  console.log('data-ShippingRate', data)
  console.log('data-ShippingRate-error', error)

  return (
    <div className="w-full height-fit-content bg-white p-4 my-4 md:my-0 mx-0 rounded-md">
      <h3 className="font-semibold mb-2 text-xl mr-2">3. Shipping Rate</h3>
    </div>
  )
}
