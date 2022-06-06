/* eslint-disable react/no-array-index-key */
import SelectFormElement from '@/components/Form/SelectFormElement'
import checkoutFormContent from '@/json/checkout-form.json'

export default function ShippingAddressForm() {
  return (
    <>
      <h3 className="font-bold my-5 text-lg">Shipping address</h3>
      <form className="mt-4">
        {checkoutFormContent.personalDetails.content.map((inputRow, index) => {
          const inputStyle =
            inputRow.length === 1
              ? 'w-full mx-2'
              : `w-1/${inputRow.length} mx-2`
          return (
            <div key={index} className="flex">
              {inputRow.map((input) => (
                <SelectFormElement
                  input={input}
                  key={input.id}
                  className={inputStyle}
                />
              ))}
            </div>
          )
        })}
        <div className="save-info border-b pb-4 mt-2 flex items-center">
          <input type="checkbox" />{' '}
          <p className="ml-4">Save this information for next time</p>
        </div>
      </form>
    </>
  )
}
