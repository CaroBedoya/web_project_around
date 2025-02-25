utils.js;

// Función de validación (puedes personalizarla según tu necesidad)
export function enableValidation(config) {
  const formElements = document.querySelectorAll(config.formSelector);
  formElements.forEach((form) => {
    const inputElements = form.querySelectorAll(config.inputSelector);
    inputElements.forEach((input) => {
      input.addEventListener("input", () => validateInput(input, config));
    });
  });
}

function validateInput(input, config) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    errorElement.textContent = "";
    input.classList.remove(config.inputErrorClass);
  } else {
    errorElement.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
  }
}
