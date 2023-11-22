import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeWishListItems } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const WishListItems = () => {
  const select = useSelector((state) => state.cart.wishList);
  console.log("SELECT", select);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("Login")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {select.length > 0 ? (
        <div style={{ width: "30%" }}>
          {select.map((val, index) => {
            return (
              <div key={index} className="grid-item">
                <img src={val.img} alt="phones" />
                <p>{val.title}</p>
                <p>Rs - {val.price} Only</p>
                <button
                  className="butremove"
                  onClick={() => {
                    dispatch(removeWishListItems(val.id));
                  }}
                >
                  Remove from Wishlist
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <h3 style={{ textAlign: "center", marginTop: "5%" }}>
          No Item is Present in Wishlist
        </h3>
      )}
    </>
  );
};

export default WishListItems;
