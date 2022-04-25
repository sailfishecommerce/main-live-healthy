import AccountDetailsForm from '@/components/Form/AccountDetailsForm'
import SaveShippingAddress from '@/components/Shipping/SaveShippingAddress'
import SlidingTab from '@/components/Slidingtab'

export default function AccountDetails() {
  return (
    <SlidingTab buttonColor="text-white">
      <div className="header h-40 flex items-end bg-mountain-green p-4 w-full px-8">
        <h3 className="font-bold text-md text-white text-xl 2xl:mr-4">
          Account Details
        </h3>
      </div>
      <div className="content px-8 w-full mx-auto">
        <AccountDetailsForm />
        <SaveShippingAddress />
      </div>
    </SlidingTab>
  )
}
