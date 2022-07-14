import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
import Search from "./search";

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const cartItems = useSelector(getCartItems());
  const totalCount = calcTotalCount(cartItems);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCollapse = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="container py-2">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark rounded">
        <div className="container-fluid">
          <Link
            to={MAIN_ROUTE}
            className="navbar-brand text-warning mb-0 ms-2 h1"
          >
            PIZZA
          </Link>
          <button
            type="button"
            className="btn navbar-toggler border-0"
            onClick={handleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`collapse navbar-collapse ${
              isOpen ? "show" : "hide"
            } justify-content-end mx-2`}
          >
            {location.pathname === MAIN_ROUTE && (
              <div className="me-2 my-1">
                <Search />
              </div>
            )}
            <div className="d-flex justify-content-start align-items-center py-2">
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
                className="btn btn-warning btn-sm position-relative"
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
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
