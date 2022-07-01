import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { LOGOUT_ROUTE } from "../../utils/constants";

const NavProfile = () => {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const isClick = (e) => {
      if (dropdownRef.current.contains(e.target)) {
        setOpen((prevState) => !prevState);
      } else {
        setOpen(false);
      }
    };
    document.addEventListener("click", isClick);
    return () => document.removeEventListener("click", isClick);
  }, []);

  return (
    <button
      type="button"
      className="dropdown btn btn-warning me-2 btn-sm position-relative"
      ref={dropdownRef}
    >
      <i className="bi bi-person" />
      <div
        className={`dropdown-menu ${
          isOpen ? "show" : ""
        } position-absolute top-100 end-0 mt-3`}
      >
        <Link to={LOGOUT_ROUTE} className="dropdown-item my-1">
          Выйти
        </Link>
      </div>
    </button>
  );
};

export default NavProfile;
