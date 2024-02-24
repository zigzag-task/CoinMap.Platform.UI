import { createSlice } from "@reduxjs/toolkit";

const redirectSlice = createSlice({
  name: "redirectSlice",
  initialState: {
    navigate: {},
  },
  reducers: {
    navigateAction: (currentSlice, actions) => {
      currentSlice.navigate = actions.payload;
    },
  },
});

export { redirectSlice };

export const { navigateAction } = redirectSlice.actions;
