const slides = document.querySelectorAll('.slide');
const allStepButtons = document.querySelectorAll('.step');

let current = 0;

function showSlide(index) {
  // keep index in range
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  current = index;

  // show only chosen slide
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === current);
  });

  // update all step groups (each slide has its own steps)
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

// optional: auto-play every 6 seconds
setInterval(() => showSlide(current + 1), 6000);


const burgerBtn = document.getElementById("burgerBtn");
const mobileNav = document.getElementById("mobileNav");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("open");
  mobileNav.classList.toggle("open");
});



// Scroll animation for results section
const resultsSection = document.querySelector('.results-section');

if (resultsSection) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          resultsSection.classList.add('in-view');
          obs.unobserve(resultsSection); // run once
        }
      });
    },
    {
      threshold: 0.3 // when ~30% of section is visible
    }
  );

  observer.observe(resultsSection);
}
