import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSLice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
