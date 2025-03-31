import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/userSlice";
import cartReducer from "../Features/cartSlice"; 

const store = configureStore({
  reducer: {
    user: userReducer, // user reducer
    cart: cartReducer, // cart reducer
  },
});

export default store;
