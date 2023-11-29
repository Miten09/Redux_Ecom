import React, { useEffect, useState } from "react";
import "./AddingBalance.css";
import { useDispatch } from "react-redux";
import { addBalance } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const AddingBalance = () => {
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAddBalance = (amount) => {
    dispatch(addBalance(amount));
    setAmount("");
    navigate("/cart");
  };

  useEffect(() => {
    if (!localStorage.getItem("Login")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="adding-balance-container">
      <input
        className="input-amount"
        type="text"
        placeholder="Enter Your Amount"
        value={Number(amount)}
        onChange={handleInputChange}
      />
      <div className="balance-buttons">
        <button onClick={() => setAmount(amount + 100)}>+ 100</button>
        <button
          onClick={() => {
            if (amount >= 100) {
              setAmount(amount - 100);
            }
          }}
        >
          - 100
        </button>
      </div>
      <div className="balance-buttons">
        <button onClick={() => setAmount(amount + 200)}>+ 200</button>
        <button
          onClick={() => {
            if (amount >= 200) {
              setAmount(amount - 200);
            }
          }}
        >
          - 200
        </button>
      </div>
      <div className="balance-buttons">
        <button onClick={() => setAmount(amount + 500)}>+ 500</button>
        <button
          onClick={() => {
            if (amount >= 500) {
              setAmount(amount - 500);
            }
          }}
        >
          - 500
        </button>
      </div>
      <div className="balance-buttons">
        <button onClick={() => setAmount(amount + 1000)}>+ 1000</button>
        <button
          onClick={() => {
            if (amount >= 1000) {
              setAmount(amount - 1000);
            }
          }}
        >
          - 1000
        </button>
      </div>
      <div className="balance-buttons but">
        <button
          style={{ color: "Black" }}
          onClick={() => handleAddBalance(amount)}
        >
          Add Balance
        </button>
      </div>
      <div className="balance-buttons but">
        <button style={{ color: "Black" }} onClick={() => setAmount("")}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default AddingBalance;
