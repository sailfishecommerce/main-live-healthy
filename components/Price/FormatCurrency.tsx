import { currencySymbolFormatter } from '@/hooks/useCurrency'
import { formatPrice } from '@/lib/formatPrice'

interface FormatCurrencyProps {
  price: any | number | string
  isProduct?: boolean
  className?: string
  currencies: any[]
  currency: any
}

export default function FormatCurrency({
  price,
  isProduct,
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

  const productItemPrice = isProduct ? priceRate : nPrice
  const itemPrice = formatPrice(productItemPrice)
  return (
    <span className={priceClassName}>
      {currencySymbolFormatter(selectedCurrency[0])}
      {itemPrice}
    </span>
  )
}
