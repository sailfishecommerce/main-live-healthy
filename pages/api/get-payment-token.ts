import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default function getPaymentTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      axios
        .request({
          url: `${process.env.NEXT_PUBLIC_AIRWALLEX_DEMO_BASE_API}/authentication/login`,
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-client-id": `${process.env.NEXT_PUBLIC_AIRWALLEX_DEMO_ID}`,
            "x-api-key": `${process.env.NEXT_PUBLIC_AIRWALLEX_DEMO_API_KEY}`,
          },
        })
        .then((response) => {
          console.log("getAccessTokenData", response?.data);
          return res.status(200).json(response.data);
        })
        .catch((error) => {
          console.log("getAccessTokenError", error);
          return res.status(400).json(error);
        });
    }
  }
}
