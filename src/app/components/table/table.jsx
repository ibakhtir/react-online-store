import React from "react";
import PropTypes from "prop-types";

import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ items, columns }) => (
  <table className="table table-hover">
    <TableHeader columns={columns} />
    <TableBody items={items} columns={columns} />
  </table>
);

Table.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
    )
  ),
  columns: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.func])
    )
  )
};

export default Table;
