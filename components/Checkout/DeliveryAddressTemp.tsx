/* eslint-disable react/no-array-index-key */

import BillingAddress from '@/components/Checkout/BillingAddress'
import ContactInformationForm from '@/components/Checkout/ContactInformationForm'
import { displayFormElement } from '@/components/Form/FormElement'
import checkoutFormContent from '@/json/checkout-form.json'

export default function DeliveryAddressTemp() {
  return (
    <div className="w-full height-fit-content bg-white p-4 my-4 md:my-0 mx-0 rounded-md">
      <h3 className="font-semibold mb-2 text-xl mr-2">2. Specify details</h3>
      <ContactInformationForm>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
        />
      </ContactInformationForm>
      <div className="delivery-form">
        <h3 className="font-bold my-5 text-lg">Shipping address</h3>

        <div>
          {checkoutFormContent.personalDetails.content.map((formRow, index) => (
            <div key={index} className="flex flex-wrap">
              {formRow.map((formInput, indexN: number) => {
                const inputStyle =
                  formRow.length === 1 ? 'w-full' : `w-1/${formRow.length}`
                return (
                  <div key={indexN} className={inputStyle}>
                    {displayFormElement(formInput, formik)}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="save-info border-b pb-4 mt-2 flex items-center">
          <input type="checkbox" />{' '}
          <p className="ml-4">Save this information for next time</p>
        </div>
        <BillingAddress />
      </div>
    </div>
  )
}
