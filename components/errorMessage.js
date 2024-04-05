//에러 메세지 추가 함수
export const emailErrorMessage = (e, text) => {
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
  message.classList.add("error");
  e.target.after(message);
};

//패스워드 에러 메세지 추가 함수
export const passwordErrorMessage = (e, text, classname) => {
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
  message.classList.add(classname);
  message.classList.add("error");
  e.target.after(message);
};

//에러 메세지 추가 함수
export const nicknameErrorMessage = (e, text) => {
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
  message.classList.add("error");
  e.target.after(message);
};
