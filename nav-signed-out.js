document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burgerBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (!burger || !mobileNav) return;

  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    mobileNav.classList.toggle("open");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const signOutBtn = document.getElementById("signOutBtn");

  if (!signOutBtn) return;

  signOutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("msa_logged_in");
    localStorage.removeItem("msa_user");

    window.location.href = "index.html";
  });
});
