/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-nested-ternary */
import { useState } from 'react'
import { useQuery } from 'react-query'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import ShippingRateCard from '@/components/Shipping/ShippingRateCard'
import useEasyShip from '@/hooks/useEasyShip'

export default function ShippingRate() {
  const { requestRate } = useEasyShip()
  const { data, status } = useQuery('requestRate', requestRate)
  const [courier, setCourier] = useState('')

  console.log('data?.data?.rates', data?.data?.rates)

  return (
    <div className="w-full height-fit-content bg-white p-4 my-4 md:my-0 mx-0 rounded-md">
      <h3 className="font-semibold mb-2 text-xl mr-2">3. Shipping Rate</h3>
      <div className="shipping-rate">
        {status === 'error' ? (
          <p>an error occured</p>
        ) : status === 'loading' ? (
          <>
            <SpinnerRipple centerRipple />
            <p className="text-center -mt-14">
              fetching courier shipping rate(s)...
            </p>
          </>
        ) : (
          <div>
            <ul>
              {data?.data?.rates.map((rate: any, index: number) => (
                <ShippingRateCard
                  rate={rate}
                  key={rate.courier_id}
                  index={index}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
