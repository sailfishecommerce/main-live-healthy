import useSwell from "@/hooks/useSwell";

const inputClasses = {
  base: "pt-2 items-center border border-gray-200 px-2 rounded-md h-10 focus:text-gray-700 focus:bg-white focus:border-red-500 focus:outline-none StripeElement",
};

export default function useStripeElement() {
  const { swellInit } = useSwell();

  async function createStripeElement() {
    const { swell } = await swellInit();
    return swell.payment.createElements({
      card: {
        elementId: "#card-element-id",
        options: {
          classes: inputClasses,
          placeholder: "Credit Card Number",
          showIcon: true,
          iconStyle: "solid",
          hidePostalCode: true,
        },
      },
    });
  }

  return { createStripeElement };
}
