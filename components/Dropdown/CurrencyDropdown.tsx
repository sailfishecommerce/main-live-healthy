// import Image from 'next/image'
import { memo } from 'react'

// import Dropdown from '@/components/Dropdown'
// import DropdownItem from '@/components/Dropdown/DropdownItem'
// import Dropup from '@/components/Dropup'
// import DropupItem from '@/components/Dropup/DropupItem'
// import { useToast } from '@/hooks'
// import useCurrency from '@/hooks/useCurrency'
// import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
// import { updateCurrency } from '@/redux/currency-language-slice'

// interface Props {
//   className?: string
//   up?: boolean
// }

// type dropdownType = { code: string; symbol: string }

function CurrencyDropdownComponent() {
  // const dispatch = useAppDispatch()
  // const { isLoading, isSuccessful, hasError } = useToast()
  // const { selectCurrencies } = useCurrency()
  // const { currencyList } = useCurrencies()

  // const { currency } = useAppSelector((state) => state.currencyLanguage)

  // function DropdownText() {
  //   return (
  //     <div className="items-center flex">
  //       <div className={className}>
  //         <Image
  //           src="/flags/en.webp"
  //           width={30}
  //           height={30}
  //           alt="en"
  //           layout="fixed"
  //         />
  //       </div>
  //       <p className="m-0 text-xs md:text-sm md:ml-4 font-bold">{`En / ${currency}`}</p>
  //     </div>
  //   )
  // }

  // const selectCurrency = useCallback((e: any) => {
  //   const loading = isLoading()
  //   return selectCurrencies(e.target.value)
  //     .then((response) => {
  //       isSuccessful(loading, `${response.currency} selected`)
  //       dispatch(updateCurrency(response.currency))
  //     })
  //     .catch((error) => {
  //       hasError(loading, 'an error occured, please try again')
  //       dispatch(updateCurrency('USD'))
  //       console.error('error', error)
  //     })
  // }, [])

  // function DropdownElement() {
  //   return (
  //     <Dropdown dropdownText={<DropdownText />}>
  //       {/* {currencyList
  //         ? currencyList?.map((item: dropdownType) => (
  //             <DropdownItem key={item.code} onClick={selectCurrency}>
  //               {item.symbol} {item.code}
  //             </DropdownItem>
  //           ))
  //         : ''} */}
  //     </Dropdown>
  //   )
  // }

  // function DropupElement() {
  //   return (
  //     <Dropup dropupText={<DropdownText />}>
  //       {/* {currencyList
  //         ? currencyList?.map((item: dropdownType) => (
  //             <DropupItem key={item.code} onClick={selectCurrency}>
  //               {item.symbol} {item.code}
  //             </DropupItem>
  //           ))
  //         : ''} */}
  //     </Dropup>
  //   )
  // }

  // return currencyList === undefined ? (
  //   <p>unable to load currencies</p>
  // ) : currencyList === null ? (
  //   <p>loading currencies...</p>
  // ) : up ? (
  //   <DropupElement />
  // ) : (
  //   <DropdownElement />
  // )
  return null
}

const CurrencyDropdown = memo(CurrencyDropdownComponent)
export default CurrencyDropdown
