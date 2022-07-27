import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({
  defaultValue,
  options,
  label,
  name,
  onChange,
  error
}) => {
  const formStyles = {
    control: (base, state) => {
      const getBorderColor = () => {
        let color = "#ced4da";
        if (state.isFocused && !error) {
          color = "#ffc107";
        } else if (error) {
          color = "#dc3545";
        }
        return color;
      };

      return {
        ...base,
        borderColor: getBorderColor(),
        boxShadow: "none !important",
        ":active, :hover": {
          borderColor: getBorderColor()
        }
      };
    },

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused && "#9D9D9D",
      color: state.isFocused && "#fff",
      ":hover": {
        backgroundColor: "#9D9D9D",
        color: "#fff"
      }
    })
  };

  const handleChange = (value) => {
    onChange({ name, value });
  };

  return (
    <div className="mb-2">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <Select
        isMulti
        name={name}
        defaultValue={defaultValue}
        value={defaultValue}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Выбрать..."
        onChange={handleChange}
        styles={formStyles}
      />
      {error && (
        <div
          style={{
            color: "#dc3545",
            width: "100%",
            fontSize: "0.875em",
            marginTop: "0.25rem"
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

MultiSelectField.propTypes = {
  defaultValue: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ),
  options: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ),
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default MultiSelectField;
