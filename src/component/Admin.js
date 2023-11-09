import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  allCartItems,
  deleteoneItemFromAdmin,
} from "../features/cart/cartSlice";
import AddNewItems from "./AddNewItems";
import { useDispatch, useSelector } from "react-redux";

const Admin = () => {
  const data = useSelector((store) => store.cart.cartItems);
  const navigate = useNavigate();

  const userRole = localStorage.getItem("Login");

  useEffect(() => {
    if (!userRole || userRole !== "admin") {
      navigate("/login");
    }
  }, []);
  console.log("DATAAAA", data);

  const dispatch = useDispatch();

  return (
    <div className="grid-container123">
      <div>
        {data.map((val, index) => {
          return (
            <div key={index} className="grid-item">
              <img src={val.img} alt="phones" />
              <p>{val.title}</p>
              <p>Items Remaining - {val.max}</p>
              <p>Rs - {val.price} Only</p>
              <button
                style={{
                  backgroundColor: "red",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
                onClick={() => dispatch(deleteoneItemFromAdmin(val.id))}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <AddNewItems />
      </div>
    </div>
  );
};

export default Admin;
