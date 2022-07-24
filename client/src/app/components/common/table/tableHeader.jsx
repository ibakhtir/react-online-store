import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { getTableSortProperties, setTableSort } from "../../../store/filter";

const TableHeader = ({ columns }) => {
  const { path, order } = useSelector(getTableSortProperties());

  const dispatch = useDispatch();

  const renderSortArrow = (el) => {
    if (path === el.path && el.isSortable) {
      if (order === "asc") {
        return <i className="ms-1 bi bi-arrow-down-short text-warning" />;
      }
      return <i className="ms-1 bi bi-arrow-up-short text-warning" />;
    }
    return null;
  };

  const handleSort = (el) => {
    if (el.isSortable) {
      if (path === el.path) {
        dispatch(
          setTableSort({
            path: el.path,
            order: order === "asc" ? "desc" : "asc"
          })
        );
      } else {
        dispatch(setTableSort({ path: el.path, order: "asc" }));
      }
    }
  };

  return (
    <thead>
      <tr>
        {columns.map((el) => (
          <th
            key={el.path}
            role={el.isSortable ? "button" : undefined}
            scope="col"
            onClick={() => handleSort(el)}
          >
            <span className="d-inline-block d-flex">
              {el.name}
              {renderSortArrow(el)}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.func])
    )
  )
};

export default TableHeader;
