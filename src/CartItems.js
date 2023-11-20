import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../src/component/Home.css";
import {
  LoginCart,
  addItem,
  addItemToCart,
  increase,
} from "./features/cart/cartSlice";
import cartItems from "./features/utils/cartItems.json";
import { useInView } from "react-intersection-observer";
import { allCartItems } from "./features/cart/cartSlice";

function CartItems() {
  const cartItemAmounts = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth.isAuth);
  const [displayedItems, setDisplayedItems] = useState(8);
  const data = useSelector((store) => store.cart.cartItems);

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
  console.log("MAX_AMOUNT_NOT_ZERO", maxAmountNotZero);

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
