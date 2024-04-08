import { setErrorMessage } from "./components/errorMessage.js";
import { checkFormValidity } from "./utils/formValidation.js";

export function auth() {
  const form = document.querySelector(".form-container");

  form.addEventListener("input", e => {
    setErrorMessage(e);
    checkFormValidity();
  });
}
