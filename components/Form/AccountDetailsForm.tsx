import AccountformContent from '@/json/account-details-form.json'

import Input from './form-elements/Input'

export default function AccountDetailsForm() {
  return (
    <form className="account-details-form my-4">
      <div className="content flex flex-col">
        {AccountformContent.AccountDetails.map((content, index) => (
          <Input content={content} key={index} />
        ))}
        <button
          type="button"
          className="bg-mountain-green w-full p-3 text-white font-bold rounded-xl"
        >
          Save account Information
        </button>
      </div>
    </form>
  )
}
