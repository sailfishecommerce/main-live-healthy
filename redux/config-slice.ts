import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: "config",
    initialState: {
        currency: "usd",
        language: "English",
        toggle: false,
    },
    reducers: {
        updateSiteCurrency(state, action: PayloadAction<any>) {
            state.currency = action.payload;
        },
        updateSiteLanguage(state, action: PayloadAction<any>) {
            state.language = action.payload;
        },
        toggleAction(state) {
            state.toggle = !state.toggle;
        },
    },
});

export const { updateSiteCurrency, updateSiteLanguage, toggleAction } =
    configSlice.actions;
export default configSlice.reducer;
