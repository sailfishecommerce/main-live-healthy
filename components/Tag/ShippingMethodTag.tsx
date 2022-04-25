interface Props {
  content: {
    title: string;
    price: string | number;
  };
}

export default function ShippingMethodTag({ content }: Props) {
  return (
    <div className="shipping-method-tag my-3 rounded-xl border p-2 justify-between flex items-center">
      <input type="radio" />
      <h4>{content.title}</h4>
      <p className="font-bold">{content.price}</p>
    </div>
  );
}
