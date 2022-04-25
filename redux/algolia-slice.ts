/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const algoliaSlice = createSlice({
  name: 'algolia',
  initialState: {
    searchData: [],
    viewSearch: false,
    query: null,
    closeSearchView: false,
    defaultRefinement: null,
    defaultMenuRefinement: null,
  },
  reducers: {
    updateSearchData(state, action: PayloadAction<any>) {
      state.searchData = action.payload
    },
    updateViewSearch(state) {
      state.viewSearch = !state.viewSearch
    },
    closeSearch(state) {
      state.closeSearchView = true
    },
    updateQuery(state, action: PayloadAction<any>) {
      state.query = action.payload
    },
    updateDefaultRefinement(state, action: PayloadAction<any>) {
      state.defaultRefinement = action.payload
    },
    updateDefaultMenuRefinement(state, action: PayloadAction<any>) {
      state.defaultMenuRefinement = action.payload
    },
  },
})

export const {
  updateSearchData,
  updateViewSearch,
  closeSearch,
  updateQuery,
  updateDefaultRefinement,
  updateDefaultMenuRefinement,
} = algoliaSlice.actions
export default algoliaSlice.reducer
