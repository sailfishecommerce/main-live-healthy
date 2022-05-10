/* eslint-disable no-nested-ternary */
import { memo } from 'react'

import { LineLoader } from '@/components/Loader/ProductsLoader'
import FormatCurrency from '@/components/Price/FormatCurrency'
import { useCurrencies } from '@/hooks/useCurrency'

interface FormattedPriceProps {
  price: number | string
  className?: string
}

function FormattedPriceComponent({
  price,
  className,
}: FormattedPriceProps): JSX.Element {
  const { currencyList, status } = useCurrencies()

  return (
    <>
      {status === 'error' ? (
        <p>unable to fetch price</p>
      ) : status === 'loading' ? (
        <LineLoader />
      ) : (
        <FormatCurrency
          price={price}
          currencies={currencyList}
          className={className}
        />
      )}
    </>
  )
}

const FormattedPrice = memo(FormattedPriceComponent)

export default FormattedPrice
