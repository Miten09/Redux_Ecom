import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../utils/cartItems.json";

let cartItemsFromJson;
export function allCartItems() {
  cartItemsFromJson = cartItems.cartItems;
  return cartItemsFromJson;
}

// const temp = allCartItems();
// console.log("MMMMMM", temp);

const initialState = {
  cartItems: allCartItems(),
  addToCart: allCartItems(),
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.addToCart = [];
    },
    LoginCart: (state) => {
      state.cartItems = allCartItems();
    },
    addItemToCart: (state) => {
      state.addToCart = state.cartItems;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.addToCart = state.addToCart.filter((item) => item.id !== itemId);
    },
    cartItemZero: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      cartItem.amount = 0;
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount = amount + item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
    addOneItemsToHome: (state, action) => {
      const temp = [...state.cartItems];
      temp.push(action.payload);
      state.cartItems = temp;
    },
    deleteoneItemFromAdmin: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    purchaseItems: (state, action) => {
      state.cartItems.forEach((item) => {
        item.max = item.max - item.amount;
        item.amount = 0;
      });
    },
  },
});

export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
  addItem,
  addOneItemsToHome,
  LoginCart,
  cartItemZero,
  addItemToCart,
  deleteoneItemFromAdmin,
  purchaseItems,
} = cartSlice.actions;

export default cartSlice.reducer;
export { cartItems };
