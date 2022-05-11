import { formatPrice } from '@/lib/formatPrice'

interface FormatCurrencyProps {
  price: any | number | string
  className?: string
  currencies: any[]
}

export default function FormatCurrency({
  price,
  className,
}: FormatCurrencyProps): JSX.Element {
  const priceClassName = className ? className : 'text-red-600 md:text-lg'

  const nPrice = Number(price)
  const itemNPrice = formatPrice(nPrice)

  return <span className={priceClassName}>HKD ${itemNPrice}</span>
}
