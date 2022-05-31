import AccountDetailsForm from '@/components/Form/AccountDetailsForm'
import SaveShippingAddress from '@/components/Shipping/SaveShippingAddress'
import SlidingTab from '@/components/Slidingtab'

interface AccountDetailsProps {
  shipping?: boolean
}

export default function AccountDetails({
  shipping = false,
}: AccountDetailsProps) {
  return (
    <SlidingTab buttonColor="text-white">
      <div className="header h-40 flex items-end bg-mountain-green p-4 w-full px-8">
        <h3 className="font-bold text-md text-white text-xl 2xl:mr-4">
          Account Details
        </h3>
      </div>
      <div className="content px-8 w-full mx-auto">
        {!shipping && <AccountDetailsForm />}
        {shipping && <SaveShippingAddress />}
      </div>
    </SlidingTab>
  )
}
