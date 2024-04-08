import { emailCheck } from "./utils/formValidation.js";
import {
  setEmailErrorMessage,
  passwordErrorMessage,
} from "./components/errorMessage.js";

const loginBtn = document.querySelector(".submit");
const form = document.querySelector(".form-container");

//로그인 활성화 상태 변경하기
form.addEventListener("keyup", e => {
  if (
    emailInput.value === "" ||
    !emailCheck(emailInput.value) ||
    passwordInput.value === "" ||
    passwordInput.value.length < 8
  ) {
    loginBtn.disabled = true;
    loginBtn.style.backgroundColor = "#9ca3af";
  } else {
    loginBtn.disabled = false;
    loginBtn.style.backgroundColor = "#3692ff";
  }
});

const emailInput = document.querySelector("#email");
//이메일 포커스 아웃 이벤트
emailInput.addEventListener("focusout", function (e) {
  if (e.target.value === "") {
    setEmailErrorMessage(e, "이메일을 입력해주세요");
  }
  //이메일 형식 체크
  if (e.target.value !== "" && !emailCheck(e.target.value)) {
    setEmailErrorMessage(e, "잘못된 이메일 형식입니다");
  }
});

//포커스 인 이벤트
emailInput.addEventListener("focusin", function (e) {
  e.target.style.border = "none";
  const message = document.querySelector(".email-error-message");
  if (message) {
    message.remove();
  }
});

//비밀번호 포커스 아웃 이벤트
const passwordInput = document.querySelector(".password");
passwordInput.addEventListener("focusout", function (e) {
  if (e.target.value === "") {
    passwordErrorMessage(
      e,
      "비밀번호를 입력해주세요",
      "password-error-message"
    );
  }
  if (e.target.value !== "" && e.target.value.length < 8) {
    passwordErrorMessage(
      e,
      "비밀번호를 8자 이상 입력해주세요.",
      "password-error-message"
    );
  }
});

//비밀번호 포커스 인 이벤트
passwordInput.addEventListener("focusin", function (e) {
  e.target.style.border = "none";
  const message = document.querySelector(".password-error-message");
  if (message) {
    message.remove();
  }
});
