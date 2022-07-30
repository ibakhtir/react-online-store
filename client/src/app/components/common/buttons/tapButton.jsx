import React from "react";
import PropTypes from "prop-types";

const TapButton = ({ children, type, color, rest, onClick, disabled }) => (
  <button
    type={type === "submit" ? "submit" : "button"}
    className={`btn btn-${color} ${rest} btn-tap`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

TapButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  type: PropTypes.string,
  color: PropTypes.string,
  rest: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default TapButton;
