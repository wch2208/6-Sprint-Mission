import {
  checkEmailValidation,
  checkPasswordValidation,
  checkPasswordCheckValidation,
  checkNicknameValidation,
} from "../utils/formValidation.js";

//에러 메세지 출력 함수
const showErrorMessage = (errorDisplayElement, errorMessage) => {
  errorDisplayElement.textContent = errorMessage;
};

export const setErrorMessage = e => {
  const password = document.querySelector("#password")?.value;
  const passwordCheck = document.querySelector("#password-check")?.value;
  let errorMessage = "";
  const value = e.target.value;
  const currentTarget = e.target.id;
  const errorDisplayElement = e.target.nextElementSibling;

  switch (currentTarget) {
    case "email":
      errorMessage = checkEmailValidation(value);
      break;

    case "password":
      errorMessage = checkPasswordValidation(value);
      break;

    case "password-check":
      errorMessage = checkPasswordCheckValidation(password, passwordCheck);
      break;

    case "nickname":
      errorMessage = checkNicknameValidation(value);
      break;

    default:
      break;
  }

  showErrorMessage(errorDisplayElement, errorMessage);
};
