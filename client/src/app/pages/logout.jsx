import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { signOut } from "../store/users";
import Preloader from "../components/common/preloader";

const LogOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOut());
  }, [dispatch]);

  return <Preloader color="warning" />;
};

export default LogOut;
