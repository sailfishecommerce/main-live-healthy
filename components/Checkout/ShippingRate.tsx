/* eslint-disable no-nested-ternary */
import { useQuery } from 'react-query'

import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import Ratings from '@/components/Reviews/Ratings'
import useEasyShip from '@/hooks/useEasyShip'
import { formatPrice } from '@/lib/formatPrice'

interface ListRateProps {
  text: string
  price: number
}

export default function ShippingRate() {
  const { requestRate } = useEasyShip()
  const { data, status } = useQuery('requestRate', requestRate)

  function ListRate({ text, price }: ListRateProps) {
    const currency = data?.data?.rates[0].currency
    return (
      <>
        {price > 0 && (
          <div className="flex items-center justify-between w-3/4">
            <h6>{text}:</h6>
            <span>
              {currency}
              {formatPrice(price)}
            </span>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="w-full height-fit-content bg-white p-4 my-4 md:my-0 mx-0 rounded-md">
      <h3 className="font-semibold mb-2 text-xl mr-2">3. Shipping Rate</h3>
      <div className="shipping-rate">
        {status === 'error' ? (
          <p>an error occured</p>
        ) : status === 'loading' ? (
          <>
            <SpinnerRipple centerRipple />
            <p className="text-center -mt-14">fetching shipping rate(s)...</p>
          </>
        ) : (
          <div>
            <ul>
              {data?.data.rates.map((rate: any) => (
                <li
                  key={rate.courier_id}
                  className="border border-2 p-2 hover:bg-gray-100"
                >
                  <h4 className="font-medium">Courier: {rate.courier_name}</h4>
                  <h5 className="font-semibold mt-2">Pricing</h5>
                  <ListRate text="Fuel Surcharge" price={rate.fuel_surcharge} />
                  <ListRate
                    text="Shipment Charge"
                    price={rate.shipment_charge}
                  />
                  <ListRate
                    text="Remote Area Surcharge"
                    price={rate.remote_area_surcharge}
                  />
                  <ListRate
                    text="Oversized Surcharge"
                    price={rate.oversized_surcharge}
                  />
                  <ListRate
                    text="Additional Services Surcharge"
                    price={rate.additional_services_surcharge}
                  />
                  <ListRate
                    text="Residential full fee"
                    price={rate.residential_full_fee}
                  />
                  <ListRate
                    text="Residential discounted fee"
                    price={rate.residential_discounted_fee}
                  />
                  <ListRate
                    text="Insurance Fee Charge"
                    price={rate.insurance_fee}
                  />
                  <ListRate
                    text="Warehouse Handling Fee"
                    price={rate.warehouse_handling_fee}
                  />
                  <ListRate
                    text="DDP Handling Fee"
                    price={rate.ddp_handling_fee}
                  />
                  <ListRate
                    text="Shipment Charge Total"
                    price={rate.shipment_charge_total}
                  />
                  <ListRate text="Total Charge" price={rate.total_charge} />
                  <h5 className="font-semibold mt-2">Tax</h5>
                  <ListRate
                    text="Import Duty charge"
                    price={rate.import_duty_charge}
                  />
                  <ListRate text="Sales Tax" price={rate.sales_tax} />
                  <ListRate
                    text="Provincial Sales Tax"
                    price={rate.provincial_sales_tax}
                  />
                  <ListRate
                    text="Import Tax Charge"
                    price={rate.import_tax_charge}
                  />
                  <ListRate
                    text="Estimated Import Tax"
                    price={rate.estimated_import_tax}
                  />
                  <ListRate
                    text="Estimated Import Duty"
                    price={rate.estimated_import_duty}
                  />
                  <ListRate
                    text="Import Tax Non-Chargeable"
                    price={rate.import_tax_non_chargeable}
                  />
                  <ListRate
                    text="Minimum Pickup Fee"
                    price={rate.minimum_pickup_fee}
                  />
                  <h5 className="font-semibold mt-2">Rating</h5>
                  {rate.tracking_rating > 0 && (
                    <span className="flex">
                      <p>Tracking Rating: </p>
                      <Ratings ratings={rate.tracking_rating} />
                    </span>
                  )}
                  {rate.tracking_rating > 0 && (
                    <span className="flex">
                      <p>Tracking Rating: </p>
                      <Ratings ratings={rate.tracking_rating} />
                    </span>
                  )}
                  {/* {rate.easyship_rating > 0 && (
                    <span>
                      <p>
                        Easyship Rating:{' '}
                        <Ratings ratings={rate.easyship_rating} />
                      </p>
                    </span>
                  )} */}
                  <h5 className="font-semibold mt-2">Note</h5>
                  {rate.payment_recipient && (
                    <p className="text-sm">
                      Payment Recipent: {rate.payment_recipient}
                    </p>
                  )}
                  <p className="text-sm">
                    Courier Remarks: {rate.courier_remarks}
                  </p>
                  <p className="text-xs mt-2">{rate.description}</p>
                  <p className="text-xs">{rate.full_description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
