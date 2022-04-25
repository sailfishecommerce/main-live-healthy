import blogContent from "@/json/blog.json";

export default function TableofContent() {
  const content = blogContent[0].tableOfContent;
  return (
    <div className="border rounded-lg p-6 flex flex-col">
      <h3 className="font-bold">Table Of Content</h3>
      <hr className="my-4" />
      <div className="content">
        <h5 className="font-bold text-md">{content.title}</h5>
        <ul>
          {content.subtitle.map((item, index) => {
            return typeof item === "string" ? (
              <li className="text-sm font-medium my-2" key={index}>
                {item}
              </li>
            ) : (
              item.map((v, i) => (
                <ul className="my-2" key={i}>
                  <h6 className="font-medium text-sm">{v.title}</h6>
                  {v.subtitle.map((s, sIndex) => (
                    <li className="text-sm ml-3" key={sIndex}>
                      {s}
                    </li>
                  ))}
                </ul>
              ))
            );
          })}
        </ul>
      </div>
    </div>
  );
}
