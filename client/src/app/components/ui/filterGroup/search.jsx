import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import {
  getSearchValue,
  setSearchValue,
  setCategory
} from "../../../store/filter";

const Search = () => {
  const [value, setValue] = useState("");
  const searchValue = useSelector(getSearchValue());
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchValue === "") {
      setValue("");
    }
  }, [searchValue]);

  const updateSearchValue = debounce((str) => {
    dispatch(setSearchValue(str));
    if (str) {
      dispatch(setCategory({ _id: "62d82150fa9f3bce7c9a6533", name: "Все" }));
    }
  }, 250);

  const handleChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className="input-group input-group-sm">
      <span className="input-group-text bg-white border-0">
        <i className="bi bi-search text-warning" />
      </span>
      <input
        type="search"
        value={value}
        placeholder="Поиск пиццы..."
        className="form-control border-0"
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default Search;
