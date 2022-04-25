import Image from "next/image";

import blogContent from "@/json/blog.json";

export default function BlogContent() {
  const content = blogContent[0];
  return (
    <section className="content">
      <div className="row flex flex-col">
        <Image
          src={content.section1.banner}
          height={250}
          width={500}
          alt={content.title}
          className="rounded-xl mb-8"
          layout="responsive"
        />
        <hr />
        <div className="text">
          <p
            dangerouslySetInnerHTML={{
              __html: content.section1["text"],
            }}
            className="mt-2 mb-4"
          />
        </div>
      </div>
      <div className="row flex flex-col">
        <h4 className="font-bold mb-2 text-xl">{content.section2.title}</h4>
        <ul className="list">
          {content.section2.list.map((item, index) => (
            <li className="my-1" key={index}>
              {item}
            </li>
          ))}
        </ul>
        <p
          dangerouslySetInnerHTML={{
            __html: content.section2["text"],
          }}
          className="mt-2 mb-4"
        />
        <ul>
          <ul className="mb-4">
            <p className="font-bold text-lg mb-2">Pros:</p>
            {content.section2.pros.map((item, index) => (
              <li key={index} className="ml-6 list-disc ">
                {item}
              </li>
            ))}
          </ul>
          <ul className="mb-4">
            <p className="font-bold text-lg mb-2">Cons:</p>
            <li className="ml-6 list-disc ">{content.section2.cons}</li>
          </ul>

          <span className="con-list mt-2">
            {content.section2.consList.map((item, index) => (
              <li className="flex my-2" key={index}>
                <span className="font-bold">{item.text}:</span>
                <p>{item.value}</p>
              </li>
            ))}
          </span>
          <div className="video-review w-full mb-8">
            <h2 className="font-bold text-xl mb-4">Video review</h2>
            <Image
              src={content.section3.banner}
              height={250}
              width={500}
              alt={content.section3.banner}
              className="rounded-xl"
              layout="responsive"
            />
          </div>
        </ul>
      </div>
    </section>
  );
}
