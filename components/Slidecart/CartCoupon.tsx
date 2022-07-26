import AppliedDiscountTag from '@/components/Tag/AppliedDiscountTag'
import useCoupon from '@/hooks/useCoupon'

interface Props {
  discounts: any[]
  coupon: any
}

export default function CartCoupon({ discounts, coupon }: Props) {
  const { couponInputHandler, useAddCoupon } = useCoupon()
  const addCoupon = useAddCoupon()

  return (
    <>
      <div className="discount flex  md:flex-row  items-center justify-between mt-2">
        <div className="input-wrapper md:w-1/2 w-1/2 my-2 md:my-0 relative">
          <input
            placeholder="Enter promocode"
            type="text"
            className="border rounded-lg px-2 py-2 w-full"
            onChange={couponInputHandler}
          />
        </div>
        <button
          aria-label="add discount code"
          type="button"
          className="rounded-xl flex items-center discountCode lg:w-2/5 bg-mountain-green text-white md:px-4 py-3 p-2 text-xs lg:text-sm font-medium"
          onClick={() => addCoupon.mutate()}
        >
          Add discount code
        </button>
      </div>

      {coupon && (
        <div className="applied-discounts">
          <h3 className="font-bold text-sm">Applied Discounts</h3>
          <div className="applied-discounts-tags flex flex-wrap">
            {discounts.map((discount: any) => (
              <AppliedDiscountTag key={discount.id} coupon={coupon} />
            ))}
          </div>
        </div>
      )}
      <style jsx>
        {`
          @media (max-width: 768px) {
            .input-wrapper input {
              height: 25px;
            }
            .discountCode {
              height: 25px;
              display: flex;
              align-items: center;
            }
          }
        `}
      </style>
    </>
  )
}
