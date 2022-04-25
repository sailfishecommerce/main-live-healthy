import swell from "swell-node";
import type { NextApiRequest, NextApiResponse } from "next";
import productModel from "../../lib/productModel";

swell.init("sailfish-e-commerce-limited", "5qBYeK0FS6djOP7TzCWOQ5hWQZZzzvnr");

export default async function createSwellProductHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const record = req.body.record;
  const product = req.body.record.fields;
  const productData = productModel(product, record);
  switch (req.method) {
    case "POST": {
      return await swell
        .post("/products", productData)
        .then((response: any) => {
          console.log("response createSwellProductHandler", response);
          return res.status(200).json(response);
        })
        .catch((error: any) => {
          console.error("error createSwellProductHandler", error);
          return res.status(400).json(error);
        });
    }
  }
}
