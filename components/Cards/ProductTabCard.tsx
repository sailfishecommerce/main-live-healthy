import { productType } from "@/types";
import Image from "next/image";

interface Props {
  product: productType;
}

export default function ProductTabCard({ product }: Props) {
  return (
    <>
      <div
        title={`Buy ${product.name}`}
        className="producttab-card flex p-2 md:p-4 justify-between items-center rounded-xl bg-light-gray mr-8"
      >
        <div className="image-wrapper flex flex-col w-1/2 md:w-1/3">
          <Image
            src={product.images[0].file.url}
            alt={product.name}
            height={200}
            width={200}
            className="bg-white flex rounded-lg"
            blurDataURL={product.images[0].file.url}
          />
          <button
            type="button"
            className="add-to-cart text-xs md:text-sm bg-mountain-green mx-auto absolute top-12 py-1 px-2 rounded-md text-white"
          >
            Add to cart
          </button>
        </div>
        <div className="content flex flex-col ml-3 w-2/3 md:w-3/5">
          <h3 className="text-xs md:text-md">{product.name}</h3>
          <h4 className="text-xs md:text-sm font-bold text-lg">
            $ {product.price}
          </h4>
        </div>
      </div>
      <style jsx>
        {`
          .producttab-card:hover {
            background-color: var(--tan-light-hide);
          }
          .add-to-cart {
            display: none;
          }

          .add-to-cart:hover {
            background-color: var(--mountain-mist);
          }

          .producttab-card:hover .add-to-cart {
            display: flex;
          }
          .image-wrapper {
            margin: auto;
            align-items: center;
            position: relative;
          }
        `}
      </style>
    </>
  );
}
