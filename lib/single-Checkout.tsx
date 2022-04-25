export const accordionButtonStyle = (stage: number) => {
  const accordion = {
    href: stage === 2 ? "#payment" : "nill",
    headClassName:
      stage === 2 ? "accordion-button" : "accordion-button collapsed",
    bodyClassName:
      stage === 2
        ? "accordion-collapse collapse show"
        : "accordion-collapse collapse",
    shippingBody:
      stage === 2
        ? "accordion-collapse collapse"
        : "accordion-collapse collapse show",
    shippingHead:
      stage === 2 ? "accordion-button collapsed" : "accordion-button",
  };
  return accordion;
};
