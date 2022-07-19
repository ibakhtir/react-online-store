import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, value, onChange }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-2">
      {options.map((option) => (
        <div key={option.value} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor={option.value}>
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default RadioField;
