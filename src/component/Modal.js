import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import {
  allCartItemsAmountZero,
  clearCart,
  purchaseItems,
} from "../features/cart/cartSlice";

const Modal = () => {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  return (
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
