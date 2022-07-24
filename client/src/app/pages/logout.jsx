import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { signOut } from "../store/users";

const LogOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOut());
  }, [dispatch]);

  return "Loading...";
};

export default LogOut;
