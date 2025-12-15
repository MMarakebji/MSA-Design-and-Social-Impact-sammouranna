document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const pass = document.getElementById("password");
  const toggle = document.getElementById("togglePass");

  if (pass && toggle) {
    toggle.addEventListener("click", () => {
      pass.type = pass.type === "password" ? "text" : "password";
    });
  }

  function getUsers() {
    try { return JSON.parse(localStorage.getItem("msa_users")) || []; }
    catch { return []; }
  }

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = form.querySelector('input[type="email"]');
    const passwordInput = form.querySelector('input[type="password"]');

    const email = (emailInput?.value || "").trim().toLowerCase();
    const password = passwordInput?.value || "";

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      alert("No account found for this email. Please sign up.");
      window.location.href = "signup.html";
      return;
    }

    if (user.password !== password) {
      alert("Incorrect password. Try again.");
      return;
    }

    localStorage.setItem("msa_logged_in", "true");
    localStorage.setItem("msa_user", JSON.stringify({ name: user.name, email: user.email }));

  window.location.href = "contact-us.html";  });
});
