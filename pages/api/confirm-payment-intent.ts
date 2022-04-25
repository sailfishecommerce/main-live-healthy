import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default function CreatePaymentIntentHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req.body", req.body);
  console.log(
    "req.body.payment_method",
    req.body.cardDetails.payment_method.card
  );
  switch (req.method) {
    case "POST": {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_AIRWALLEX_DEMO_BASE_API}/pa/payment_intents/${req.body.id}/confirm`,
          req.body.cardDetails,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${req.body.auth}`,
            },
          }
        )
        .then((response) => {
          console.log("responseresponse ", response.data);
          return res.status(200).json(response.data);
        })
        .catch((error) => {
          console.log("error CreatePaymentIntentHandler", error);
          return res.status(400).json(error);
        });
    }
  }
}
