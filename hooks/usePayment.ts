import useSwell from "@/hooks/useSwell";

export default function usePayment() {
  const { swellInit } = useSwell();

  async function tokenizePayment() {
    const { swell } = await swellInit();

    return await swell.payment.tokenize({
      card: {
        onError: (err: any) => {
          console.log("error tokenizePayment", err);
          return err;
        },
        onSuccess: (ev: any) => {
          console.log("erv success", ev);
          return ev;
        },
      },
    });
  }

  async function submitUserOrder() {
    const { swell } = await swellInit();

    return await swell.cart.submitOrder();
  }

  return {
    tokenizePayment,
    submitUserOrder,
  };
}
