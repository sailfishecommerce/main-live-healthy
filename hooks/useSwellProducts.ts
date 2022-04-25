import axios from "axios";
import { useQuery } from "react-query";
import useSwell from "@/hooks/useSwell";

type filterType = {
  page: number;
  limit: number;
  sort: string;
  categories: string; // optional category slug or ID
  $filters: {
    price: number[];
    category: string[];
    size: string[];
  };
};

export default function useSwellProducts() {
  const { swellInit } = useSwell();

  async function listProducts() {
    const { swell } = await swellInit();
    return await swell.products.list({
      limit: 25,
      page: 1,
    });
  }
  async function allProducts() {
    const { swell } = await swellInit();
    return await swell.products.list();
  }

  async function filterProducts(filter: filterType) {
    const { swell } = await swellInit();
    return await swell.products.list({
      ...filter,
    });
  }

  async function getProductsInCategory(category: string) {
    const { swell } = await swellInit();
    return await swell.products.list({
      category,
    });
  }

  async function getAllAttributes() {
    const { swell } = await swellInit();
    return await swell.attributes.list({
      limit: 25,
      page: 1,
    });
  }

  return {
    listProducts,
    allProducts,
    filterProducts,
    getAllAttributes,
    getProductsInCategory,
  };
}

export function useLiveHealthyProduct(): any {
  function fetchLiveHealthyProducts() {
    return axios.get("/api/get-livehealthy-product");
  }
  const {
    data: liveHealthyProduct,
    status: liveHealthyProductStatus,
    error: liveHealthyProductError,
  } = useQuery("fetchLiveHealthyProducts", fetchLiveHealthyProducts);

  return {
    liveHealthyProduct,
    liveHealthyProductStatus,
    liveHealthyProductError,
  };
}
