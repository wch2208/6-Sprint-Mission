import { ERROR_MESSAGES } from "../constants/messages.js";

const isEmpty = value => value === "";
const passwordLengthTooShort = value => value.length < 8;
// 패턴 설명:
// ^[A-Za-z0-9_\.\-]+ : '@' 기호 앞에 하나 이상의 영문자, 숫자, 밑줄(_), 점(.) 또는 대시(-)가 오는 것을 의미합니다.
// @[A-Za-z0-9\-]+ : '@' 기호 다음에 하나 이상의 영문자, 숫자 또는 대시(-)가 오는 것을 의미합니다.
// \.[A-Za-z0-9\-]+$ : 마지막 부분은 하나 이상의 영문자, 숫자 또는 대시(-)로 구성된 문자열 다음에 점(.)이 오고, 문자열의 끝나는 것을 의미합니다.
const checkEmailValidity = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+$/;
const loginBtn = document.querySelector("#login-btn");
const signupBtn = document.querySelector("#signup-btn");

function getElementValue(selector) {
  return document.querySelector(selector).value.trim();
}

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

//유효성 검사 공통 함수
const isValid = (validationFunction, ...args) => {
  return validationFunction(...args) === undefined;
};

//전체 유효성 확인
export function checkFormValidity() {
  const email = getElementValue("#email");
  const password = getElementValue("#password");
  const passwordCheck = getElementValue("#password-check");
  const nickname = getElementValue("#nickname");

  const isEmailValid = isValid(checkEmailValidation, email);
  const isPasswordValid = isValid(checkPasswordValidation, password);
  const isPasswordCheckValid = isValid(
    checkPasswordCheckValidation,
    password,
    passwordCheck
  );
  const isNicknameValid = isValid(checkNicknameValidation, nickname);

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
