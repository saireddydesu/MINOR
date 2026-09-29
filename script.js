
document.querySelectorAll(".toggle-password").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.target);
    const visible = input.type === "password";
    input.type = visible ? "text" : "password";
    btn.textContent = visible ? "Hide" : "Show";
  });
});

// REGISTRATION
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("confirmPassword").value;
    const message = document.getElementById("registerMessage");

    if (password !== confirm) {
      message.textContent = "Passwords do not match.";
      message.className = "form-message";
      return;
    }

    // Store only non-sensitive demo information.
    sessionStorage.setItem("findtypeUser",
      JSON.stringify({ name, email }));
      

    message.textContent = "Registration demo successful!";
    message.className = "form-message success";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
}

// LOGIN DEMO
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("loginEmail")
      .value.trim().toLowerCase();

    const user = JSON.parse(
      sessionStorage.getItem("findtypeUser") || "null"
    );

    const message = document.getElementById("loginMessage");

    if (!user || user.email.toLowerCase() !== email) {
      message.textContent =
        "Please register with this email first.";
      return;
    }

    // Demo navigation, not password authentication.
    sessionStorage.setItem("findtypeLoggedIn", "true");
    window.location.href = "dashboard.html";
  });
}

function logout() {
  sessionStorage.removeItem("findtypeLoggedIn");
  window.location.href = "login.html";
}


/* ANIMATED MEDICAL BACKGROUND */

function createMedicalBackground() {
  const panels = document.querySelectorAll(".auth-info");

  const symbols = [
    "A+", "B−", "O+", "AB+",
    "🩺", "🧬", "🩸", "🔬",
    "O−", "B+", "✚", "♡",
    "A−", "AB−", "🩺", "🧬"
  ];

  panels.forEach(panel => {
    const background = document.createElement("div");
    background.className = "moving-medical-bg";
    background.setAttribute("aria-hidden", "true");

    symbols.forEach((item, i) => {
      const element = document.createElement("span");
      element.className = "moving-symbol";
      element.textContent = item;

      element.style.left = Math.random() * 90 + "%";
      element.style.top = Math.random() * 90 + "%";

      element.style.fontSize =
        (28 + Math.random() * 32) + "px";

      element.style.animationDuration =
        (8 + Math.random() * 9) + "s";

      element.style.animationDelay =
        (-Math.random() * 15) + "s";

      background.appendChild(element);
    });

    panel.prepend(background);
  });
}

document.addEventListener(
  "DOMContentLoaded",
  createMedicalBackground
);

/* FLOATING MEDICAL BACKGROUND BEHIND REGISTER CARD */

document.addEventListener("DOMContentLoaded", () => {

  const section = document.querySelector(
    ".auth-form-section"
  );

  if (!section) return;

  const background = document.createElement("div");

  background.className = "register-medical-bg";
  background.setAttribute("aria-hidden", "true");

  const symbols = [
    ["A+", "8%", "12%", "45px", "#0d9488", "12s", "0s"],
    ["O−", "75%", "15%", "50px", "#d45c81", "15s", "-3s"],
    ["🩺", "12%", "70%", "48px", "#468cc4", "14s", "-5s"],
    ["B+", "82%", "65%", "42px", "#0d9488", "17s", "-2s"],
    ["🧬", "60%", "85%", "42px", "#468cc4", "13s", "-7s"],
    ["✚", "45%", "8%", "60px", "#0d9488", "18s", "-4s"],
    ["AB−", "5%", "42%", "38px", "#d45c81", "16s", "-6s"],
    ["O+", "85%", "90%", "45px", "#0d9488", "14s", "-1s"]
  ];

  symbols.forEach(item => {

    const symbol = document.createElement("span");

    symbol.textContent = item[0];

    symbol.style.setProperty("--x", item[1]);
    symbol.style.setProperty("--y", item[2]);
    symbol.style.setProperty("--size", item[3]);
    symbol.style.setProperty("--color", item[4]);
    symbol.style.setProperty("--speed", item[5]);
    symbol.style.setProperty("--delay", item[6]);

    background.appendChild(symbol);

  });

  section.prepend(background);

});
