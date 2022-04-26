import CheckedInputIcon from '@/components/Icons/CheckedInputIcon'

interface Props {
  content: {
    title: string
    price: string
    value: string
  }
  updateShippingMethod: (value: string) => void
  shippingMethod: string
}

export default function ShippingMethodTag({
  content,
  updateShippingMethod,
  shippingMethod,
}: Props) {
  const selectedMethodStyled =
    shippingMethod === content.value ? 'bg-gray-400 text-white' : ''
  return (
    <button
      type="button"
      className={`shipping-method-tag ${selectedMethodStyled} my-1.5 rounded-xl border border-gray-300 p-2 justify-between flex items-cente`}
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
      <p className="font-bold">{content.price}</p>
    </button>
  )
}
