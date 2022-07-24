import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { loadUsersList } from "../../../store/users";
import { loadItemsList } from "../../../store/items";
import { loadCategoriesList } from "../../../store/categories";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersList());
    dispatch(loadItemsList());
    dispatch(loadCategoriesList());
  }, [dispatch]);

  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
