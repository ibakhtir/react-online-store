import React from "react";
import { Link, useLocation } from "react-router-dom";

import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/constants";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  return (
    <div className="auth-container">
      <div className="container h-100">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="auth-block">
            <div className="p-4">
              {isLogin ? (
                <>
                  <h2 className="text-center mb-4">Вход в учетную запись</h2>
                  <LoginForm />
                  <p className="text-center mt-2">
                    Нет учетной записи?{" "}
                    <Link
                      className="text-decoration-none link-warning"
                      to={REGISTRATION_ROUTE}
                    >
                      Создать
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-center mb-4">Создание учетной записи</h2>
                  <RegisterForm />
                  <p className="text-center mt-2">
                    Есть учетная запись?{" "}
                    <Link
                      className="text-decoration-none link-warning"
                      to={LOGIN_ROUTE}
                    >
                      Войти
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
