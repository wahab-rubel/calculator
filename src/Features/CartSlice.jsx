import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Fetching product data asynchronously
export const fetchProductData = createAsyncThunk(
  "cart/fetchProductData",
  async () => {
    try {
      // If your product data is in a local JSON file:
      const response = await axios.get("/path/to/your/productData.json");
      return response.data; // Assuming the JSON file returns an array of products
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error("Failed to load product data.");
      return []; // Return empty array on error
    }
  }
);

// Initial state for cart
const initialState = {
  cart: [],
  items: [], // Initially empty; will be populated with fetched data
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
      let foundIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (foundIndex >= 0) {
        state.cart[foundIndex].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    getCartTotal: (state) => {
      let { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        { totalPrice: 0, totalQuantity: 0 }
      );
      state.totalPrice = parseFloat(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },

    decreaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },

    productDetail: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        state.product = [product];
      }
    },

    productIncrease: (state, action) => {
      state.product = state.product.map((item) => {
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },

    productDecrease: (state, action) => {
      state.product = state.product.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },

    filterCategory: (state, action) => {
      const filteredProducts = state.items.filter((item) => item.category === action.payload);
      state.product = filteredProducts.length > 0 ? filteredProducts : null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.items = action.payload; // Set the fetched product data
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
