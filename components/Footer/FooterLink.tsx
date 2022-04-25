import { useState } from "react";
import useCategoryData from "@/hooks/useCategoryData";
import footerLinks from "@/json/footer.json";
import FooterLinkGroup from "./FooterLinkGroup";

export default function FooterLink() {
  const [data, status] = useCategoryData();
  const categories = status === "success" ? data?.results.slice(12, 20) : [];

  const shortLinkArray = categories.slice(0, 5);
  const [viewMore, setViewMore] = useState(false);
  const [linkArray, setLinkArray] = useState(shortLinkArray);

  const tagText = !viewMore ? "Show Less" : "View All";

  function updateLinkList() {
    setViewMore(!viewMore);
    if (viewMore) {
      setLinkArray(categories);
    } else {
      setLinkArray(shortLinkArray);
    }
  }

  return (
    <div className="pl-0 md:pl-12 order-2 md:order-1 flex items-start justify-around flex flex-col md:grid grid-cols-2 w-full md:w-2/4">
      <FooterLinkGroup title="About LiveHealthy" linkGroup={footerLinks} />
      {status === "success" ? (
        <FooterLinkGroup
          title="Categories"
          tag={tagText}
          onViewLinks={updateLinkList}
          linkGroup={linkArray}
        />
      ) : (
        "loading"
      )}
    </div>
  );
}
