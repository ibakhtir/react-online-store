import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppRouter from "./components/AppRouter";
import { loadUsersList } from "./store/users";
import NavBar from "./components/ui/navBar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersList());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
