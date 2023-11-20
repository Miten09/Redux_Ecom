import React, { useEffect, useState } from "react";
import "./AddNewItems.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addOneItems,
  addOneItemsToCart,
  addOneItemsToHome,
  clearAdminFields,
  edit,
  update,
} from "../features/cart/cartSlice";
import { v4 as uuidv4 } from "uuid";

const AddNewItems = () => {
  const [id, setId] = useState(uuidv4());
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [amount, setAmount] = useState(0);
  const [max, setMax] = useState();

  const dispatch = useDispatch();

  let editFields = useSelector((store) => store.cart.adminFields);
  let all = useSelector((store) => store.cart.cartItems);

  // const [editFields, setEditFields] = useState();
  console.log("IMAGE", img);
  console.log("EDIT", editFields);

  const idOfEdit = editFields.id;

  useEffect(() => {
    if (editFields) {
      setTitle(editFields?.title);
      setPrice(editFields?.price);
      setImg(editFields?.img);
      setMax(editFields?.max);
      setAmount(editFields?.amount);
    }
  }, [editFields]);

  function handleSubmit() {
    dispatch(addOneItemsToHome({ id, title, price, img, amount, max }));
    setId("");
    setTitle("");
    setPrice("");
    setImg("");
    setAmount("");
    setMax("");
  }

  function handleReset() {
    setId("");
    setTitle("");
    setPrice("");
    setImg("");
    setAmount("");
    setMax("");
    dispatch(clearAdminFields());
  }

  function handleUpdate() {
    dispatch(update({ idOfEdit, title, price, img, amount, max }));
    dispatch(clearAdminFields());
    setId("");
    setTitle("");
    setPrice("");
    setImg("");
    setAmount("");
    setMax("");
  }

  // let cartItem = all.find((item) => item.id === editFields.id);
  // console.log("cartItem", cartItem?.title);

  return (
    <div className="container">
      <label for="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <label for="price">Price:</label>
      <input
        type="text"
        id="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <br />
      <label for="image">Image URL:</label>
      <input
        type="file"
        id="myFile"
        name="filename"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const imageSrc = e.target.result;
              setImg(imageSrc);
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <img src={img} />
      <br />
      <br />
      <label for="Amount">Amount:</label>
      <input
        type="text"
        id="Amount"
        name="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <br />
      <br />
      <label for="maxAmount">Max Amount:</label>
      <input
        type="text"
        id="maxAmount"
        name="maxAmount"
        value={max}
        onChange={(e) => setMax(Number(e.target.value))}
      />
      <br />
      <br />
      {editFields ? (
        <button className="but" onClick={handleUpdate}>
          Update
        </button>
      ) : (
        <button className="but" onClick={handleSubmit}>
          Submit
        </button>
      )}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        type="reset"
        value="Clear"
        className="but"
        onClick={handleReset}
      ></input>
    </div>
  );
};

export default AddNewItems;
