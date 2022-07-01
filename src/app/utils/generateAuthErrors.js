export default function generateAuthErrors(message) {
  let errorMessage;

  if (
    message === "EMAIL_NOT_FOUND" ||
    message === "INVALID_EMAIL" ||
    message === "INVALID_PASSWORD"
  ) {
    errorMessage = "Неверный адрес или пароль";
  } else if (message === "EMAIL_EXISTS") {
    errorMessage = "Пользователь с таким адресом уже существует";
  } else {
    errorMessage = "Что-то пошло не так. Попробуйте позже.";
  }

  return errorMessage;
}
