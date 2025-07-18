import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import generationSlice from "@/store/slices/generationSlice";
import userSlice from "@/store/slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    generation: generationSlice
  },
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
      }
    })
});

export default store;