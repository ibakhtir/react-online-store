import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import TextField from "../common/forms/textField";
import TapButton from "../common/buttons/tapButton";
import validator from "../../utils/validator";
import { signIn } from "../../store/users";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(true);

  const dispatch = useDispatch();

  const validate = useCallback(() => {
    const validatorConfig = {
      email: {
        isRequired: { message: "Электронный адрес обязателен для заполнения" }
      },
      password: {
        isRequired: { message: "Пароль обязателен для заполнения" }
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
      dispatch(signIn(data));
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        Войти
      </TapButton>
    </form>
  );
};

export default LoginForm;
