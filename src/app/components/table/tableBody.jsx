import React from "react";
import PropTypes from "prop-types";

const TableBody = ({ items, columns }) => (
  <tbody className="table-group-divider">
    {items &&
      items.map((item) => (
        <tr key={item.id}>
          {columns.map((el) => (
            <td key={el.path}>{el.content(item)}</td>
          ))}
        </tr>
      ))}
  </tbody>
);

TableBody.propTypes = {
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  columns: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func]))
  )
};

export default TableBody;
