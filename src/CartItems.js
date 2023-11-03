import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../src/component/Home.css";
import { addItem, increase } from "./features/cart/cartSlice";

const cartItems = [
  {
    id: "rec1JZlfCIBOPdcT2",
    title: "Samsung Galaxy S8",
    price: "399.99",
    img: "https://images2.imgbox.com/c2/14/zedmXgs6_o.png",
    amount: 1,
    max: 3,
  },
  {
    id: "recB6qcHPxb62YJ75",
    title: "google pixel",
    price: "499.99",
    img: "https://images2.imgbox.com/fb/3d/O4TPmhlt_o.png",
    amount: 1,
    max: 6,
  },
  {
    id: "recdRxBsE14Rr2VuJ",
    title: "Xiaomi Redmi Note 2",
    price: "699.99",
    img: "https://images2.imgbox.com/4f/3d/WN3GvciF_o.png",
    amount: 1,
    max: 2,
  },
  {
    id: "recwTo160XST3PIoW",
    title: "Samsung Galaxy S7",
    price: "599.99 ",
    img: "https://images2.imgbox.com/2e/7c/yFsJ4Zkb_o.png",
    amount: 1,
    max: 10,
  },
];

function CartItems() {
  const cartItemAmounts = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth.isAuth);

  return (
    <div className="grid-container">
      {cartItems.map((val, index) => {
        const cartItem = cartItemAmounts.find((item) => item.id === val.id);
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
                      if (!cartItem) {
                        dispatch(addItem(val.id));
                      }
                      dispatch(increase(val.id));
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
    </div>
  );
}

export default CartItems;
export { cartItems };
