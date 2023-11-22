import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../src/component/Home.css";
import {
  addItemToCart,
  addWishListItems,
  increase,
  removeWishListItems,
} from "./features/cart/cartSlice";
import cartItems from "./features/utils/cartItems.json";
import { useInView } from "react-intersection-observer";

function CartItems() {
  const cartItemAmounts = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth.isAuth);
  const [displayedItems, setDisplayedItems] = useState(8);
  const data = useSelector((store) => store.cart.cartItems);
  const wishListItems = useSelector((store) => store.cart.wishList);

  const [inViewRef, inView] = useInView();

  useEffect(() => {
    if (inView) {
      setDisplayedItems((prevCount) => prevCount + 8);
    }
  }, [inView]);

  // const cartItemsFromJson = allCartItems();
  // console.log("CARTITEMSFROMJSON", data);
  const display = data.slice(0, displayedItems);

  const maxAmountNotZero = display.filter((val) => val.max > 0);

  console.log("WISH", wishListItems);

  return (
    <div className="grid-container">
      {maxAmountNotZero.map((val, index) => {
        const cartItem = cartItemAmounts?.find((item) => item.id === val.id);
        return (
          <div key={index} className="grid-item">
            <img src={val.img} alt="phones" />
            <p>{val.title}</p>
            <p>Rs - {val.price} Only</p>
            {auth && (
              <>
                <p>{cartItem ? cartItem.amount : 0}</p>
                {cartItem && cartItem.amount === cartItem.max ? (
                  <button disabled className="but">
                    Max Cart Limit Reached
                  </button>
                ) : (
                  <button
                    className="but"
                    onClick={() => {
                      dispatch(increase(val.id));
                      dispatch(addItemToCart());
                    }}
                  >
                    Add to Cart
                  </button>
                )}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {wishListItems.map((items) => {
                  if (items.id === val.id) {
                    return (
                      <>
                        <button
                          className="butremove"
                          onClick={() => {
                            dispatch(removeWishListItems(items.id));
                          }}
                        >
                          Remove from Wishlist
                        </button>
                      </>
                    );
                  } else {
                    return null;
                  }
                })}
                {wishListItems.find((items) => items.id === val.id) ? (
                  ""
                ) : (
                  <button
                    className="butwish"
                    onClick={() => {
                      dispatch(addWishListItems(val.id));
                    }}
                  >
                    Add to Wishlist
                  </button>
                )}
              </>
            )}
          </div>
        );
      })}
      <div ref={inViewRef} style={{ height: "1px" }}></div>
    </div>
  );
}

export default CartItems;
export { cartItems };
