interface Props {
  content: {
    title: string;
    category: string;
  }[];
  activeIndex: number;
}
export default function HomepageSliderControls({
  content,
  activeIndex,
}: Props) {
  return (
    <div  className="rounded-3xl border border-gray-100 flex items-center bg-white w-11/12 p-8 flex justify-between mx-auto h-36 mb-4 -mt-24 relative">
      {content.map((item, index) => {
        const indexValue = Number(index) + 1;
        const isActive = activeIndex === index ? "active" : "";
        return (
          <div
            className={`slider-item splide__pagination__page flex flex-col border-t-2 pt-2 ${isActive}`}
            key={item.title}
            title={item.title}
          >
            <h4 className="flex items-center font-medium">0{indexValue}</h4>
            <h2 className="font-bold my-1">{item.title}</h2>
            <p>{item.category}</p>
          </div>
        );
      })}
      <style jsx>
        {`
          .slider-item {
            width: 100%;
            background: unset;
            height: unset;
            display: unset;
            margin: unset;
            border-top: 1px solid #e7e6e9;
            border-radius: unset;
            opacity: unset;
            padding: 10px 0px;
            position: unset;
            transition: unset;
          }
          .slider-item.active {
            border-top: 3px solid var(--mountain-green);
          }
          .slider-item.active h4 {
            color: var(--mountain-green);
          }
        `}
      </style>
    </div>
  );
}
