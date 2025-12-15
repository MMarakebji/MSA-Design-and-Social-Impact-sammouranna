document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
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

  function saveUsers(users) {
    localStorage.setItem("msa_users", JSON.stringify(users));
  }

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim().toLowerCase();
    const dob = form.querySelector('input[name="dob"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    const password = form.querySelector('input[name="password"]').value;

    if (!name || !email || !dob || !phone || !password) {
      alert("Please fill all fields.");
      return;
    }

    const users = getUsers();

    const exists = users.some(u => u.email === email);
    if (exists) {
      alert("This email is already registered. Please login.");
      window.location.href = "login.html";
      return;
    }

    const newUser = { name, email, dob, phone, password };
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem("msa_logged_in", "true");
    localStorage.setItem("msa_user", JSON.stringify({ name, email }));

  window.location.href = "index.html";  });
});
