import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import validator from "../../utils/validator";
import TextField from "../forms/textField";
import TextAreaField from "../forms/textAreaField";
import SelectField from "../forms/selectField";
import MultiSelectField from "../forms/multiSelectField";
import { updateItem } from "../../store/items";

import { categories } from "./categories";

const doughTypes = [
  { id: "1", name: "Традиционное тесто" },
  { id: "2", name: "Бездрожжевое тесто" },
  { id: "3", name: "Слоеное тесто" }
];

const EditItemForm = ({ item, onClose }) => {
  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const multiSelectOptions = categories.filter((obj) => obj.value !== "0");

  useEffect(() => {
    if (data && isLoading) {
      setLoading(false);
    }
  }, [data, isLoading]);

  useEffect(() => {
    const transformData = () => {
      const newData = [];
      item.categories.map((categoryId) =>
        categories.forEach((obj) => {
          if (categoryId === obj.value) {
            newData.push(obj);
          }
        })
      );
      return newData;
    };
    setData({
      ...item,
      categories: transformData()
    });
  }, [item]);

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

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      dispatch(
        updateItem({
          ...data,
          categories: data.categories.map((c) => c.value)
        })
      );
      setValid(true);
      onClose();
    } else {
      setValid(false);
    }
  };

  return (
    !isLoading && (
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
          Обновить
        </button>
      </form>
    )
  );
};

EditItemForm.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])
  ),
  onClose: PropTypes.func
};

export default EditItemForm;
