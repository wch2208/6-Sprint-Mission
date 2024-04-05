//유효한 이메일 형식 체크
export function emailCheck(email) {
  const atPosition = email.indexOf("@");
  const dotPosition = email.lastIndexOf(".");
  return atPosition > 0 &&
    dotPosition > atPosition + 1 &&
    dotPosition + 2 < email.length
    ? true
    : false;
}
