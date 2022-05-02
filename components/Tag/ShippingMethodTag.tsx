import CheckedInputIcon from '@/components/Icons/CheckedInputIcon'
import FormattedPrice from '@/components/Price/FormattedPrice'

interface Props {
  content: {
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
    shippingMethod === content.value ? 'bg-gray-300 text-white' : ''
  const tagClassName = className ? className : ''
  return (
    <button
      type="button"
      className={`${tagClassName} flex-col shipping-method-tag ${selectedMethodStyled} my-1.5 rounded-xl border border-gray-300 p-2 justify-between flex items-cente`}
      onClick={() => updateShippingMethod(content.value)}
    >
      <div className="row flex items-center justify-between w-full">
        <span className="flex items-center">
          {shippingMethod === content.value ? (
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
