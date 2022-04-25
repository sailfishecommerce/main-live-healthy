import { currencySymbolFormatter } from '@/hooks/useCurrency'
import useQueryData from '@/hooks/useQueryData'
import { numberWithCommas } from '@/lib/formatPrice'

import { useAppSelector } from './useRedux'

export function useStorePrice() {
  const { currency } = useAppSelector((state) => state.currencyLanguage)
  const currencies: any = useQueryData('currencies')

  const selectedCurrency = currencies
    ? currencies?.filter(
        (currencyP: { code: string }) => currencyP.code === currency
      )
    : [{ symbol: '$', rate: 1 }]

  const currentCurrencySymbol = currencySymbolFormatter(selectedCurrency[0])

  const exchangePrice = (price: number) =>
    currencies ? price * selectedCurrency[0].rate : 0

  function formatPrice(price: number) {
    const priceRate = price * selectedCurrency[0].rate
    const currencySymbol = currencySymbolFormatter(selectedCurrency[0])
    return `${currencySymbol} ${numberWithCommas(priceRate)}`
  }

  function numberWithComma(price: number) {
    return numberWithCommas(price)
  }

  return { formatPrice, currentCurrencySymbol, exchangePrice, numberWithComma }
}
