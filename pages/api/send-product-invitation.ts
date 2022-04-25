import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default function SendProductInvitationHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req.method", req.method);
  console.log("req.trustmateData", req.body.trustmateData);

  switch (req.method) {
    case "POST": {
      axios
        .post(
          "https://trustmate.io/api/invitation/dispatch",
          req.body.trustmateData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("response SendProductInvitationHandler", response);
          console.log("SendProductInvitationHandler ", response.data);
          res.status(200).send(response.data);
        })
        .catch((error) => {
          console.log("error SendProductInvitationHandler", error);
          res.status(400).send(error);
        });
    }
  }
}
