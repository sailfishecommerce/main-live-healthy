import CheckedInputIcon from '@/components/Icons/CheckedInputIcon'

interface Props {
  content: {
    title: string
    price?: string
    value: string
  }
  updateShippingMethod: (value: string) => void
  shippingMethod: string | null
  className?: string
  addressHandler?: () => void
}

export default function BillingTag({
  content,
  updateShippingMethod,
  shippingMethod,
  className,
  addressHandler,
}: Props) {
  const selectedMethodStyled =
    shippingMethod === content.value ? 'bg-gray-300 text-white' : ''
  const tagClassName = className ? className : ''

  function billingTagHandler(contentValue: string) {
    updateShippingMethod(contentValue)
    return addressHandler !== undefined ? addressHandler() : null
  }

  return (
    <button
      type="button"
      aria-label="button"
      className={`${tagClassName} hover:bg-gray-100 shipping-method-tag ${selectedMethodStyled} my-1.5 rounded-xl border border-gray-300 p-2 justify-between flex items-cente`}
      onClick={() => billingTagHandler(content.value)}
    >
      <span className="flex items-center">
        {shippingMethod === content.value ? (
          <CheckedInputIcon />
        ) : (
          <input type="radio" className="mx-2" />
        )}
        <h4>{content.title}</h4>
      </span>
      {content.price && <p className="font-bold">{content.price}</p>}
    </button>
  )
}
