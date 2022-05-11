import { memo } from 'react'

import { formatPrice } from '@/lib/formatPrice'

interface FormattedPriceProps {
  price: number | string
  className?: string
}

function FormattedPriceComponent({
  price,
  className,
}: FormattedPriceProps): JSX.Element {
  const priceClassName = className ? className : 'text-red-600 md:text-lg'

  const nPrice = Number(price)
  const itemNPrice = formatPrice(nPrice)

  return <span className={priceClassName}>HKD ${itemNPrice}</span>
}

const FormattedPrice = memo(FormattedPriceComponent)

export default FormattedPrice
