import Image from "next/image";

import blogContent from "@/json/blog.json";

export default function BlogAuthor() {
  return (
    <div className="bg-gray-200 rounded-xl p-4 flex items-center mb-6">
      <Image
        src={blogContent[0].author.image.big}
        alt={blogContent[0].author.name}
        height={200}
        width={200}
        className="mr-6"
      />
      <div className="content ml-3">
        <h6 className="text-gray-500 text-xs">About the author</h6>
        <h5 className="font-bold mb-1 text-sm">{blogContent[0].author.name}</h5>
        <p>{blogContent[0].author.bio}</p>
      </div>
    </div>
  );
}
