import blogContent from "@/json/blog.json";
import Image from "next/image";

export default function PopularArticles() {
  const content = blogContent[0].popularArticles;
  return (
    <div className="flex flex-col">
      <h3 className="font-bold">Popular Articles</h3>
      <ul>
        {content.map((item, index) => (
          <li
            key={index}
            className="flex items-center my-4 hover:bg-gray-100 hover:rounded-md"
          >
            <Image
              src={item.thumbnailImg}
              alt={item.thumbnailImg}
              height={100}
              width={100}
              className="rounded-lg"
            />
            <p className="ml-3">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
