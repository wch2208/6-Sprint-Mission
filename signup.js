import { emailCheck } from "./utils/formValidation.js";
import {
  emailErrorMessage,
  passwordErrorMessage,
  nicknameErrorMessage,
} from "./components/errorMessage.js";

const loginBtn = document.querySelector(".submit");
const form = document.querySelector(".form-container");

//회원가입 활성화 상태 변경하기
form.addEventListener("keyup", e => {
  //에러 메세지 존재 유무 확인
  const errorMesseges = document.querySelectorAll(".error");
  if (
    errorMesseges.length === 0 &&
    emailCheck(emailInput.value) &&
    nicknameInput.length !== 0 &&
    passwordInput.value.length >= 8 &&
    passwordCheck.value.length >= 8
  ) {
    loginBtn.disabled = false;
    loginBtn.style.backgroundColor = "#3692ff";
  } else {
    loginBtn.disabled = true;
    loginBtn.style.backgroundColor = "#9ca3af";
  }
});

const emailInput = document.querySelector("#email");
//이메일 포커스 아웃 이벤트
emailInput.addEventListener("focusout", function (e) {
  if (e.target.value === "") {
    emailErrorMessage(e, "이메일을 입력해주세요");
  }
  //이메일 형식 체크
  if (e.target.value !== "" && !emailCheck(e.target.value)) {
    emailErrorMessage(e, "잘못된 이메일 형식입니다");
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

//닉네임 포커스 아웃 이벤트
const nicknameInput = document.querySelector("#nickname");
nicknameInput.addEventListener("focusout", e => {
  if (e.target.value === "") {
    nicknameErrorMessage(e, "닉네임을 입력해주세요.");
  }
});
//닉네임 포커스 인 이벤트
nicknameInput.addEventListener("focusin", e => {
  e.target.style.border = "none";
  const message = document.querySelector(".nickname-error-message");
  if (message) {
    message.remove();
  }
});

//비밀번호 재확인 포커스 아웃 이벤트
const passwordCheck = document.querySelector("#password_check");
passwordCheck.addEventListener("focusout", e => {
  const passwordCheckErrorMessage = document.querySelector(
    ".password-check-error-message"
  );
  if (
    passwordInput.value !== passwordCheck.value &&
    !passwordCheckErrorMessage
  ) {
    passwordErrorMessage(
      e,
      "비밀번호가 일치하지 않습니다.",
      "password-check-error-message"
    );
  }
});

passwordCheck.addEventListener("keyup", e => {
  const passwordCheckErrorMessage = document.querySelector(
    ".password-check-error-message"
  );
  if (
    passwordInput.value !== passwordCheck.value &&
    !passwordCheckErrorMessage
  ) {
    passwordErrorMessage(
      e,
      "비밀번호가 일치하지 않습니다.",
      "password-check-error-message"
    );
  }
  if (passwordInput.value === passwordCheck.value) {
    e.target.style.border = "none";
    passwordCheckErrorMessage.remove();
  }
});

//비밀번호 재확인 포커스 인 이벤트
passwordCheck.addEventListener("focusin", e => {
  e.target.style.border = "none";
});
