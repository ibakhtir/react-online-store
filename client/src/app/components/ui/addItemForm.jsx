import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import TextField from "../common/forms/textField";
import TextAreaField from "../common/forms/textAreaField";
import SelectField from "../common/forms/selectField";
import MultiSelectField from "../common/forms/multiSelectField";
import validator from "../../utils/validator";
import getMultiSelectOptions from "../../utils/getMultiSelectOptions";
import { createItem } from "../../store/items";
import { getCategories } from "../../store/categories";

import doughTypes from "../../api/doughTypes";

const initialState = {
  name: "",
  description: "",
  imageUrl: "",
  dough: "",
  size: "",
  weight: "",
  calories: "",
  price: "",
  categories: []
};

const AddItemForm = ({ onClose }) => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(true);

  const categories = useSelector(getCategories());

  const dispatch = useDispatch();

  const multiSelectOptions = getMultiSelectOptions(categories);

  const validate = useCallback(() => {
    const validatorConfig = {};
    Object.keys(data).map(
      (field) =>
        (validatorConfig[field] = {
          isRequired: { message: "Обязательное поле" }
        })
    );
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [data]);

  useEffect(() => {
    if (isValid === false) validate();
  }, [data, isValid, validate]);

  const clearForm = () => {
    setData(initialState);
    setValid(true);
    setErrors({});
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      dispatch(
        createItem({
          ...data,
          categories: data.categories.map((c) => c.value)
        })
      );
      clearForm();
      onClose();
    } else {
      setValid(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Наименование"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextAreaField
        label="Описание"
        name="description"
        value={data.description}
        onChange={handleChange}
        error={errors.description}
      />
      <TextAreaField
        label="Изображение"
        name="imageUrl"
        value={data.imageUrl}
        onChange={handleChange}
        error={errors.imageUrl}
      />
      <SelectField
        defaultOption="Выбрать..."
        options={doughTypes}
        label="Тесто"
        name="dough"
        value={data.dough}
        onChange={handleChange}
        error={errors.dough}
      />
      <MultiSelectField
        defaultValue={data.categories}
        options={multiSelectOptions}
        label="Категории"
        name="categories"
        onChange={handleChange}
        error={errors.categories}
      />
      <div className="row">
        <div className="col-sm-3">
          <TextField
            type="number"
            label="Размер"
            name="size"
            value={data.size}
            onChange={handleChange}
            error={errors.size}
          />
        </div>
        <div className="col-sm-3">
          <TextField
            type="number"
            label="Вес"
            name="weight"
            value={data.weight}
            onChange={handleChange}
            error={errors.weight}
          />
        </div>
        <div className="col-sm-3">
          <TextField
            type="number"
            label="Калории"
            name="calories"
            value={data.calories}
            onChange={handleChange}
            error={errors.calories}
          />
        </div>
        <div className="col-sm-3">
          <TextField
            type="number"
            label="Цена"
            name="price"
            value={data.price}
            onChange={handleChange}
            error={errors.price}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={Object.keys(errors).length !== 0}
        className="btn btn-dark text-warning w-100 mt-3"
      >
        Создать
      </button>
    </form>
  );
};

AddItemForm.propTypes = {
  onClose: PropTypes.func
};

export default AddItemForm;
