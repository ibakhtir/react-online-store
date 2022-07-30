import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import TextField from "../common/forms/textField";
import TapButton from "../common/buttons/tapButton";
import validator from "../../utils/validator";
import { signUp } from "../../store/users";

const RegisterForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(true);

  const dispatch = useDispatch();

  const validate = useCallback(() => {
    const validatorConfig = {
      name: {
        isRequired: { message: "Имя обязательно для заполнения" }
      },
      email: {
        isRequired: { message: "Электронный адрес обязателен для заполнения" },
        isEmail: { message: "Введен некорректный электронный адрес" }
      },
      password: {
        isRequired: { message: "Пароль обязателен для заполнения" },
        isCapitalSymbol: {
          message: "Пароль должен содержать хотя бы одну заглавную букву"
        },
        isDigit: { message: "Пароль должен содержать хотя бы одну цифру" },
        isMinLength: {
          message: "Пароль должен состоять минимум из 8 символов",
          value: 8
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

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      dispatch(signUp(data));
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        value={data.name}
        placeholder="Имя"
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        name="email"
        value={data.email}
        placeholder="Электронный адрес"
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        type="password"
        name="password"
        value={data.password}
        placeholder="Пароль"
        onChange={handleChange}
        error={errors.password}
      />
      <TapButton
        type="submit"
        color="warning"
        rest="w-100 mx-auto mt-3"
        disabled={Object.keys(errors).length !== 0}
      >
        Создать
      </TapButton>
    </form>
  );
};

export default RegisterForm;
