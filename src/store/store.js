import { configureStore } from "@reduxjs/toolkit";
import socialSlice from "../reducers/socialSlice";
export default configureStore({
  reducer: { social: socialSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});
