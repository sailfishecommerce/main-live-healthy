import { currencySymbolFormatter } from '@/hooks/useCurrency'
import { formatPrice } from '@/lib/formatPrice'

interface FormatCurrencyProps {
  price: any | number | string
  className?: string
  currencies: any[]
  currency: any
}

export default function FormatCurrency({
  price,
  currencies,
  currency,
  className,
}: FormatCurrencyProps): JSX.Element {
  const priceClassName = className ? className : 'text-red-600 md:text-lg'
  const selectedCurrency = currencies?.filter(
    (currencyP: { code: string }) => currencyP.code === currency
  )
  const nPrice = Number(price)
  const priceRate = nPrice * selectedCurrency[0].rate

  const itemPrice = formatPrice(priceRate)
  return (
    <span className={priceClassName}>
      {currencySymbolFormatter(selectedCurrency[0])}
      {itemPrice}
    </span>
  )
}
