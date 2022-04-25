import React from "react";
import ShippingMethodTag from "@/components/Tag/ShippingMethodTag";

export default function ShippingMethod() {
  const shippingTag = [
    { title: "Standard Shipping (4-6 weeks", price: "Free" },
  ];
  return (
    <div>
      <h4 className="text-xl font-bold">Shipping method</h4>
      <div className="shipping-methods flex flex-col">
        {shippingTag.map((shippingMethod, index) => (
          <ShippingMethodTag key={index} content={shippingMethod} />
        ))}
      </div>
    </div>
  );
}
