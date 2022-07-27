import React from "react";
import PropTypes from "prop-types";

const Badge = ({ data, color, rest }) => (
  <span className={`badge text-bg-${color} ${rest}`}>{data}</span>
);

Badge.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  rest: PropTypes.string
};

export default Badge;
