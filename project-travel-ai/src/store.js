import { configureStore } from "@reduxjs/toolkit";
import { login } from './slices/loginSlice';

// named export -> Ngambilnya harus di destructuring
export const store = configureStore({
  reducer: {
    login
  }
})