import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function compressImageHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      await imagemin(["public/images/allensretropartymix190g-0.png"], {
        destination: "public/images/updated",
        plugins: [
          imageminWebp({
            quality: 40,
          }),
        ],
      }).then((response: any) => {
        return res.send(response);
      });
    }
    default:
      return null;
  }
}
