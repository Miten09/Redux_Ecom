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
  wishList: [],
  alreadyPurchase: [],
  myBalance: 3000,
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
      state.wishList = [];
      state.myBalance = 3000;
      state.alreadyPurchase = [];
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
      cartItem.Balance = cartItem.price + cartItem.Balance;
      cartItem.return = 0;
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      cartItem.amount = cartItem.amount - 1;
      cartItem.Balance = cartItem.Balance - cartItem.price;
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
    // purchaseItems: (state, action) => {
    //   const updateData = (d) => {
    //     const data = state.alreadyPurchase;
    //     const newData = [];
    //     data.forEach((item) => {
    //       d.forEach((val) => {
    //         if (item.id === val.id) {
    //           const temp = { ...item, amount: item.amount + val.amount };
    //           newData.push(temp);
    //         }
    //       });
    //     });
    //     return newData;
    //   };
    //   let tempData = [];
    //   if (state.alreadyPurchase.length > 0) {
    //     tempData = updateData(state.cartItems);
    //     console.log("IF", tempData);
    //   } else {
    //     tempData = JSON.parse(JSON.stringify(state.cartItems));
    //     console.log("ELSE", tempData);
    //   }

    //   state.alreadyPurchase = JSON.parse(JSON.stringify(tempData));
    //   state.cartItems.forEach((item) => {
    //     item.max = item.max - item.amount;
    //     item.amount = 0;
    //   });
    //   state.addToCart = state.cartItems;
    // },
    purchaseItems: (state, action) => {
      const updateData = (d) => {
        const newData = [...state.alreadyPurchase];
        d.forEach((cartItem) => {
          const existingIndex = newData.findIndex(
            (item) => item.id === cartItem.id
          );
          if (existingIndex !== -1) {
            newData[existingIndex].amount += cartItem.amount;
          } else {
            newData.push(cartItem);
          }
        });
        return newData;
      };
      let tempData = [];
      if (state.alreadyPurchase.length > 0) {
        tempData = updateData(state.cartItems);
      } else {
        tempData = JSON.parse(JSON.stringify(state.cartItems));
      }
      state.alreadyPurchase = JSON.parse(JSON.stringify(tempData));
      state.cartItems.forEach((item) => {
        item.max -= item.amount;
        item.amount = 0;
      });
      state.addToCart = state.cartItems;
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
    balanceDeducted: (state, action) => {
      state.myBalance = state.myBalance - state.total;
    },
    addBalance: (state, action) => {
      const balance = action.payload;
      state.myBalance = state.myBalance + Number(balance);
    },
    addWishListItems: (state, action) => {
      const id = action.payload;
      const findItem = state.cartItems.find((item) => item.id === id);
      state.wishList.push(findItem);
    },
    removeWishListItems: (state, action) => {
      const id = action.payload;
      state.wishList = state.wishList.filter((item) => item.id !== id);
    },
    returnOrder: (state, action) => {
      const id = action.payload;
      const purchased = state.alreadyPurchase.find((item) => item.id === id);
      const itemspurchase = state.cartItems.find((item) => item.id === id);
      itemspurchase.max = itemspurchase.max + purchased.return;
      purchased.amount = purchased.amount - purchased.return;
      state.myBalance = state.myBalance + purchased.price * purchased.return;
      purchased.return = 0;
    },
    returnItemIncrease: (state, action) => {
      const increase = state.alreadyPurchase.find(
        (item) => item.id === action.payload
      );
      increase.return = increase.return + 1;
    },
    returnItemDecrease: (state, action) => {
      const decrease = state.alreadyPurchase.find(
        (item) => item.id === action.payload
      );
      decrease.return = decrease.return - 1;
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
  balanceDeducted,
  addBalance,
  addWishListItems,
  removeWishListItems,
  returnOrder,
  returnItemIncrease,
  returnItemDecrease,
} = cartSlice.actions;

export default cartSlice.reducer;
export { cartItems };
