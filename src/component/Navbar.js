import { NavLink } from "react-router-dom";
import { CartIcon } from "../icons";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { amount } = useSelector((store) => store.cart);
  console.log(">>>>>>>!!!!!!!!!", amount);
  return (
    <nav>
      <div className="nav-center">
        <NavLink to="/" style={{ color: "black" }}>
          Home
        </NavLink>
        <h3>redux toolkit</h3>
        <div className="nav-container">
          <NavLink to="/cart">
            <CartIcon />
          </NavLink>
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
