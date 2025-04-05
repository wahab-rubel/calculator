import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

// Fetching product data asynchronously
export const fetchProductData = createAsyncThunk(
  "cart/fetchProductData",
  async () => {
    try {
      const response = await axios.get(`products.json`); 
      return response.data;
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error("Failed to load product data.");
      return [];
    }
  }
);

// Initial state
const initialState = {
  cart: [],
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  product: null,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      toast.success("Your product was added successfully!");
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },

    removeFromCart: (state, action) => {
      const itemToRemove = state.cart.find((item) => item.id === action.payload);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }
    },

    increaseItemQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },

    decreaseItemQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      }
    },

    getCartTotal: (state) => {
      state.totalQuantity = state.cart.reduce((acc, item) => acc + item.quantity, 0);
      state.totalPrice = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },

    productDetail: (state, action) => {
      state.product = state.items.find((item) => item.id === action.payload) || null;
    },

    productIncrease: (state, action) => {
      if (state.product && state.product.id === action.payload) {
        state.product.quantity += 1;
      }
    },

    productDecrease: (state, action) => {
      if (state.product && state.product.id === action.payload && state.product.quantity > 1) {
        state.product.quantity -= 1;
      }
    },

    filterCategory: (state, action) => {
      state.product = state.items.filter((item) => item.category === action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  addToCart,
  getCartTotal,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  productDetail,
  productIncrease,
  productDecrease,
  filterCategory,
} = cartSlice.actions;

export default cartSlice.reducer;
