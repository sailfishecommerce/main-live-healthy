import { formatPrice } from '@/lib/formatPrice'

interface ListRateProps {
  text: string
  price: number
  currency: string
  className?: string
}

export default function ShippingList({
  currency,
  text,
  price,
  className,
}: ListRateProps) {
  const textClassName = className ? className : ''
  const titleClassName = className ? className : 'font-medium'
  return (
    <>
      {price > 0 && (
        <div
          className={`${textClassName} flex items-center justify-between w-3/4`}
        >
          <h6 className={titleClassName}>{text}:</h6>
          <span>
            <span className="mr-1">{currency}</span>
            {formatPrice(price)}
          </span>
        </div>
      )}
    </>
  )
}
