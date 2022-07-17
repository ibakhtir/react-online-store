import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { getSortProperties, setSort } from "../../../store/filter";

const sortList = [
  { name: "самые популярные", path: "rating", order: "desc" },
  { name: "от дешевых к дорогим", path: "price", order: "asc" },
  { name: "от дорогих к дешевым", path: "price", order: "desc" }
];

const Sort = () => {
  const [isOpen, setOpen] = useState(false);
  const sortRef = useRef(null);
  const { name } = useSelector(getSortProperties());
  const dispatch = useDispatch();

  useOnClickOutside(sortRef, () => setOpen(false));

  const handleSort = (sortProperties) => {
    dispatch(setSort(sortProperties));
  };

  return (
    <div className="position-relative">
      <i className="bi bi-filter-left me-1" />
      <span className="fw-bold">Сортировать: </span>
      <span
        ref={sortRef}
        aria-hidden="true"
        className="badge bg-light text-warning fw-semibold fs-6 sort-menu"
        onClick={() => setOpen(!isOpen)}
      >
        {name}
      </span>
      {isOpen && (
        <ul className="dropdown-menu show position-absolute top-100 end-0 mt-2">
          {sortList.map((obj) => (
            <li
              key={`${obj.path}_${obj.order}`}
              aria-hidden="true"
              className={`dropdown-item ${obj.name === name ? "active" : ""}`}
              onClick={() => handleSort(obj)}
            >
              {obj.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sort;
