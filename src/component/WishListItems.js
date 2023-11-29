import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeWishListItems } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const WishListItems = () => {
  const select = useSelector((state) => state.cart.wishList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("Login")) {
      navigate("/login");
    }
  }, []);

  const gridContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  };

  const gridItemStyle = {
    flexBasis: "calc(25% - 20px)",
    textAlign: "center",
  };

  return (
    <>
      {select.length > 0 ? (
        <div style={gridContainerStyle}>
          {select.map((val, index) => {
            return (
              <div key={index} className="grid-item" style={gridItemStyle}>
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
