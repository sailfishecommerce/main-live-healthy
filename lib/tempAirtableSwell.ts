import fs from "fs";
import Airtable from "airtable";
import { NextApiRequest, NextApiResponse } from "next";

const base = new Airtable({
  apiKey: `${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
}).base(`${process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY}`);

export default async function createSwellProductHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const filePath = "./airtableproducts.json";
  const filePath = "./airtabletoShopifyproducts.json";

  let productArray: any = [];
  switch (req.method) {
    case "GET": {
      base("To Shopify")
        .select({
          maxRecords: 7794,
          view: "Grid view",
          filterByFormula: "NOT({Product Type} = '')",
        })
        .eachPage(
          function page(records, fetchNextPage) {
            try {
              records.forEach(function (record) {
                const recordData = {
                  id: record.id,
                  fields: record.fields,
                };
                productArray.push(recordData);
              });
              fs.writeFile(
                filePath,
                JSON.stringify(productArray),
                (err: any) => {
                  if (err) {
                    console.log("Error writing file", err);
                    throw err;
                  } else {
                    console.log("Successfully wrote file");
                  }
                }
              );
            } catch (e) {
              console.log("error inside each page", e);
            }
            fetchNextPage();
            // res.status(200).json({ status: "ok" });
          },
          function done(err) {
            if (err) {
              res.status(400).json({ status: err });
              console.error(err);
              return;
            }
          }
        );
    }
  }
}
