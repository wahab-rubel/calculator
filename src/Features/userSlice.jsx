import { createSlice } from "@reduxjs/toolkit";

// Initial state with userName, userEmail, and userPic
const initialState = {
  userName: null,
  userEmail: null,
  userPic: null,
};

// Create slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setActiveState now accepts an object containing userName, userEmail, and userPic
    setActiveState: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userPic = action.payload.userPic;
    },
    setLogOut: (state) => {
      state.userName = null;
      state.userEmail = null;
      state.userPic = null;
    },
  },
});

// Export actions
export const { setActiveState, setLogOut } = userSlice.actions;

// Selectors to access user data from state
export const selectUserName = (state) => state.user.userName;
export const selectUserEmail = (state) => state.user.userEmail;
export const selectUserPic = (state) => state.user.userPic;

// Export the reducer to be used in the store
export default userSlice.reducer;
