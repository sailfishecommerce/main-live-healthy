import { formatPrice } from '@/lib/formatPrice'

interface ListRateProps {
  text: string
  price: number
  currency: string
}

export default function ShippingList({ currency, text, price }: ListRateProps) {
  return (
    <>
      {price > 0 && (
        <div className="flex items-center justify-between w-3/4">
          <h6 className="font-medium">{text}:</h6>
          <span>
            <span className="mr-1">{currency}</span>
            {formatPrice(price)}
          </span>
        </div>
      )}
    </>
  )
}
