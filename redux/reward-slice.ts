import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const rewardSlice = createSlice({
  name: "rewardWidget",
  initialState: {
    stage: "default",
    showWidget: false,
  },
  reducers: {
    updateStage(state, action: PayloadAction<any>) {
      state.stage = action.payload;
    },
    updateWidget(state) {
      state.showWidget = !state.showWidget;
    },
  },
});

export const { updateStage, updateWidget } = rewardSlice.actions;
export default rewardSlice.reducer;
