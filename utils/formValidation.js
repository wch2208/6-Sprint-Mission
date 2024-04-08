import { ERROR_MESSAGES } from "../constants/messages.js";

const isEmpty = value => value === "";
const passwordLengthTooShort = value => value.length < 8;
const checkEmailValidity = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

//이메일 유효성 검사
export const checkEmailValidation = value => {
  if (isEmpty(value)) {
    return ERROR_MESSAGES.emailEmpty;
  } else if (!checkEmailValidity.test(value)) {
    return ERROR_MESSAGES.emailFormat;
  }
};

//password 유효성 검사
export const checkPasswordValidation = value => {
  if (isEmpty(value)) {
    return ERROR_MESSAGES.password;
  } else if (passwordLengthTooShort(value)) {
    return ERROR_MESSAGES.passwordLength;
  }
};

//password 일치 여부 검사
export const checkPasswordCheckValidation = (password, passwordCheck) => {
  if (password !== passwordCheck) {
    return ERROR_MESSAGES.passwordWrong;
  }
};

//nickname 유효성 검사
export const checkNicknameValidation = value => {
  if (isEmpty(value)) {
    return ERROR_MESSAGES.nicknameEmpty;
  }
};

//전체 유효성 확인
export function checkFormValidity() {
  const loginBtn = document.querySelector("#login-btn");
  const signupBtn = document.querySelector("#signup-btn");
  const { value: email } = document.querySelector("#email");
  const { value: password } = document.querySelector("#password");
  const passwordCheckValue = document.querySelector("#password-check")?.value;
  const nicknameValue = document.querySelector("#nickname")?.value;

  const isEmailValid = checkEmailValidation(email) === undefined;
  const isPasswordValid = checkPasswordValidation(password) === undefined;
  const isPasswordCheckValid =
    checkPasswordCheckValidation(password, passwordCheckValue) === undefined;
  const isNicknameValid = checkNicknameValidation(nicknameValue) === undefined;

  if (loginBtn) {
    isEmailValid && isPasswordValid
      ? (loginBtn.disabled = false)
      : (loginBtn.disabled = true);
  }

  if (signupBtn) {
    isEmailValid && isNicknameValid && isPasswordValid && isPasswordCheckValid
      ? (signupBtn.disabled = false)
      : (signupBtn.disabled = true);
  }
}
