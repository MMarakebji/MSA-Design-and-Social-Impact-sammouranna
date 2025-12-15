document.addEventListener("DOMContentLoaded", () => {
  const dd = document.getElementById("msaProfileDD");
  if (!dd) return;

  const btn = dd.querySelector(".msa-profile-toggle");
  const menu = dd.querySelector(".msa-profile-menu");

  function setOpen(open) {
    dd.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dd.classList.contains("is-open");
    setOpen(!isOpen);
  });

  menu.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
});
