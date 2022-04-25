import React, { useState } from "react";
import { useCart } from ".";

export default function useCoupon() {
  const { applyDiscountCode } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);

  function couponInputHandler(e: any) {
    setDiscountCode(e.target.value);
  }

  function onSubmitCoupon(e: any) {
    e.preventDefault();
    setLoading(true);
    applyDiscountCode(discountCode)
      .then((response) => {
        setLoading(false);
        console.error("onSubmit response", response);
      })
      .catch((error) => {
        setLoading(false);
        console.error("onSubmit error", error);
      });
  }

  return {
    loading,
    couponInputHandler,
    onSubmitCoupon,
  };
}
