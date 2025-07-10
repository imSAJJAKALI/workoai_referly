import { configureStore } from "@reduxjs/toolkit";
import candidateReducer from "../features/candidate/candidateSlice";
import authReducer from "../features/auth/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    candidates: candidateReducer,
  },
});
