import { createSlice } from "@reduxjs/toolkit";

const cartItems = [
  {
    id: "rec1JZlfCIBOPdcT2",
    title: "Samsung Galaxy S8",
    price: "399.99",
    img: "https://images2.imgbox.com/c2/14/zedmXgs6_o.png",
    amount: 0,
  },
  {
    id: "recB6qcHPxb62YJ75",
    title: "google pixel",
    price: "499.99",
    img: "https://images2.imgbox.com/fb/3d/O4TPmhlt_o.png",
    amount: 0,
  },
  {
    id: "recdRxBsE14Rr2VuJ",
    title: "Xiaomi Redmi Note 2",
    price: "699.99",
    img: "https://images2.imgbox.com/4f/3d/WN3GvciF_o.png",
    amount: 0,
  },
  {
    id: "recwTo160XST3PIoW",
    title: "Samsung Galaxy S7",
    price: "599.99 ",
    img: "https://images2.imgbox.com/2e/7c/yFsJ4Zkb_o.png",
    amount: 0,
  },
];

const initialState = {
  cartItems: cartItems,
  amount: 3,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addItem: (state, action) => {
      const cartItem = cartItems.find((item) => item.id == action.payload);
      state.cartItems.push(cartItem);
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
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
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
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
} = cartSlice.actions;

export default cartSlice.reducer;
