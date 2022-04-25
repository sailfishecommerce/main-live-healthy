import qs from "qs";

export default function useAlgoliaSearch() {

  function getCategorySlug(name: string) {
    return name.split(" ").map(encodeURIComponent).join("+");
  }

  function getCategoryName(slug: string) {
    return slug.split("+").map(decodeURIComponent).join(" ");
  }

  const createURL = (state: any) => {
    const isDefaultRoute =
      !state.query &&
      state.page === 1 &&
      state.refinementList &&
      state.refinementList.vendor?.length === 0 &&
      state.refinementList.tags?.length === 0 &&
      state.menu &&
      !state.menu.product_type;

    if (isDefaultRoute) {
      return "";
    }

    const categoryPath = state.menu?.product_type
      ? `${getCategorySlug(state.menu?.product_type)}/`
      : "";
    const queryParameters: any = {};

    if (state?.query) {
      queryParameters.query = encodeURIComponent(state.query);
    }
    if (state?.page !== 1) {
      queryParameters.page = state.page;
    }
    if (state?.refinementList?.vendor) {
      queryParameters.vendor =
        state.refinementList.vendor.map(encodeURIComponent);
    }
    if (state?.refinementList?.tags) {
      queryParameters.tags = state.refinementList.tags.map(encodeURIComponent);
    }

    const queryString = qs.stringify(queryParameters, {
      addQueryPrefix: true,
      arrayFormat: "repeat",
    });

    return `/shop?search/${categoryPath}${queryString}`;
  };

  const searchStateToUrl = (searchState: any) => {
    return searchState ? createURL(searchState) : "";
  };

  const urlToSearchState = (location: any) => {
    const locationSplitted = location ? location.split("/?")[1] : "";
    const searchPath = locationSplitted
      ? locationSplitted.split("/search")[1]
      : "";
    const categoryPath = searchPath ? searchPath.replace(/\//g, "") : "";
    const category = getCategoryName(categoryPath || "");

    const attributePath = location ? location.slice("2").split("?")[1] : "";

    const queryValue = location ? location.split("/?")[1] : "";

    const {
      query = "",
      page = 1,
      vendor = [],
      tags = [],
    }: any = qs.parse(attributePath);

    // location.search.slice(1));
    // `qs` does not return an array when there's a single value.
    const allVendors = Array.isArray(vendor)
      ? vendor
      : [vendor].filter(Boolean);
    const allTags = Array.isArray(tags) ? tags : [tags].filter(Boolean);

    return {
      query: decodeURIComponent(query),
      page,
      menu: {
        product_type: decodeURIComponent(category),
      },
      refinementList: {
        vendor: allVendors.map(decodeURIComponent),
        tags: allTags.map(decodeURIComponent),
      },
    };
  };

  return {
    searchStateToUrl,
    urlToSearchState,
    createURL,
  };
}
