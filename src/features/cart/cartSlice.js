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
  adminFields: "",
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
    clearAdminFields: (state) => {
      state.adminFields = "";
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
    edit: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      state.adminFields = cartItem;
    },
    update: (state, action) => {
      const { idOfEdit, title, price, img, amount, max } = action.payload;
      state.cartItems.forEach((item) => {
        if (item.id == idOfEdit) {
          item.title = title;
          item.price = price;
          item.img = img;
          item.amount = amount;
          item.max = max;
        }
      });
    },
    maxAmountIncrease: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      cartItem.max = cartItem.max + 1;
    },
    maxAmountDecrease: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (cartItem.amount === cartItem.max) {
        cartItem.amount = 0;
      }
      cartItem.max = cartItem.max - 1;
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
  edit,
  clearAdminFields,
  update,
  maxAmountIncrease,
  maxAmountDecrease,
} = cartSlice.actions;

export default cartSlice.reducer;
export { cartItems };
