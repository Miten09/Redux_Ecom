import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import {
  allCartItemsAmountZero,
  balanceDeducted,
  clearCart,
  purchaseItems,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const dispatch = useDispatch();
  const { total, myBalance } = useSelector((store) => store.cart);

  const navigate = useNavigate();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  return myBalance < total ? (
    <>
      <aside className="modal-container" onClick={closeModalHandler}>
        <div className="modal">
          <h4>Not Enough Balance ! </h4>
          <div className="btn-container">
            <button
              type="button"
              className="btn confirm-btn"
              onClick={() => {
                navigate("/balance");
              }}
            >
              Add Balance
            </button>
            <button
              type="button"
              className="btn clear-btn"
              onClick={() => dispatch(closeModal())}
            >
              cancel
            </button>
          </div>
        </div>
      </aside>
    </>
  ) : (
    <aside className="modal-container" onClick={closeModalHandler}>
      <div className="modal">
        <h4>Confirm Purchase?</h4>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(purchaseItems());
              dispatch(closeModal());
              dispatch(balanceDeducted());
            }}
          >
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => dispatch(closeModal())}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
