import { currencySymbolFormatter } from '@/hooks/useCurrency'
import { formatPrice } from '@/lib/formatPrice'

interface FormatCurrencyProps {
  price: any | number | string
  className?: string
  currencies: any[]
}

export default function FormatCurrency({
  price,
  currencies,
  className,
}: FormatCurrencyProps): JSX.Element {
  const priceClassName = className ? className : 'text-red-600 md:text-lg'
  const selectedCurrency = currencies?.filter(
    (currencyP: { code: string }) => currencyP.code === 'HKD'
  )
  const nPrice = Number(price)
  const itemNPrice = formatPrice(nPrice)

  return (
    <span className={priceClassName}>
      {currencySymbolFormatter(selectedCurrency[0])}
      {itemNPrice}
    </span>
  )
}
