import useSwell from '@/hooks/useSwell'

export default function usePayment() {
  const { swellInit } = useSwell()

  async function tokenizePayment() {
    const { swell } = await swellInit()

    return await swell.payment.tokenize({
      card: {
        onError: (err: any) => {
          return err
        },
        onSuccess: (ev: any) => {
          return ev
        },
      },
    })
  }

  async function submitUserOrder() {
    const { swell } = await swellInit()

    return await swell.cart.submitOrder()
  }

  return {
    tokenizePayment,
    submitUserOrder,
  }
}
