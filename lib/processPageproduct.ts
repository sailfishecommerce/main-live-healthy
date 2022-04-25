import swell from "swell-node";
import swellNodeInit from "@/lib/swellNode";

export default async function fetchAllSwellProducts() {
  swellNodeInit();
  const products = await swell.get("/products", {
    where: { select_store: "livehealthy" },
    limit: 1000,
  });

  let productsDataArray: any = [];
  const loopProductCount = Math.ceil(products.count / 1000);
  const productArray = new Array(loopProductCount).fill(0);

  const productData: any = productArray.map(async (_, index) => {
    const page = index + 1;
    return await swell
      .get("/products", {
        where: { select_store: "livehealthy" },
        limit: 1000,
        page,
      })
      .then((response: any) => {
        productsDataArray.push(...response.results);
        return productsDataArray;
      })
      .then((response: any) => response)
      .catch((err: any) => {
        console.log("error", err);
      });
  });

  return productData;
}
