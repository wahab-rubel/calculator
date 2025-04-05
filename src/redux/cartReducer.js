const initialState = {
 cart: [], // ✅ cart অবশ্যই থাকতে হবে, নাহলে useSelector-এ undefined হবে
};

const cartReducer = (state = initialState, action) => {
 switch (action.type) {
   case "ADD_TO_CART":
     return { ...state, cart: [...state.cart, action.payload] };
   default:
     return state;
 }
};

export default cartReducer;
