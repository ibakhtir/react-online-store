import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Preloader from "../preloader";
import { loadUsersList } from "../../../store/users";
import { loadItemsList, getItemsLoadingStatus } from "../../../store/items";
import { loadCategoriesList } from "../../../store/categories";

const AppLoader = ({ children }) => {
  const itemsLoadingStatus = useSelector(getItemsLoadingStatus());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersList());
    dispatch(loadItemsList());
    dispatch(loadCategoriesList());
  }, [dispatch]);

  if (itemsLoadingStatus)
    return <Preloader color="warning" loaderHeight="100vh" />;
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
