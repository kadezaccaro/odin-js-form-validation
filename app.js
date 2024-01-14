const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country-code");
const zipInput = document.getElementById("zip");
const passInput = document.getElementById("password");
const confirmPassInput = document.getElementById("confirm-password");
const submitErrorMsg = document.querySelector(".submit-error-msg");
const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    const touchedInput = event.target;
    markInputAsTouched(touchedInput);
    validateInput(touchedInput);
  });
});

// Prevents the user from seeing error messages before they interact with the form.
function markInputAsTouched(input) {
  input.classList.add("touched");
}

function validateInput(input) {
  const errorMessage = getErrorMessage(input);
  showError(input, errorMessage);
}

function getErrorMessage(input) {
  switch (input.id) {
    case "name":
      return input.validity.tooShort
        ? "Please enter at least 2 characters."
        : "";
    case "email":
      return input.validity.patternMismatch || input.validity.typeMismatch
        ? "Please enter a valid email address."
        : "";
    case "country-code":
      return input.validity.patternMismatch
        ? "Please enter a 3-letter ISO country code, like 'USA' or 'FRA'."
        : "";
    case "zip":
      return input.value.length !== 5 || input.validity.patternMismatch
        ? "Please enter a 5-digit zip code."
        : "";
    case "password":
      return input.validity.tooShort
        ? "Please enter at least 8 characters."
        : "";
    case "confirm-password":
      return input.value !== passInput.value || input.validity.tooShort
        ? "Passwords must match and be at least 8 characters long."
        : "";
    default:
      return "";
  }
}

function showError(input, message) {
  input.setCustomValidity(message);
  let errorSpan = input.parentNode.querySelector(".error");
  if (!errorSpan) {
    errorSpan = document.createElement("span");
    errorSpan.className = "error";
    errorSpan.setAttribute("aria-live", "polite");
    input.parentNode.appendChild(errorSpan);
  }
  errorSpan.textContent = message;
}

form.addEventListener("submit", (event) => {
  if (hasInvalidInputs()) {
    submitErrorMsg.style.display = "block";
    showInvalidInputs();
    // Prevent the form from being submitted
    event.preventDefault();
  } else {
    submitErrorMsg.style.display = "none";
    alert("High five! You've successfully submitted the form.");
  }
});

// Iterate over all inputs and check if they are valid or not
function hasInvalidInputs() {
  return Array.from(inputs).some((input) => !input.validity.valid);
}

// Mark all invalid inputs as "touched" so that they turn red and display their respective error messages
function showInvalidInputs() {
  inputs.forEach((input) => {
    if (!input.validity.valid) {
      input.classList.add("touched");
      showError(input, input.validationMessage);
    }
  });
}
