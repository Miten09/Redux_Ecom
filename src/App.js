import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./component/CartContainer";
import Navbar from "./component/Navbar";
import { useEffect } from "react";
import { calculateTotals } from "./features/cart/cartSlice";
import Modal from "./component/Modal";
import { Route, Router, Routes } from "react-router-dom";
import CartItems from "./CartItems";

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const open = useSelector((state) => state.modal.isOpen);
  console.log("OPEN", open);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  return (
    <>
      {open && <Modal />}
      <Navbar />
      <Routes>
        <Route path="/" element={<CartItems />} />
        <Route path="/cart" element={<CartContainer />} />
      </Routes>
    </>
  );
}

export default App;
