import Image from "next/image";
import { GiCancel } from "react-icons/gi";

const selectOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function ReviewOrderlist({ content }: any) {
  return (
    <div className="flex items-center hover:bg-gray-100 border border-b border-gray-100 justify-between p-4">
      <Image
        src={content.product.images[0].file.url}
        alt={content.product.name}
        height={70}
        width={100}
      />
      <div className="text flex flex-col">
        <span className="product-name">
          <h4 className="font-medium my-1">{content.product.name}</h4>
        </span>
        <div className="quantity">
          <span className="font-medium">Qty: </span>{" "}
          <select className="w-12 border border-gray-100 p-1 mx-1 text-center font-bold">
            {selectOptions.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <button type="button">
          <GiCancel
            size={32}
            aria-label="close"
            className="text-black font-bold h-6 w-6 text-2xl block outline-none focus:outline-none"
          />
        </button>
      </div>
      <style jsx>
        {`
          .product-name h4 {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 200px;
          }
        `}
      </style>
    </div>
  );
}
