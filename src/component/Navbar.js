import { NavLink, useNavigate } from "react-router-dom";
import { CartIcon } from "../icons";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { authFalse, authTrue } from "../features/auth/authSlice";
import { clearCart } from "../features/cart/cartSlice";

const Navbar = () => {
  const { amount } = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(authFalse());
    dispatch(clearCart());
    localStorage.removeItem("Login");
    navigate("/login");
  }

  const auth = useSelector((store) => store.auth.isAuth);
  const userRole = localStorage.getItem("Login");

  return (
    <nav>
      <div className="nav-center">
        {auth && userRole == "admin" && (
          <NavLink to="/admin" style={{ color: "white" }}>
            Admin
          </NavLink>
        )}
        <NavLink to="/home" style={{ color: "white" }}>
          Home
        </NavLink>
        {auth && (
          <NavLink to="/wishlist" style={{ color: "white" }}>
            Wishlists
          </NavLink>
        )}
        {auth && (
          <NavLink to="/purchased" style={{ color: "white" }}>
            Purchased
          </NavLink>
        )}
        {!auth && (
          <NavLink to="/login" style={{ color: "white" }}>
            Login
          </NavLink>
        )}
        <h3>redux toolkit</h3>
        {auth && (
          <>
            <div className="nav-container">
              <NavLink to="/cart">
                <CartIcon />
              </NavLink>
              <div className="amount-container">
                <p className="total-amount">{amount}</p>
              </div>
            </div>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
