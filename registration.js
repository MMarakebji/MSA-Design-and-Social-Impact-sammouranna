const cards = document.querySelectorAll(".level-card");

cards.forEach(card => {
    card.addEventListener("click", () => {

        cards.forEach(other => {
            if (other !== card) other.classList.remove("active");
        });

        card.classList.toggle("active");
    });
});
