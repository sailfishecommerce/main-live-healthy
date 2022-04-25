import useSwell from "@/hooks/useSwell";

export default function useOrder() {
  const { swellInit } = useSwell();

  async function getLastOrderDetails() {
    const { swell } = await swellInit();
    return await swell.cart.getOrder();
  }
  return {
    getLastOrderDetails,
  };
}
