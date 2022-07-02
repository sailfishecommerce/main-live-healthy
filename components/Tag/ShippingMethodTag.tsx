/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom } from 'jotai'
import { useEffect } from 'react'

import CheckedInputIcon from '@/components/Icons/CheckedInputIcon'
import FormattedPrice from '@/components/Price/FormattedPrice'
import { watchCheckoutFormAtom } from '@/lib/atomConfig'

interface Props {
  content: {
    id: string
    name: string
    price: number
    value: string
    description?: string
  }
  updateShippingMethod: (value: string) => void
  shippingMethod: string | null
  className?: string
}

export default function ShippingMethodTag({
  content,
  updateShippingMethod,
  shippingMethod,
  className,
}: Props) {
  const selectedMethodStyled =
    shippingMethod === content.id ? 'bg-gray-300 text-white' : ''
  const tagClassName = className ? className : ''
  const [watchCheckoutForm, setWatchCheckoutForm] = useAtom(
    watchCheckoutFormAtom
  )

  useEffect(() => {
    if (
      shippingMethod !== undefined &&
      !watchCheckoutForm.includes('shipping-rate')
    ) {
      setWatchCheckoutForm([...watchCheckoutForm, 'shipping-rate'])
    }
  }, [shippingMethod, watchCheckoutForm])

  return (
    <button
      type="button"
      aria-label="button"
      className={`${tagClassName} flex-col shipping-method-tag ${selectedMethodStyled} my-1.5 rounded-xl border border-gray-300 p-2 justify-between flex items-cente`}
      onClick={() => updateShippingMethod(content.id)}
    >
      <div className="row flex items-center justify-between w-full">
        <span className="flex items-center">
          {shippingMethod === content.id ? (
            <CheckedInputIcon />
          ) : (
            <input type="radio" className="mx-2" />
          )}
          <h4>{content.name}</h4>
        </span>
        {content.price === 0 ? (
          <p className="font-bold">FREE</p>
        ) : (
          <FormattedPrice className="font-bold" price={content.price} />
        )}
      </div>
      <p className="text-xs">{content?.description}</p>
    </button>
  )
}
