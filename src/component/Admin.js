import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  allCartItems,
  deleteoneItemFromAdmin,
  edit,
  maxAmountDecrease,
  maxAmountIncrease,
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

  function handleEdit(id) {
    dispatch(edit(id));
  }

  return (
    <div className="grid-container123">
      <div>
        {data.map((val, index) => {
          return (
            <div key={index} className="grid-item">
              <img src={val.img} alt="phones" />
              <p>{val.title}</p>
              <div style={{ display: "flex", marginLeft: "32%" }}>
                <p
                  style={{
                    border: "2px solid red",
                    cursor: "pointer",
                    width: "8%",
                  }}
                  onClick={() => {
                    dispatch(maxAmountIncrease(val.id));
                  }}
                >
                  +
                </p>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <p>Items Remaining - {val.max}</p>&nbsp;&nbsp;&nbsp;&nbsp;
                <p
                  style={{
                    border: "2px solid red",
                    cursor: "pointer",
                    width: "8%",
                  }}
                  onClick={() => {
                    if (val.max > 0) {
                      dispatch(maxAmountDecrease(val.id));
                    }
                  }}
                >
                  -
                </p>
              </div>
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                style={{
                  backgroundColor: "yellow",
                  color: "black",
                  border: "none",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
                onClick={() => handleEdit(val.id)}
              >
                Edit
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
