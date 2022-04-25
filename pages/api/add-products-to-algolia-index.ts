import type { NextApiRequest, NextApiResponse } from "next";
import algoliasearch from "algoliasearch";

export default function AddProductToAlgoliaIndiceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = algoliasearch(
    "CZT5MA7JLJ",
    `${process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY}`
  );
  const index = client.initIndex("New_Livehealthy_products_index");

  console.log("req.method", req.method, "req.body", req.body);

  switch (req.method) {
    case "POST": {
      index
        .saveObjects(req.body, {
          autoGenerateObjectIDIfNotExist: true,
        })
        .then((response) => {
          return res.status(200).json(response);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    }
  }
}
