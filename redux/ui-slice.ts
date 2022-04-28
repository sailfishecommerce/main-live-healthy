/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'UI',
  initialState: {
    slideTab: null,
    noticebar: true,
    sidebarRight: false,
    loading: false,
    mobileMenu: false,
    modal: false,
    categoryDropdown: false,
    selectedCategory: 'Beauty',
    showNav: false,
    showMobileSearch: false,
    authModal: 'AUTHFORM',
    displayModal: {
      active: false,
      type: null,
      data: null,
    },
    checkoutModal: 'SECURE_CHECKOUT',
    displayCheckoutModal: false,
    displayAuthModal: false,
    quickViewModal: {
      active: false,
      productToView: null,
    },
  },
  reducers: {
    toggleSlideTab(state, action) {
      state.slideTab = action.payload
    },
    toggleNoticebar(state) {
      state.noticebar = !state.noticebar
    },
    updatedSelectedCategory(state, action) {
      state.selectedCategory = action.payload
    },
    updateSearchView(state) {
      if (!state.mobileMenu) {
        state.showMobileSearch = !state.showMobileSearch
      }
    },
    toggleSidebarRight(state) {
      state.sidebarRight = !state.sidebarRight
    },
    toggleModal(state) {
      state.modal = !state.modal
    },
    updateCategoryDropdown(state) {
      state.categoryDropdown = !state.categoryDropdown
    },
    authModalForm(state, action: PayloadAction<string>) {
      state.authModal = action.payload
    },
    checkoutModal(state, action: PayloadAction<string>) {
      state.checkoutModal = action.payload
    },
    displayCheckoutModalAction(state) {
      state.displayCheckoutModal = !state.displayCheckoutModal
    },
    updateLoadingAction(state) {
      state.loading = !state.loading
    },
    quickViewModal(state, action) {
      state.quickViewModal.active = !state.quickViewModal.active
      state.quickViewModal.productToView = action.payload
    },
    toggleAuthModal(state) {
      state.displayAuthModal = !state.displayAuthModal
    },
    updateMobileMenu(state) {
      state.mobileMenu = !state.mobileMenu
    },
    toggleNav(state) {
      state.showNav = !state.showNav
    },
    toggleAppModal(state, action) {
      state.displayModal.type = action.payload.type
      if (state.displayModal.type) {
        state.displayModal.active = true
      } else {
        state.displayModal.active = false
      }
      if (action.payload.data) {
        state.displayModal.data = action.payload?.data
      }
    },
  },
})

export const {
  toggleNav,
  toggleSlideTab,
  toggleNoticebar,
  toggleSidebarRight,
  toggleModal,
  authModalForm,
  updateLoadingAction,
  quickViewModal,
  updateCategoryDropdown,
  updateSearchView,
  toggleAuthModal,
  toggleAppModal,
  checkoutModal,
  updateMobileMenu,
  displayCheckoutModalAction,
  updatedSelectedCategory,
} = uiSlice.actions

export default uiSlice.reducer
