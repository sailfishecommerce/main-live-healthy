import Button from '@/components/Button'
import useSlidingTab from '@/hooks/useSlidingTab'
import getCountry from '@/lib/getCountry'

export default function AccountDetail({ userDetail }: any) {
  const { updateSlideTab } = useSlidingTab()

  return (
    <div className="account-details">
      <h3 className="font-bold md:text-xl mb-4 text-lg">Account Details</h3>
      <ul className="details mb-4 md:mb-6 ">
        <li className="flex flex-col lg:flex-row my-2">
          <p className="mb-0 mr-1">Name:</p>
          <p className="font-medium">{userDetail?.name}</p>
        </li>
        <li className="flex flex-col lg:flex-row my-2">
          <p className="mb-0 mr-1">Email:</p>
          <p className="font-medium">{userDetail?.email}</p>
        </li>
        <li className="flex flex-col lg:flex-row my-2">
          <p className="mb-0 mr-1">Phone:</p>
          <p className="font-medium">{userDetail?.shipping?.phone}</p>
        </li>
        <li className="flex flex-col lg:flex-row my-2">
          <p className="mb-0 mr-1">Address:</p>
          <span className="font-medium">
            <p>
              {userDetail?.shipping?.address1}, {userDetail?.shipping?.city} ,{' '}
              {userDetail?.shipping?.state} ,{' '}
              {getCountry(userDetail?.shipping?.country)}
            </p>
          </span>
        </li>
        <li className="flex flex-col lg:flex-row my-2">
          <p className="mb-0 mr-1">Number of Orders:</p>
          <p className="font-medium">{userDetail.orderCount}</p>
        </li>
      </ul>
      <div className="button-group flex flex-col md:flex-row  items-center mb-14">
        <Button
          type="button"
          text="Change account info"
          className="light-green my-2 md:mr-8 w-full md:w-1/4"
          onClick={() => updateSlideTab('SLIDING-ACCOUNT')}
        />
        <Button
          type="button"
          text="Change Shipping / Billing Address"
          className="plain my-2 w-full md:w-1/4"
          onClick={() => updateSlideTab('SLIDING-ACCOUNT-SHIPPING')}
        />
      </div>
    </div>
  )
}
