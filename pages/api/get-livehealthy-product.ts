import swell from "swell-node";
import type { NextApiRequest, NextApiResponse } from "next";

swell.init(
  "sailfish-e-commerce-limited",
  `${process.env.NEXT_PUBLIC_SWELL_SECRET_KEY}`
);

export default async function fetchProductFromLiveHealthStore(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      return await swell
        .get("/products", {
          where: { select_store: "livehealthy" },
          limit: 16,
        })
        .then((response: { results: any }) => {
          return res.status(200).json(response.results);
        })
        .catch((error: any) => {
          console.error("error", "Dave, an error occcured" );
          return res.status(400).json(error);
        });
    }
  }
}
