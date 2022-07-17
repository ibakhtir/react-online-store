import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import useOnClickOutside from "../../hooks/useOnClickOutside";
import { LOGOUT_ROUTE } from "../../utils/constants";

const NavProfile = () => {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef();

  useOnClickOutside(dropdownRef, () => setOpen(false));

  return (
    <button
      ref={dropdownRef}
      type="button"
      className="dropdown btn btn-warning me-2 btn-sm position-relative"
      onClick={() => setOpen(!isOpen)}
    >
      <i className="bi bi-person" />
      {isOpen && (
        <div className="dropdown-menu show position-absolute top-100 end-0 mt-2">
          <Link to={LOGOUT_ROUTE} className="dropdown-item">
            Выйти
          </Link>
        </div>
      )}
    </button>
  );
};

export default NavProfile;
