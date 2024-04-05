//로그인 버튼 조건부 활성화하기
const loginBtn = document.querySelector(".submit");
const form = document.querySelector(".form-container");

//키보드 이벤트에 반응해서 로그인 활성화 상태 변경하기
form.addEventListener("keydown", e => {
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

//유효한 이메일 형식 체크
function emailCheck(email) {
  const atPosition = email.indexOf("@");
  const dotPosition = email.lastIndexOf(".");
  return atPosition > 0 &&
    dotPosition > atPosition + 1 &&
    dotPosition + 2 < email.length
    ? true
    : false;
}

//에러 메세지 추가 함수
const emailErrorMessage = (e, text) => {
  //빈 값일 경우 빨간 테두리 추가
  e.target.style.border = "1.5px solid red";
  //하단에 메세지 추가
  const message = document.createElement("span");
  message.textContent = `${text}`;
  message.style.color = "#F74747";
  message.style.fontSize = "15px";
  message.style.fontFamily = "Pretendard";
  message.style.fontWeight = "600";
  message.style.marginTop = "-16px";
  message.style.marginBottom = "24px";
  message.style.marginLeft = "16px";
  message.classList.add("email-error-message");
  e.target.after(message);
};

//에러 메세지 추가 함수
const passwordErrorMessage = (e, text) => {
  //빈 값일 경우 빨간 테두리 추가
  e.target.style.border = "1.5px solid red";
  //하단에 메세지 추가
  const message = document.createElement("span");
  message.textContent = `${text}`;
  message.style.color = "#F74747";
  message.style.fontSize = "15px";
  message.style.fontFamily = "Pretendard";
  message.style.fontWeight = "600";
  message.style.marginTop = "-16px";
  message.style.marginBottom = "24px";
  message.style.marginLeft = "16px";
  message.classList.add("password-error-message");
  e.target.after(message);
};

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
//빨간 테두리 제거
//하단의 메세지 제거
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
    passwordErrorMessage(e, "비밀번호를 입력해주세요");
  }
  if (e.target.value !== "" && e.target.value.length < 8) {
    passwordErrorMessage(e, "비밀번호는 8자 이상이어야 합니다");
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

//에러 메세지 추가 함수
const nicknameErrorMessage = (e, text) => {
  //빈 값일 경우 빨간 테두리 추가
  e.target.style.border = "1.5px solid red";
  //하단에 메세지 추가
  const message = document.createElement("span");
  message.textContent = `${text}`;
  message.style.color = "#F74747";
  message.style.fontSize = "15px";
  message.style.fontFamily = "Pretendard";
  message.style.fontWeight = "600";
  message.style.marginTop = "-16px";
  message.style.marginBottom = "24px";
  message.style.marginLeft = "16px";
  message.classList.add("nickname-error-message");
  e.target.after(message);
};

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
