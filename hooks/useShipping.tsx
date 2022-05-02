import useSwell from '@/hooks/useSwell'

export default function useShipping() {
  const { swellInit } = useSwell()

  async function getShippingRates() {
    const { swell } = await swellInit()
    return await swell.cart.getShippingRates()
  }

  return { getShippingRates }
}
