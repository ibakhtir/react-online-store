import React from "react";
import PropTypes from "prop-types";

const Alert = ({ content, color }) => (
  <div className={`alert alert-${color}`} role="alert">
    {content}
  </div>
);

Alert.propTypes = {
  content: PropTypes.string,
  color: PropTypes.string
};

export default Alert;
