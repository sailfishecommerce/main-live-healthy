import { memo } from 'react'

import { formatPrice } from '@/lib/formatPrice'

interface FormattedPriceProps {
  price: number | string
  className?: string
  currency?: string
}

function FormattedPriceComponent({
  price,
  currency,
  className,
}: FormattedPriceProps): JSX.Element {
  const priceClassName = className ? className : 'text-red-600 md:text-lg'

  const nPrice = Number(price)
  const itemNPrice = formatPrice(nPrice)
  const storeCurrency = currency ? currency : 'HK$'
  return (
    <span className={priceClassName}>
      {storeCurrency}
      {itemNPrice}
    </span>
  )
}

const FormattedPrice = memo(FormattedPriceComponent)

export default FormattedPrice
