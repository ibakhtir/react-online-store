import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppRouter from "./components/AppRouter";
import NavBar from "./components/ui/navBar";
import AppLoader from "./components/common/loaders/appLoader";

function App() {
  return (
    <AppLoader>
      <NavBar />
      <AppRouter />
      <ToastContainer />
    </AppLoader>
  );
}

export default App;
