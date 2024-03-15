import React from "react";
import MyRouter from "routers/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div
      className="text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200"
      style={{
        backgroundImage:
          "linear-gradient(to right top, #d5e0e1, #d0dedf, #ccdbdc, #c7d9da, #c2d6d8)",
      }}
    >
      <ToastContainer />
      <MyRouter />
    </div>
  );
}

export default App;
