import useSwell from '@/hooks/useSwell'

export default function useProduct() {
  const { swellInit } = useSwell()

  async function getAProduct(productID: string) {
    const { swell } = await swellInit()
    return await swell.products.get(productID)
  }

  return { getAProduct }
}
