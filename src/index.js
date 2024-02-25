import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import { setToken } from "./store/reducers/userSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
const token = localStorage.getItem("token");
if (token) {
  store.dispatch(setToken(token));
}
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
