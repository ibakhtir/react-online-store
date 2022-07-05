import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { getIsLoggedIn } from "../../store/users";
import { getCartItems } from "../../store/cart";
import { calcTotalCount } from "../../utils/calculations";
import {
  MAIN_ROUTE,
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  SHOPPING_CART_ROUTE
} from "../../utils/constants";

import NavProfile from "./navProfile";

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const cartItems = useSelector(getCartItems());
  const totalCount = calcTotalCount(cartItems);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    isMounted.current = true;
  }, [cartItems]);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link
          to={MAIN_ROUTE}
          className="navbar-brand text-warning mb-0 ms-1 h1"
        >
          PIZZA
        </Link>
        <div className="d-flex">
          {isLoggedIn && (
            <Link
              to={ADMIN_ROUTE}
              role="button"
              className="btn btn-warning me-2 btn-sm"
            >
              <i className="bi bi-gear" />
            </Link>
          )}
          {isLoggedIn ? (
            <NavProfile />
          ) : (
            <Link
              to={LOGIN_ROUTE}
              role="button"
              className="btn btn-warning me-2 btn-sm"
            >
              <i className="bi bi-person" />
            </Link>
          )}
          <Link
            to={SHOPPING_CART_ROUTE}
            role="button"
            className="btn btn-warning me-2 btn-sm position-relative"
          >
            <i className="bi bi-cart" />
            {totalCount > 0 && (
              <span className="badge rounded-pill text-bg-danger position-absolute top-0 start-100 translate-middle">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
