import React from "react";
import PropTypes from "prop-types";

const TableBody = ({ items, columns }) => (
  <tbody>
    {items &&
      items.map((item) => (
        <tr key={item._id}>
          {columns.map((el) => (
            <td key={el.path} className={el.style}>
              {el.content(item)}
            </td>
          ))}
        </tr>
      ))}
  </tbody>
);

TableBody.propTypes = {
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

export default TableBody;
