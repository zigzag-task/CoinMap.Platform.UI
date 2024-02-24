import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth-slice";
import { redirectSlice } from "./slices/redirect-slice";
import { venueSlice } from "./slices/venue-slice";

const store = configureStore({
  reducer: {
    AUTH: authSlice.reducer,
    PAGE: redirectSlice.reducer,
    VENUE: venueSlice.reducer,
  },
});

export { store };
