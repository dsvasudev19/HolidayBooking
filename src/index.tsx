import React from "react";
import ReactDOM from "react-dom/client";

import "rc-slider/assets/index.css";
// STYLE
import "./styles/index.scss";
import "./index.css";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";
import { AuthProvider } from "./AuthContext";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { SearchContextProvider } from "SearchContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const axiosInstance = axios.create({
  baseURL: "https://www.solitary.spackdigi.com/v1",
  withCredentials: true,
});

root.render(
  // <React.StrictMode>
  <AuthProvider>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </AuthProvider>
  // </React.StrictMode>
);
reportWebVitals();
