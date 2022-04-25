import axios from "axios";
import sharp from "sharp";
import type { NextApiRequest, NextApiResponse } from "next";

export default function uploadImageHander(
  req: NextApiRequest,
  res: NextApiResponse
) {
  async function displayImageData(url: string, name: string) {
    return axios
      .get(url, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        sharp(response.data)
          .webp()
          .toBuffer({ resolveWithObject: true })
          .then(({ data, info }: any) => {
            let imageData: any = {};
            imageData.file = {
              data: {
                binary: data.toString("base64"),
                type: "00",
              },
              filename: name.replaceAll(" ", "").toLowerCase(),
              content_type: "image/webp",
              width: info.width,
              height: info.height,
            };
            return imageData;
          })
          .catch((error: any) => console.log("error", error));
      });
  }

  switch (req.method) {
    case "GET": {
      displayImageData(
        "http://host-62-113-119-20.hosted-by-vdsina.ru/Pictures/nature-s-way-beauty-rosehip-40-gummies_1.jpg",
        "Product one"
      ).then((data) => console.log("imageData", data));
    }
  }
}
