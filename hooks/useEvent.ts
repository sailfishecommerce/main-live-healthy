import { productType } from "@/types";
import useAlgoliaEvents from "./useAlgoliaEvents";
import { useAppDispatch } from "@/redux/store";
import { quickViewModal } from "@/redux/ui-slice";

export default function useEvent() {
  const { itemViewed } = useAlgoliaEvents();
  const dispatch = useAppDispatch();

  function algoliaQuickViewEvent(product: productType) {
    const itemId =
      product.objectID !== undefined ? product.objectID : [product.id];
    itemViewed("quick_view_of_product_by_modal", itemId);
    dispatch(quickViewModal(product));
  }

  return { algoliaQuickViewEvent };
}
