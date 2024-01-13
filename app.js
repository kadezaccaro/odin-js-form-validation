// use live inline validation as the user types: red = invalid, green = valid along with helpful error message
// error message upon submit of form with any active errors or unfilled required fields
// make sure all validation is done with JavaScript for this lesson
// give the user a high five if the form is submitted successfully

const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const zipInput = document.getElementById("zip");
const passInput = document.getElementById("password");
const confirmPassInput = document.getElementById("confirmPassword");
const error = document.querySelector(".error");

console.log(emailInput);

emailInput.addEventListener("input", () => {
  if (emailInput.validity.typeMismatch) {
    error.textContent = "Please enter a valid email address.";
  } else {
    error.textContent = "";
  }
});

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
// });
