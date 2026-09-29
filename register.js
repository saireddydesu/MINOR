
/* ========================================
   FINGERS REGISTRATION
   FRONTEND DEMO
======================================== */

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById(
    "registerForm"
  );

  const message = document.getElementById(
    "registerMessage"
  );

  const submitButton = document.getElementById(
    "createAccountBtn"
  );

  const nameInput = document.getElementById(
    "fullName"
  );

  const emailInput = document.getElementById(
    "registerEmail"
  );

  const passwordInput = document.getElementById(
    "registerPassword"
  );

  const confirmInput = document.getElementById(
    "confirmPassword"
  );

  const termsInput = document.getElementById(
    "agreeTerms"
  );

  if (!form || !submitButton) {
    console.error(
      "Registration form or button not found."
    );
    return;
  }

  // SHOW / HIDE PASSWORD

  document.querySelectorAll(".toggle")
    .forEach(button => {

      button.addEventListener("click", () => {

        const input = document.getElementById(
          button.dataset.target
        );

        if (!input) return;

        const isPassword =
          input.type === "password";

        input.type = isPassword
          ? "text"
          : "password";

        button.textContent = isPassword
          ? "Hide"
          : "Show";

        button.setAttribute(
          "aria-label",
          isPassword
            ? "Hide password"
            : "Show password"
        );

      });

    });

  // DISPLAY MESSAGE

  function showMessage(text, success = false) {

    message.textContent = text;

    message.className = success
      ? "message success"
      : "message";

  }

  // GMAIL VALIDATION

  function isValidGmail(email) {

    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i
      .test(email);

  }

  // REGISTRATION

  form.addEventListener("submit", event => {

    event.preventDefault();

    showMessage("");

    const name = nameInput.value.trim();

    const email = emailInput.value
      .trim()
      .toLowerCase();

    const password = passwordInput.value;

    const confirmPassword =
      confirmInput.value;

    // NAME

    if (name.length < 2) {

      showMessage(
        "Please enter your full name."
      );

      nameInput.focus();
      return;

    }

    // EMAIL

    if (!isValidGmail(email)) {

      showMessage(
        "Please enter a valid @gmail.com address."
      );

      emailInput.focus();
      return;

    }

    // PASSWORD

    if (password.length < 8) {

      showMessage(
        "Password must contain at least 8 characters."
      );

      passwordInput.focus();
      return;

    }

    // CONFIRM PASSWORD

    if (password !== confirmPassword) {

      showMessage(
        "Passwords do not match."
      );

      confirmInput.focus();
      return;

    }

    // CONSENT

    if (!termsInput.checked) {

      showMessage(
        "Please accept the research prototype notice."
      );

      termsInput.focus();
      return;

    }

    // STORE DEMO USER
    // PASSWORD IS NOT STORED

    const demoUser = {
      name: name,
      email: email
    };

    sessionStorage.setItem(
      "findtypeUser",
      JSON.stringify(demoUser)
    );

    sessionStorage.setItem(
      "findtypeLoggedIn",
      "true"
    );

    // SUCCESS

    showMessage(
      "Account created! Opening your dashboard...",
      true
    );

    submitButton.disabled = true;

    submitButton.textContent =
      "Opening dashboard...";

    passwordInput.value = "";
    confirmInput.value = "";

    // REDIRECT

    setTimeout(() => {

      window.location.replace(
        "./user-dashboard.html"
      );

    }, 1000);

  });

});
