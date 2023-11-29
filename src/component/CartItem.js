import React, { useEffect } from "react";
import { ChevronDown, ChevronUp } from "../icons";
import { useDispatch } from "react-redux";
import {
  cartItemZero,
  decrease,
  increase,
  removeItem,
} from "../features/cart/cartSlice";

const CartItem = ({ id, img, title, price, amount, max, upda }) => {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      {upda?.amount !== 0 && (
        <>
          <img src={img} alt={title} />
          <div>
            <h4>{title}</h4>
            <h4 className="item-price">${price}</h4>
            <button
              className="remove-btn"
              onClick={() => {
                dispatch(removeItem(id));
                dispatch(cartItemZero(id));
              }}
            >
              remove
            </button>
          </div>
          <div>
            {upda?.amount === max ? (
              <button
                disabled
                className="amount-btn"
                onClick={() => {
                  dispatch(increase(id));
                }}
              >
                <ChevronUp />
              </button>
            ) : (
              <button
                className="amount-btn"
                onClick={() => {
                  dispatch(increase(id));
                }}
              >
                <ChevronUp />
              </button>
            )}
            <p className="amount">{upda?.amount}</p>
            <button
              className="amount-btn"
              onClick={() => {
                if (amount === 1) {
                  dispatch(removeItem(id));
                  return;
                }
                dispatch(decrease(id));
              }}
            >
              <ChevronDown />
            </button>
          </div>
        </>
      )}
    </article>
  );
};

export default CartItem;
