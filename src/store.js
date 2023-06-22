import { configureStore } from "@reduxjs/toolkit";
import ActiveSlice from "./Slices/ChatSlice";
export const store = configureStore({
  reducer: {
    chat: ActiveSlice,
  },
});
