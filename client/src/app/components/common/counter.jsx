import React from "react";
import PropTypes from "prop-types";

const Counter = ({ onPlus, onMinus, counter }) => (
  <div className="btn-group mx-1">
    <button
      type="button"
      className="btn btn-dark text-warning"
      onClick={onPlus}
    >
      <i className="bi bi-chevron-up" />
    </button>
    <button type="button" className="btn btn-dark text-warning">
      {counter}
    </button>
    <button
      type="button"
      className="btn btn-dark text-warning"
      onClick={onMinus}
    >
      <i className="bi bi-chevron-down" />
    </button>
  </div>
);

Counter.propTypes = {
  onPlus: PropTypes.func,
  onMinus: PropTypes.func,
  counter: PropTypes.number
};

export default Counter;
