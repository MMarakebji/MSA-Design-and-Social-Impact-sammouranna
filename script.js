const slides = document.querySelectorAll('.slide');
const allStepButtons = document.querySelectorAll('.step');

let current = 0;
showSlide(current);

function showSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  current = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === current);
  });

  document.querySelectorAll('.steps-list').forEach(list => {
    list.querySelectorAll('.step').forEach(btn => {
      const slideIndex = Number(btn.dataset.slide);
      btn.classList.toggle('active', slideIndex === current);
    });
  });
}

// click on numbers
allStepButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const slideIndex = Number(btn.dataset.slide);
    showSlide(slideIndex);
  });
});

setInterval(() => showSlide(current + 1), 6000);


const burgerBtn = document.getElementById("burgerBtn");
const mobileNav = document.getElementById("mobileNav");

if (burgerBtn && mobileNav) {
  burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.toggle("open");
    mobileNav.classList.toggle("open");
  });
}



const resultsSection = document.querySelector('.results-section');

if (resultsSection) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          resultsSection.classList.add('in-view');
          obs.unobserve(resultsSection); 
        }
      });
    },
    {
      threshold: 0.3 
    }
  );

  observer.observe(resultsSection);
}



document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".cards-container .card");
    const mainCard = document.querySelector(".main-card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            if (card.classList.contains("main-card")) return;
            const tempContent = mainCard.innerHTML;
            mainCard.innerHTML = card.innerHTML;
            card.innerHTML = tempContent;
        });
    });
});

const shopImages = [
        "images/Screenshot2024-11-19155558 1.png",
        "images/hat.png",
        "images/Property 1=Variant3.png",
        "images/Property 1=Variant4.png",
        "images/Property 1=Variant5.png"
    ];

    let index = 0;
    const shopImg = document.getElementById("shop-rotator");

    setInterval(() => {
        shopImg.style.opacity = 0;

        setTimeout(() => {
            index = (index + 1) % shopImages.length;
            shopImg.src = shopImages[index];
            shopImg.style.opacity = 1;
        }, 500);
    }, 5000);