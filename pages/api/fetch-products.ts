import swell from "swell-node";
import type { NextApiRequest, NextApiResponse } from "next";
import swellNodeInit from "../../lib/swellNode";

export default async function fetchProductsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  swellNodeInit();

  switch (req.method) {
    case "GET": {
      return await swell
        .get("/products", {
          where: { select_store: "livehealthy" },
          limit: 100,
          page: 1,
        })
        .then((response: any) => {
          return res.status(200).send(response.results);
        })
        .catch((error: any) => {
          console.log("error", error?.message);
        });
    }
  }
}
