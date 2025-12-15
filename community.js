const container = document.querySelector('.quote-cards');
let cards = Array.from(document.querySelectorAll('.quote-card'));

function updateClasses() {
    cards.forEach(card => card.classList.remove("center"));

    cards[1].classList.add("center");
}

function rotateRight() {
    const first = cards.shift();
    cards.push(first);
    cards.forEach(card => container.appendChild(card));
    updateClasses();
}

function rotateLeft() {
    const last = cards.pop();
    cards.unshift(last);
    cards.forEach(card => container.appendChild(card));
    updateClasses();
}

document.querySelector('.arrow-right').addEventListener('click', rotateRight);
document.querySelector('.arrow-left').addEventListener('click', rotateLeft);

// FIRST SETUP
updateClasses();


const stars = document.querySelectorAll(".star");

stars.forEach((star, index) => {
    star.addEventListener("click", () => {
        let rating = index + 1;

        stars.forEach((s, i) => {
            if (i < rating) {
                s.classList.add("selected");
                s.innerHTML = "&#9733;"; // solid star
            } else {
                s.classList.remove("selected");
                s.innerHTML = "&#9734;"; // outlined star
            }
        });
    });
});




