import React, { useState } from "react";
import "./AddNewItems.css";
import { useDispatch } from "react-redux";
import {
  addOneItems,
  addOneItemsToCart,
  addOneItemsToHome,
} from "../features/cart/cartSlice";

const AddNewItems = () => {
  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [amount, setAmount] = useState();
  const [max, setMax] = useState();
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(addOneItemsToHome({ id, title, price, img, amount, max }));
    setId("");
    setTitle("");
    setPrice("");
    setImg("");
    setAmount("");
    setMax("");
  }

  return (
    <div className="container">
      <label for="id">ID:</label>
      <input
        type="text"
        id="id"
        name="id"
        value={id}
        onChange={(e) => setId(parseInt(e.target.value))}
      />
      <br />
      <br />
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
      <br />
      <br />
      <label for="Amount">Amount:</label>
      <input
        type="text"
        id="Amount"
        name="Amount"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <br />
      <br />
      <label for="maxAmount">Max Amount:</label>
      <input
        type="text"
        id="maxAmount"
        name="maxAmount"
        value={max}
        onChange={(e) => setMax(parseInt(e.target.value))}
      />
      <br />
      <br />
      <button className="but" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default AddNewItems;
