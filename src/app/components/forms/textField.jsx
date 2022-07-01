import React from "react";
import PropTypes from "prop-types";

const TextField = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  error
}) => {
  const getInputClasses = () => `form-control ${error ? "is-invalid" : ""}`;

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
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={getInputClasses()}
        autoComplete="true"
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextField;
