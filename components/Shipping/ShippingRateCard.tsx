import ShippingList from '@/components/Shipping/ShippingList'
import ShippingRating from '@/components/Shipping/ShippingRating'
import type { ShippingRateCardType } from '@/typings/types'

interface Props {
  index: number
  rate: ShippingRateCardType
  onClickHandler: (rate: ShippingRateCardType) => void
  selectedCourier: string | null
}

export default function ShippingRateCard({
  rate,
  index,
  selectedCourier,
  onClickHandler,
}: Props) {
  const totalCharge =
    rate.shipment_charge_total === rate.total_charge
      ? rate.shipment_charge_total
      : rate.total_charge
  const indexValue = index + 1
  const activeRateStyle =
    selectedCourier === rate.courier_id ? 'bg-gray-200' : ''
  return (
    <li
      className={`${activeRateStyle} border border-2 p-3 rounded-lg hover:bg-gray-100 my-3`}
    >
      <button
        type="button"
        className="items-start flex flex-col"
        onClick={() => onClickHandler(rate)}
      >
        <div className="index rounded-full hover:bg-gray-600 bg-black text-white w-4 h-4 flex items-center justify-center mb-4">
          {indexValue}
        </div>
        <h4 className="font-bold underline">Courier: {rate.courier_name}</h4>
        <h5 className="font-semibold mt-1">Pricing</h5>
        <ShippingList
          currency={rate.currency}
          text="Fuel Surcharge"
          price={rate.fuel_surcharge}
        />
        <ShippingList
          currency={rate.currency}
          text="Shipment Charge"
          price={rate.shipment_charge}
        />
        <ShippingList
          currency={rate.currency}
          text="Remote Area Surcharge"
          price={rate.remote_area_surcharge}
        />
        <ShippingList
          currency={rate.currency}
          text="Oversized Surcharge"
          price={rate.oversized_surcharge}
        />
        <ShippingList
          currency={rate.currency}
          text="Additional Services Surcharge"
          price={rate.additional_services_surcharge}
        />
        <ShippingList
          currency={rate.currency}
          text="Residential full fee"
          price={rate.residential_full_fee}
        />
        <ShippingList
          currency={rate.currency}
          text="Residential discounted fee"
          price={rate.residential_discounted_fee}
        />
        <ShippingList
          currency={rate.currency}
          text="Insurance Fee Charge"
          price={rate.insurance_fee}
        />
        <ShippingList
          currency={rate.currency}
          text="Warehouse Handling Fee"
          price={rate.warehouse_handling_fee}
        />
        <ShippingList
          currency={rate.currency}
          text="DDP Handling Fee"
          price={rate.ddp_handling_fee}
        />
        <ShippingList
          currency={rate.currency}
          text="Shipment Charge Total"
          className="font-bold"
          price={totalCharge}
        />
        {rate.provincial_sales_tax ||
        rate.estimated_import_tax ||
        rate.estimated_import_duty ||
        rate.import_duty_charge ||
        rate.import_tax_non_chargeable ? (
          <h5 className="font-semibold mt-1">Tax</h5>
        ) : (
          ''
        )}
        <ShippingList
          currency={rate.currency}
          text="Import Duty charge"
          price={rate.import_duty_charge}
        />
        <ShippingList
          currency={rate.currency}
          text="Sales Tax"
          price={rate.sales_tax}
        />
        <ShippingList
          currency={rate.currency}
          text="Provincial Sales Tax"
          price={rate.provincial_sales_tax}
        />
        <ShippingList
          currency={rate.currency}
          text="Import Tax Charge"
          price={rate.import_tax_charge}
        />
        <ShippingList
          currency={rate.currency}
          text="Estimated Import Tax"
          price={rate.estimated_import_tax}
        />
        <ShippingList
          currency={rate.currency}
          text="Estimated Import Duty"
          price={rate.estimated_import_duty}
        />
        <ShippingList
          currency={rate.currency}
          text="Import Tax Non-Chargeable"
          price={rate.import_tax_non_chargeable}
        />
        <ShippingList
          currency={rate.currency}
          text="Minimum Pickup Fee"
          price={rate.minimum_pickup_fee}
        />
        <h5 className="font-semibold mt-1">Rating</h5>
        <ShippingRating rating={rate.tracking_rating} text="Tracking Rating" />
        <ShippingRating rating={rate.easyship_rating} text="Easyship Rating" />
        <h5 className="font-semibold mt-1">Note</h5>
        {rate.payment_recipient && (
          <p className="text-sm">Payment Recipent: {rate.payment_recipient}</p>
        )}
        {rate?.courier_remarks && (
          <p className="text-sm">Courier Remarks: {rate?.courier_remarks}</p>
        )}
        {rate?.full_description && (
          <p className="text-xs italic">{rate.full_description}</p>
        )}
      </button>
    </li>
  )
}
