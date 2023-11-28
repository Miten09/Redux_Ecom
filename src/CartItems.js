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
import Star from "./component/Star";
import "./CartItems.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TextField } from "@mui/material";

function CartItems() {
  const cartItemAmounts = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth.isAuth);
  const [displayedItems, setDisplayedItems] = useState(8);
  const data = useSelector((store) => store.cart.cartItems);
  const wishListItems = useSelector((store) => store.cart.wishList);
  const [searchBox, setSearchBox] = useState("");

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
  const [itemData, setItemData] = useState(maxAmountNotZero);

  const [selectOption, setSelectOption] = useState("");

  useEffect(() => {
    if (selectOption === "Price(Low to High)") {
      const lowToHigh = [...itemData].sort(
        (valA, valB) => valA.price - valB.price
      );
      console.log("LOWTOHIGH", lowToHigh);
      setItemData(lowToHigh);
    } else if (selectOption === "Price(High to Low)") {
      const highToLow = [...itemData].sort(
        (valA, valB) => valB.price - valA.price
      );
      console.log("HIGHTOLOW", highToLow);
      setItemData(highToLow);
    } else if (selectOption === "a to z") {
      function compare(a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      }
      const aToZ = [...itemData].sort(compare);
      console.log("ATOZ", aToZ);
      setItemData(aToZ);
    } else if (selectOption === "z to a") {
      function compare(a, b) {
        if (a.title > b.title) {
          return -1;
        }
        if (a.title < b.title) {
          return 1;
        }
        return 0;
      }
      const zToA = [...itemData].sort(compare);
      console.log("ZTOA", zToA);
      setItemData(zToA);
    }
  }, [selectOption]);

  function handleSearchChange(e) {
    setSearchBox(e.target.value);
  }

  const filterData = (searchBox) => {
    const filteredData = maxAmountNotZero.filter((item) =>
      item.title.toLowerCase().includes(searchBox.toLowerCase())
    );
    setItemData(filteredData);
  };

  useEffect(() => {
    filterData(searchBox);
  }, [searchBox]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Search"
          value={searchBox}
          onChange={handleSearchChange}
          style={{ width: "15%", marginLeft: "0.5%" }}
        />
        <Box sx={{ width: "20%", ml: 110, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Price</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={selectOption}
              onChange={(e) => setSelectOption(e.target.value)}
            >
              <MenuItem value="Price(Low to High)">Price(Low to High)</MenuItem>
              <MenuItem value="Price(High to Low)">Price(High to Low)</MenuItem>
              <MenuItem value="a to z">a to z</MenuItem>
              <MenuItem value="z to a">z to a</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <br />
      {itemData.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>No Products Found</h3>
      ) : (
        <div className="grid-container">
          {itemData.map((val, index) => {
            const cartItem = cartItemAmounts?.find(
              (item) => item.id === val.id
            );
            return (
              <div key={index} className="grid-item">
                <div className="item-container">
                  {val.stars >= 4.5 && <p className="bestseller">BestSeller</p>}
                  <img src={val.img} alt="phones" />
                  <p>{val.title}</p>
                  <p>Rs - {val.price}</p>
                  <Star star={val.stars} />
                  {auth && (
                    <>
                      <p>Selected - {cartItem ? cartItem.amount : 0}</p>
                      {val.max <= 2 && (
                        <h5 style={{ color: "red", fontSize: "15px" }}>
                          <b>Only Few Left</b>
                        </h5>
                      )}
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
              </div>
            );
          })}
          <div ref={inViewRef} style={{ height: "1px" }}></div>
        </div>
      )}
    </>
  );
}

export default CartItems;
export { cartItems };
