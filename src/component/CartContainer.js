import React, { useEffect } from "react";
import cartItems from "../CartItems";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal, openModal } from "../features/modal/modalSlice";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, amount, total, addToCart, myBalance } = useSelector(
    (store) => store.cart
  );
  const navigate = useNavigate();

  function handleClear() {
    dispatch(openModal());
  }

  useEffect(() => {
    if (!localStorage.getItem("Login")) {
      navigate("/login");
    }
  }, []);

  console.log("Balance", myBalance);
  console.log("Total", total);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your Balance = {myBalance.toFixed(2)}</h2>
          <h2>Your Bag </h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>Your Balance = {myBalance.toFixed(2)} </h2>
        <h2>your bag</h2>
      </header>
      <div>
        {addToCart?.map((item) => {
          const amount = cartItems?.find((val) => val.id === item.id);
          return <CartItem key={item.id} {...item} upda={amount} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={handleClear}>
          Purchase Items
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
