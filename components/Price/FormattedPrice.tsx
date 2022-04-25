/* eslint-disable no-nested-ternary */
import { memo } from 'react'
import { useQuery } from 'react-query'

import { LineLoader } from '@/components/Loader/ProductsLoader'
import useCurrency from '@/hooks/useCurrency'
import { useAppSelector } from '@/hooks/useRedux'

import FormatCurrency from './FormatCurrency'

interface FormattedPriceProps {
  price: number | string
  isProduct?: boolean
  className?: string
}

function FormattedPriceComponent({
  price,
  isProduct,
  className,
}: FormattedPriceProps): JSX.Element {
  const { listEnabledCurrencies } = useCurrency()
  const { data: currencyList, status } = useQuery(
    'useCurrencies',
    listEnabledCurrencies
  )

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
          isProduct={isProduct}
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
