import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import scrollTo from "../../../utils/scrollTo";
import { getCategories } from "../../../store/categories";
import {
  getCategory,
  setCategory,
  setSearchValue
} from "../../../store/filter";

const Categories = ({ position }) => {
  const categories = useSelector(getCategories());
  const category = useSelector(getCategory());

  const dispatch = useDispatch();

  const handleChangeCategory = (category) => {
    dispatch(setCategory(category));
    dispatch(setSearchValue(""));
    scrollTo(position);
  };

  return (
    categories && (
      <div className="overflow-auto">
        <ul className="list-group list-group-horizontal mb-1">
          {categories.map((obj) => (
            <li
              key={obj._id}
              aria-hidden="true"
              className={`list-group-item list-group-item-action list-group-item-warning text-center ${
                obj._id === category._id ? "active" : ""
              }`}
              onClick={() => handleChangeCategory(obj)}
            >
              {obj.name}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

Categories.propTypes = {
  position: PropTypes.number
};

export default Categories;
