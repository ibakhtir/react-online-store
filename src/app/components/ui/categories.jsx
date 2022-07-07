import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategory, setCategory } from "../../store/filter";

export const categories = [
  { value: "0", label: "Все" },
  { value: "1", label: "Мясная" },
  { value: "2", label: "Морская" },
  { value: "3", label: "Вегетерианская" },
  { value: "4", label: "Сырная" },
  { value: "5", label: "Острая" },
  { value: "6", label: "Детям" }
];

const Categories = () => {
  const dispatch = useDispatch();
  const category = useSelector(getCategory());

  const handleChangeCategory = (categoryId) => {
    dispatch(setCategory(categoryId));
  };

  return (
    <div className="overflow-auto">
      <ul className="list-group list-group-horizontal mb-1">
        {categories.map((obj) => (
          <li
            key={obj.value}
            aria-hidden="true"
            className={`list-group-item list-group-item-action list-group-item-warning text-center ${
              obj.value === category ? "active" : ""
            }`}
            onClick={() => handleChangeCategory(obj.value)}
          >
            {obj.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
