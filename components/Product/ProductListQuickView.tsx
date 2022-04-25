import { productType } from "@/types";
import useShoppingCart from "@/hooks/useShoppingCart";
import useEvent from "@/hooks/useEvent";
import ProductListForm from "@/components/Form/ProductListForm";
import { BsFillEyeFill } from "react-icons/bs";

interface ProductProps {
  product: productType;
}

export default function ProductListQuickView({ product }: ProductProps) {
  const { loadingState, addItemToCart } = useShoppingCart();
  const { algoliaQuickViewEvent } = useEvent();

  loadingState(addItemToCart, `${product.name}  added to cart`);

  function quickViewHandler() {
    algoliaQuickViewEvent(product);
  }

  return (
    <div className="flex mt-4 items-center justify-between">
      <ProductListForm product={product} />
      <a
        aria-label={`Quick view of ${product.name}`}
        className="hover:text-red-500 border flex items-center border-red-500 rounded-md px-2 p-1 cursor-pointer"
        onClick={quickViewHandler}
        data-bs-toggle="quickViewModal"
      >
        <BsFillEyeFill className="text-red-500 mx-1" />
        Quick view
      </a>
    </div>
  );
}
