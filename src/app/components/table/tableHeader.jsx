import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ columns }) => (
  <thead>
    <tr>
      {columns.map((el) => (
        <th key={el.path} scope="col">
          {el.name}
        </th>
      ))}
    </tr>
  </thead>
);

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func]))
  )
};

export default TableHeader;
