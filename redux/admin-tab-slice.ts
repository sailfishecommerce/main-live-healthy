import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type adminTabStateType = {
    tab: string;
};

const adminTabSlice = createSlice({
    name: "adminTabs",
    initialState: {
        tab: "settings",
    },
    reducers: {
        updateAdminTab(
            state: adminTabStateType,
            action: PayloadAction<string>,
        ) {
            state.tab = action.payload;
        },
    },
});

export const { updateAdminTab } = adminTabSlice.actions;
export default adminTabSlice.reducer;
