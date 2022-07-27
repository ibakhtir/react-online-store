import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import TextAreaField from "../forms/textAreaField";
import RadioField from "../forms/radioField";
import validator from "../../../utils/validator";
import { getCurrentUserId } from "../../../store/users";
import { createComment } from "../../../store/comments";

const initialState = { isRecommend: "yes", content: "" };

const AddCommentForm = () => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(true);

  const { itemId } = useParams();

  const currentUserId = useSelector(getCurrentUserId());

  const dispatch = useDispatch();

  const setDisabledForm = () => {
    if (currentUserId === undefined || currentUserId === null) {
      return true;
    }
    return false;
  };

  const validate = useCallback(() => {
    const validatorConfig = {
      content: {
        isRequired: {
          message: "Отзыв не может быть пустым"
        }
      }
    };
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
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      dispatch(createComment({ ...data, userId: currentUserId, itemId }));
      clearForm();
    } else {
      setValid(false);
    }
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h3>Оставить отзыв</h3>
        <hr />
        <div className="bg-light rounded p-2">
          <form onSubmit={handleSubmit}>
            <fieldset disabled={setDisabledForm()}>
              <TextAreaField
                name="content"
                value={data.content}
                placeholder={
                  currentUserId
                    ? "Введите текст"
                    : "Чтобы оставить отзыв, нужно зарегистрироваться"
                }
                onChange={handleChange}
                error={errors.content}
              />
              <RadioField
                options={[
                  { name: "Рекомендую", value: "yes" },
                  { name: "Не рекомендую", value: "no" }
                ]}
                name="isRecommend"
                value={data.isRecommend}
                onChange={handleChange}
              />
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-dark text-warning mb-1"
                >
                  Опубликовать
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCommentForm;
