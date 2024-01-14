const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country-code");
const zipInput = document.getElementById("zip");
const passInput = document.getElementById("password");
const confirmPassInput = document.getElementById("confirm-password");
const submitErrorMsg = document.querySelector(".submit-error-msg");

// **************** INPUTS ****************

nameInput.addEventListener("input", () => {
  nameInput.classList.add("touched");

  if (nameInput.validity.tooShort) {
    showError(nameInput, "Please enter at least 2 characters.");
  } else {
    showError(nameInput, "");
  }
});

emailInput.addEventListener("input", () => {
  emailInput.classList.add("touched");

  if (emailInput.validity.patternMismatch || emailInput.validity.typeMismatch) {
    showError(emailInput, "Please enter a valid email address.");
  } else {
    showError(emailInput, "");
  }
});

countryInput.addEventListener("input", () => {
  countryInput.classList.add("touched");

  if (countryInput.validity.patternMismatch) {
    showError(
      countryInput,
      "Please enter a 3-letter ISO country code, like 'USA' or 'FRA'."
    );
  } else {
    showError(countryInput, "");
  }
});

zipInput.addEventListener("input", () => {
  zipInput.classList.add("touched");

  if (zipInput.value.length !== 5) {
    showError(zipInput, "Please enter a 5-digit zip code.");
  } else if (zipInput.validity.patternMismatch) {
    showError(zipInput, "Please enter a 5-digit zip code.");
  } else {
    showError(zipInput, "");
  }
});

passInput.addEventListener("input", () => {
  passInput.classList.add("touched");

  if (passInput.validity.tooShort) {
    showError(passInput, "Please enter at least 8 characters.");
  } else {
    showError(passInput, "");
  }
});

confirmPassInput.addEventListener("input", () => {
  confirmPassInput.classList.add("touched");

  console.log(confirmPassInput.validity);

  if (
    confirmPassInput.value !== passInput.value ||
    passInput.validity.tooShort
  ) {
    showError(
      confirmPassInput,
      "Passwords must match and be at least 8 characters long."
    );
  } else {
    showError(confirmPassInput, "");
  }
});

// **************** FORM SUBMIT ****************

form.addEventListener("submit", (event) => {
  if (hasInvalidInputs()) {
    submitErrorMsg.textContent =
      "Please fix the errors in the form before submitting.";
    showInvalidInputs();
    // Prevent the form from being submitted
    event.preventDefault();
  } else {
    alert("High five! You've successfully submitted the form.");
  }
});

function hasInvalidInputs() {
  const inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].validity.valid) {
      return true;
    }
  }
  return false;
}

function showInvalidInputs() {
  const inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].validity.valid) {
      // Mark all invalid inputs as "touched" so that they turn red
      inputs[i].classList.add("touched");
      showError(inputs[i], inputs[i].validationMessage);
    }
  }
}

// **************** ERROR MESSAGES ****************

function showError(input, message) {
  input.setCustomValidity(message);
  // Check if the error message span already exists
  let errorSpan = input.parentNode.querySelector(".error");

  // If it doesn't exist, create it
  if (!errorSpan) {
    errorSpan = document.createElement("span");
    errorSpan.className = "error";
    errorSpan.setAttribute("aria-live", "polite");
    input.parentNode.appendChild(errorSpan);
  }

  // Set the error message
  errorSpan.textContent = message;
}
