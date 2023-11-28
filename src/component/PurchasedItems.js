import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allCartItems,
  returnItemDecrease,
  returnItemIncrease,
  returnOrder,
} from "../features/cart/cartSlice";
import "./PurchasedItems.css";

const PurchasedItems = () => {
  const purchased = useSelector((store) => store.cart.alreadyPurchase);
  console.log("After", purchased);

  const dispatch = useDispatch();

  const purchaseAmount = purchased.filter((item) => item.amount > 0);

  return (
    <>
      <div className="purchased-items-container">
        {purchaseAmount.length === 0 ? (
          <h2 style={{ marginTop: "20px" }}>No Items is Purchased</h2>
        ) : (
          purchased?.map((items, index) => {
            return (
              items.amount > 0 && (
                <div key={index} className="purchased-item">
                  <img src={items.img} />
                  <p>Name - {items.title}</p>
                  <p>Price - Rs {items.price}</p>
                  <p>Purchased Items - {items.amount}</p>
                  <div style={{ display: "flex" }}>
                    <p
                      style={{
                        border: "2px solid red",
                        cursor: "pointer",
                        width: "25px",
                      }}
                      onClick={() => {
                        if (items.amount > items.return)
                          dispatch(returnItemIncrease(items.id));
                      }}
                    >
                      +
                    </p>
                    &nbsp;&nbsp;&nbsp;
                    <p>Items to be Returned - {items.return}</p>
                    &nbsp;&nbsp;&nbsp;
                    <p
                      style={{
                        border: "2px solid red",
                        cursor: "pointer",
                        width: "25px",
                      }}
                      onClick={() => {
                        if (items.return > 0) {
                          dispatch(returnItemDecrease(items.id));
                        }
                      }}
                    >
                      -
                    </p>
                  </div>

                  <button
                    className="butremove"
                    onClick={() => dispatch(returnOrder(items.id))}
                  >
                    Return Order
                  </button>
                </div>
              )
            );
          })
        )}
      </div>
    </>
  );
};

export default PurchasedItems;
