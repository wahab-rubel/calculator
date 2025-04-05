import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/userSlice";  // Importing user reducer
import cartReducer from "../Features/cartSlice"; // Importing cart reducer

const store = configureStore({
  reducer: {
    user: userReducer, // Managing user-related state
    cart: cartReducer, // Managing cart-related state
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development mode
});

export default store;
