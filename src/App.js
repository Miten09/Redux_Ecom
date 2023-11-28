import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./component/CartContainer";
import Navbar from "./component/Navbar";
import { useEffect } from "react";
import { calculateTotals, clearAdminFields } from "./features/cart/cartSlice";
import Modal from "./component/Modal";
import { Route, Router, Routes } from "react-router-dom";
import CartItems from "./CartItems";
import Login from "./component/Login";
import Admin from "./component/Admin";
import AddingBalance from "./component/AddingBalance";
import WishListItems from "./component/WishListItems";
import PurchasedItems from "./component/PurchasedItems";

function App() {
  const { cartItems, addToCart, adminFields } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const open = useSelector((state) => state.modal.isOpen);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, addToCart]);

  return (
    <>
      {open && <Modal />}
      <Navbar />
      <Routes>
        <Route path="/home" element={<CartItems />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartContainer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/balance" element={<AddingBalance />} />
        <Route path="/wishlist" element={<WishListItems />} />
        <Route path="/purchased" element={<PurchasedItems />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
