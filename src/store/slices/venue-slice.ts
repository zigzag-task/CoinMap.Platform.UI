import { createSlice } from "@reduxjs/toolkit";

const venueSlice = createSlice({
  name: "venueSlice",
  initialState: {
    venues: [],
  },
  reducers: {
    venueAction: (currentSlice, actions) => {
      currentSlice.venues = actions.payload;
    },
  },
});

export { venueSlice };

export const { venueAction } = venueSlice.actions;
