import Ratings from '@/components/Reviews/Ratings'
import { formatPrice } from '@/lib/formatPrice'

interface ListRateProps {
  text: string
  price: number
  currency: string
}

function ListRate({ currency, text, price }: ListRateProps) {
  return (
    <>
      {price > 0 && (
        <div className="flex items-center justify-between w-3/4">
          <h6 className="font-medium">{text}:</h6>
          <span>
            {currency}
            {formatPrice(price)}
          </span>
        </div>
      )}
    </>
  )
}

export default function ShippingRateCard({ rate, index }: any) {
  const indexValue = index + 1
  return (
    <li className="border border-2 p-2 hover:bg-gray-100">
      <div className="index rounded-full hover:bg-gray-600 bg-black text-white w-4 h-4 flex items-center justify-center mb-4">
        {indexValue}
      </div>
      <h4 className="font-medium">Courier: {rate.courier_name}</h4>
      <h5 className="font-semibold mt-2">Pricing</h5>
      <ListRate
        currency={rate.currency}
        text="Fuel Surcharge"
        price={rate.fuel_surcharge}
      />
      <ListRate
        currency={rate.currency}
        text="Shipment Charge"
        price={rate.shipment_charge}
      />
      <ListRate
        currency={rate.currency}
        text="Remote Area Surcharge"
        price={rate.remote_area_surcharge}
      />
      <ListRate
        currency={rate.currency}
        text="Oversized Surcharge"
        price={rate.oversized_surcharge}
      />
      <ListRate
        currency={rate.currency}
        text="Additional Services Surcharge"
        price={rate.additional_services_surcharge}
      />
      <ListRate
        currency={rate.currency}
        text="Residential full fee"
        price={rate.residential_full_fee}
      />
      <ListRate
        currency={rate.currency}
        text="Residential discounted fee"
        price={rate.residential_discounted_fee}
      />
      <ListRate
        currency={rate.currency}
        text="Insurance Fee Charge"
        price={rate.insurance_fee}
      />
      <ListRate
        currency={rate.currency}
        text="Warehouse Handling Fee"
        price={rate.warehouse_handling_fee}
      />
      <ListRate
        currency={rate.currency}
        text="DDP Handling Fee"
        price={rate.ddp_handling_fee}
      />
      <ListRate
        currency={rate.currency}
        text="Shipment Charge Total"
        price={rate.shipment_charge_total}
      />
      <ListRate
        currency={rate.currency}
        text="Total Charge"
        price={rate.total_charge}
      />
      <h5 className="font-semibold mt-2">Tax</h5>
      <ListRate
        currency={rate.currency}
        text="Import Duty charge"
        price={rate.import_duty_charge}
      />
      <ListRate
        currency={rate.currency}
        text="Sales Tax"
        price={rate.sales_tax}
      />
      <ListRate
        currency={rate.currency}
        text="Provincial Sales Tax"
        price={rate.provincial_sales_tax}
      />
      <ListRate
        currency={rate.currency}
        text="Import Tax Charge"
        price={rate.import_tax_charge}
      />
      <ListRate
        currency={rate.currency}
        text="Estimated Import Tax"
        price={rate.estimated_import_tax}
      />
      <ListRate
        currency={rate.currency}
        text="Estimated Import Duty"
        price={rate.estimated_import_duty}
      />
      <ListRate
        currency={rate.currency}
        text="Import Tax Non-Chargeable"
        price={rate.import_tax_non_chargeable}
      />
      <ListRate
        currency={rate.currency}
        text="Minimum Pickup Fee"
        price={rate.minimum_pickup_fee}
      />
      <h5 className="font-semibold mt-2">Rating</h5>
      {rate.tracking_rating > 0 && (
        <span className="flex w-3/4 justify-between">
          <p>Tracking Rating: </p>
          <Ratings ratings={rate.tracking_rating} />
        </span>
      )}
      {rate.tracking_rating > 0 && (
        <span className="flex w-3/4 justify-between">
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
        <p className="text-sm">Payment Recipent: {rate.payment_recipient}</p>
      )}
      <p className="text-sm">Courier Remarks: {rate.courier_remarks}</p>
      <p className="text-xs mt-2 italic">{rate.description}</p>
      <p className="text-xs italic">{rate.full_description}</p>
    </li>
  )
}
