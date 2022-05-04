/* eslint-disable no-nested-ternary */
import { memo } from 'react'
import { useQuery } from 'react-query'

import { LineLoader } from '@/components/Loader/ProductsLoader'
import FormatCurrency from '@/components/Price/FormatCurrency'
import useCurrency from '@/hooks/useCurrency'
import { useAppSelector } from '@/hooks/useRedux'

interface FormattedPriceProps {
  price: number | string
  className?: string
}

function FormattedPriceComponent({
  price,
  className,
}: FormattedPriceProps): JSX.Element {
  const { listEnabledCurrencies } = useCurrency()
  const { data: currencyList, status } = useQuery(
    'useCurrencies',
    listEnabledCurrencies
  )
  console.log('price', price)

  const { currency } = useAppSelector((state) => state.currencyLanguage)
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
          currency={currency}
          className={className}
        />
      )}
    </>
  )
}

const FormattedPrice = memo(FormattedPriceComponent)

export default FormattedPrice
