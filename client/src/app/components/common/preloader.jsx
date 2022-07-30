import React from "react";
import PropTypes from "prop-types";

const Preloader = ({ color, loaderHeight }) => (
  <div
    className="d-flex justify-content-center align-items-center p-4"
    style={{ height: loaderHeight }}
  >
    <div className={`spinner-border text-${color}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

Preloader.propTypes = {
  color: PropTypes.string,
  loaderHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Preloader;
