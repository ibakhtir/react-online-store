import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
  label,
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
    <div className="my-2">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <textarea
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

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextAreaField;
