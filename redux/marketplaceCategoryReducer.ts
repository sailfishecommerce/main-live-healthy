import { combineReducers } from "@reduxjs/toolkit";
import marketplaceCategoryReducer from "./marketplace-category-slice";

const marketplaceReducer = combineReducers({
  marketplaceCategory: marketplaceCategoryReducer,
});

export type RootState = ReturnType<typeof marketplaceReducer>;

export default marketplaceReducer;
