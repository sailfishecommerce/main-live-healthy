export default function productModel(product: any, record: any) {
  const productData = {
    name: product["#productname"],
    price: product["cwh-price"],
    active: true,
    type: "standard",
    cost: product["HKD Cost Price"],
    customizable: true,
    description: product["Product Description"],
    meta_description: product["cwh-Meta_Description_EN"],
    meta_title: product["Product SEO Title"],
    review_rating: product["reviews"],
    sale: true,
    sku: product["cwh-SKU"],
    tags: product["cwh-path-tags"],
    vendor: product["#vendor"],
    path: product["cwh-path"],
    rrp: product["cwh-rrp"],
    bestseller: product["cwh-bestseller"],
    discount: product["cwh-discount"],
    exclude: product["Exclude"],
    percentage_chinese: product["percentage_chinese"],
    low_stock: product["cwh-low_stock"],
    link: product["cwh-link"],
    new_sailfish: product["New Sailfish"],
    max_quantity: product["max_qty"],
    on_line: product["cwh-on_line"],
    margin: product["Margin"],
    airtable_group: "goldCleanLatest",
    product_categories: [product["Cat 2"], product["Cat 3"], product["Cat 4"]],
    select_store: "livehealthy",
    date_created: record.createdTime,
    date_updated: product["Last Modified 2"]
      ? product["Last Modified 2"]
      : product["Last Modified"],
    hkd_selling_price: product["HKD Selling Price"],
    hkd_compare_at_price: product["HKD Compare At Price"],
    product_image: product["cwh-pict-all"],
    images: [
      {
        file: {
          url: product["cwh-pict-all"],
        },
      },
    ],
    weight: product["calculated-weight"],
    image_alt_text: [
      product["1st Image Alt Text"],
      product["2nd Image Alt Text"],
      product["3rd Image Alt Text"],
      product["4th Image Alt Text"],
    ],
    product_type: product["#type"],
    information_html: product["cwh-html"],
    information_html_eng: product["cwh-html-ENG"],
    information_eng_ch: product["cwh-html-EN+CH"],
    product_images: [
      {
        link: product["cwh-pict_1"],
        alt: product["cwh-img-alt_1"],
      },
      {
        link: product["cwh-pict_2"],
        alt: product["cwh-img-alt_2"],
      },
      {
        link: product["cwh-pict_3"],
        alt: product["cwh-img-alt_3"],
      },
      {
        link: product["cwh-pict_4"],
        alt: product["cwh-img-alt_4"],
      },
      {
        link: product["cwh-pict_5"],
        alt: product["cwh-img-alt_5"],
      },
      {
        link: product["cwh-pict_6"],
        alt: product["cwh-img-alt_6"],
      },
      {
        link: product["cwh-pict_7"],
        alt: product["cwh-img-alt_7"],
      },
      {
        link: product["cwh-pict_8"],
        alt: product["cwh-img-alt_8"],
      },
      {
        link: product["cwh-pict_9"],
        alt: product["cwh-img-alt_9"],
      },
      {
        link: product["cwh-pict_10"],
        alt: product["cwh-img-alt_10"],
      },
    ],
    brand: product["cwh-brand"],
  };

  return productData;
}
