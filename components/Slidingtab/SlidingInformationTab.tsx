import type { productType } from "@/types";
import SlidingTab from "@/components/Slidingtab";

interface Props {
  product: productType;
}

export default function SlidingInformation({ product }: Props) {
  const tabTitle = [
    "Product Information",
    "Storage Instructions",
    "Directions",
  ];

  return (
    <SlidingTab buttonColor="text-white">
      <div className="header h-40 flex items-end bg-mountain-green p-4 w-full">
        {tabTitle.map((title, index) => {
          const tabStyle = index === 0 ? "text-white" : "text-gray-300";
          return (
            <h3
              key={index}
              className={`${tabStyle} font-bold text-md 2xl:text-xl 2xl:mr-4 mx-2`}
            >
              {title}
            </h3>
          );
        })}
      </div>
      <div
        className="text-content sliding-tab bg-white px-6 pb-16"
        dangerouslySetInnerHTML={{
          __html: product["description"],
        }}
      />
      <style jsx>
        {`
          .text-content {
            overflow: auto;
            height: 80vh;
          }
        `}
      </style>
    </SlidingTab>
  );
}
