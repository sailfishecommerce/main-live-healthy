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
}

export default function BillingTag({
  content,
  updateShippingMethod,
  shippingMethod,
  className,
}: Props) {
  const selectedMethodStyled =
    shippingMethod === content.value ? 'bg-gray-300 text-white' : ''
  const tagClassName = className ? className : ''
  return (
    <button
      type="button"
      aria-label="button"
      className={`${tagClassName} shipping-method-tag ${selectedMethodStyled} my-1.5 rounded-xl border border-gray-300 p-2 justify-between flex items-cente`}
      onClick={() => updateShippingMethod(content.value)}
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
