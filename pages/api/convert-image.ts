import sharp from "sharp";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function compressImageHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      await sharp("public/images/allensretropartymix190g-0.png", {
        destination: "public/images/sharp",
      })
        .webp({ lossless: true })
        .toFile("allensretropartymix190g.webp")
        .then((response: any) => {
          console.log("response", response);
          return res.send(response);
        });
    }
    default:
      return null;
  }
}
