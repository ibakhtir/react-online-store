import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  defaultOption,
  options,
  label,
  name,
  value,
  onChange,
  error
}) => {
  const getInputClasses = () => `form-select ${error ? "is-invalid" : ""}`;

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-2">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {defaultOption && (
          <option disabled value="">
            {defaultOption}
          </option>
        )}
        {options.length > 0 &&
          options.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  defaultOption: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default SelectField;
