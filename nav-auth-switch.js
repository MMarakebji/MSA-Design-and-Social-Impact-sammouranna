document.addEventListener("DOMContentLoaded", () => {
  const navIn = document.getElementById("navSignedIn");
  const navOut = document.getElementById("navSignedOut");

  const isLoggedIn = localStorage.getItem("msa_logged_in") === "true";

  if (isLoggedIn) {
    if (navIn) navIn.hidden = false;
    if (navOut) navOut.hidden = true;
  } else {
    if (navIn) navIn.hidden = true;
    if (navOut) navOut.hidden = false;
  }
});
