import Image from "next/image";
import {
  BsWhatsapp,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsPinterest,
} from "react-icons/bs";

import blogContent from "@/json/blog.json";

export default function ShareBlogLink() {
  const content = blogContent[0].links;
  return (
    <div className="row flex items-center justify-between w-full mb-8">
      <div className="author flex items-center">
        <Image src="/arabella-small.webp" alt="author" height={50} width={50} />
        <div className="content ml-3">
          <h6 className="font-bold mb text-sm">Arabella Noakes</h6>
          <p className="font-medium text-xs flex items-center">
            April 10,2022{" "}
            <li className="text-gray-400 ml-2">10 minutes read</li>
          </p>
        </div>
      </div>
      <div className="share flex items-center">
        <h5 className="font-bold mr-4">Share</h5>
        <div className="share-icons flex items-center">
          <BsWhatsapp className="mx-2 whatsapp icon" fill="#075e54" />
          <BsFacebook className="mx-2 facebook icon" fill="#3b5998" />
          <BsTwitter className="mx-2 twitter icon" fill="#1da1f2" />
          <BsInstagram className="mx-2 instagram icon" fill="#3f729b" />
          <BsPinterest className="mx-2 pinterest icon" fill="#c8232c" />
        </div>
      </div>
    </div>
  );
}
