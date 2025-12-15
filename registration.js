const cards = document.querySelectorAll(".level-card");

cards.forEach(card => {
    card.addEventListener("click", () => {

        cards.forEach(other => {
            if (other !== card) other.classList.remove("active");
        });

        card.classList.toggle("active");
    });
});
const vid = document.querySelector(".hero-video");
const btn = document.getElementById("soundBtn");

btn.addEventListener("click", async () => {
  vid.muted = false;
  vid.volume = 1;           // 0 to 1
  await vid.play();         // ensures it plays after user gesture
  btn.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("heroRegisterBtn");
  const target = document.getElementById("register");

  if (!btn) return console.log("❌ hero button not found");
  if (!target) return console.log("❌ #register section not found");

  btn.addEventListener("click", () => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});