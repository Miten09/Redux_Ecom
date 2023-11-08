import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const container = document.getElementById("root");
const root = createRoot(container);
let persistor = persistStore(store);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  </BrowserRouter>
);
