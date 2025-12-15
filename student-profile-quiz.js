document.addEventListener("DOMContentLoaded", () => {


  const quizSection = document.getElementById("quiz-section");
  if (!quizSection) return;

  const questions = [
    {
      question: "What is the most common swimming stroke?",
      options: ["Butterfly", "Freestyle", "Backstroke", "Breaststroke"],
      correctIndex: 1
    },
    {
      question: "What should swimmers wear for safety in the pool?",
      options: ["Jeans", "Regular shoes", "Proper swimsuit", "Jacket"],
      correctIndex: 2
    },
    {
      question: "Which stroke is usually the fastest?",
      options: ["Breaststroke", "Freestyle", "Backstroke", "Dog paddle"],
      correctIndex: 1
    },
    {
      question: "What is important to do before swimming?",
      options: ["Eat a huge meal", "Skip warm-up", "Warm up and stretch", "Run around the pool"],
      correctIndex: 2
    },
    {
      question: "Which of these helps you float better?",
      options: [
        "Holding your breath and relaxing",
        "Panicking and moving fast",
        "Looking straight down and kicking hard",
        "Closing your eyes and sinking"
      ],
      correctIndex: 0
    }
  ];

  const totalQuestions = questions.length;

  const quizHeader   = quizSection.querySelector(".quiz-header");
  const headerSpans  = quizHeader.querySelectorAll("span");
  const statusSpan   = headerSpans[0];
  const scoreSpan    = headerSpans[1];

  const progressFill = quizSection.querySelector(".quiz-progress-fill");
  const questionEl  = quizSection.querySelector(".quiz-question");
  const optionsForm = quizSection.querySelector(".quiz-options");
  const nextBtn     = quizSection.querySelector(".quiz-next-btn");

  const levelFills    = quizSection.querySelectorAll(".level-progress-fill");
  const levelPercents = quizSection.querySelectorAll(".level-progress-percent");

  const quizLeft = quizSection.querySelector(".quiz-left");

  let currentIndex  = 0;
  let score         = 0;
  let selectedIndex = null;
  let isFinished    = false;
  let endOverlay    = null;

  function renderQuestion() {
    const q = questions[currentIndex];

    questionEl.textContent = q.question;
    statusSpan.textContent = `Question ${currentIndex + 1} of ${totalQuestions}`;
    scoreSpan.textContent  = `Score: ${score}`;

    const percent = ((currentIndex + 1) / totalQuestions) * 100;
    progressFill.style.width = percent + "%";

    optionsForm.innerHTML = "";
    selectedIndex = null;

    q.options.forEach((opt, idx) => {
      const label = document.createElement("label");
      label.className = "quiz-option";
      label.innerHTML = `
        <input type="radio" name="quiz-options" value="${idx}">
        <span>${opt}</span>
      `;
      label.addEventListener("click", () => {
        selectedIndex = idx;
        optionsForm.querySelectorAll(".quiz-option").forEach(o => o.classList.remove("selected"));
        label.classList.add("selected");
      });
      optionsForm.appendChild(label);
    });

    nextBtn.textContent =
      currentIndex === totalQuestions - 1 ? "Finish Quiz" : "Next Question";
  }

  function updateLevelProgress() {
    const percent = Math.round((score / totalQuestions) * 100);

    if (levelFills[0]) levelFills[0].style.width = percent + "%";
    if (levelPercents[0]) levelPercents[0].textContent = percent + "%";

    if (score >= 4 && levelFills[1]) {
      levelFills[1].style.width = "100%";
      levelPercents[1].textContent = "100%";
    }
  }

  function showCompletion() {
    isFinished = true;

    statusSpan.textContent = "Quiz Completed";
    scoreSpan.textContent  = `Final Score: ${score}/${totalQuestions}`;

    const msg =
      score === totalQuestions
        ? "Perfect score! You're a swim pro!"
        : score <= totalQuestions / 2
          ? "Keep practicing and try again!"
          : "Well done! Your swim knowledge is growing!";

    if (endOverlay) endOverlay.remove();

    endOverlay = document.createElement("div");
    endOverlay.className = "quiz-end-overlay";
    endOverlay.innerHTML = `
      <div class="quiz-end">
        <img src="images/trophy2.png" class="quiz-end-icon" alt="trophy">
        <h2 class="quiz-end-title">Quiz Complete!</h2>
        <p class="quiz-end-score">${score}/${totalQuestions}</p>
        <p class="quiz-end-message">${msg}</p>
        <button class="quiz-end-restart">↻ Try again</button>
      </div>
    `;
    quizLeft.appendChild(endOverlay);

    endOverlay.querySelector(".quiz-end-restart")
      .addEventListener("click", restartQuiz);
  }

  function restartQuiz() {
    currentIndex  = 0;
    score         = 0;
    selectedIndex = null;
    isFinished    = false;

    if (endOverlay) endOverlay.remove();

    renderQuestion();
    updateLevelProgress();
  }

  nextBtn.addEventListener("click", () => {
    if (isFinished) return;

    if (selectedIndex === null) {
      alert("Please select an answer.");
      return;
    }

    if (selectedIndex === questions[currentIndex].correctIndex) {
      score++;
    }

    currentIndex++;

    if (currentIndex < totalQuestions) {
      renderQuestion();
      updateLevelProgress();
    } else {
      updateLevelProgress();
      showCompletion();
    }
  });

  renderQuestion();
  updateLevelProgress();



  document.querySelectorAll(".level-dd").forEach((dd) => {
    const btn   = dd.querySelector(".level-dd__btn");
    const items = dd.querySelectorAll(".level-dd__item");
    const text  = dd.querySelector(".level-dd__text");

    const close = () => {
      dd.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    };

    const open = () => {
      dd.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    };

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      dd.classList.contains("is-open") ? close() : open();
    });

    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();

        items.forEach(i => i.classList.remove("is-active"));
        item.classList.add("is-active");

        text.textContent = item.textContent.trim();
        close();


      });
    });

    document.addEventListener("click", close);
  });

});


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".quiz-level-dd").forEach(dd => {
    const btn = dd.querySelector(".quiz-level-dd__btn");
    const items = dd.querySelectorAll(".quiz-level-dd__item");
    const textSpan = dd.querySelector(".quiz-level-text");
    const popup = document.getElementById("level-lock-popup");
const closeBtn = document.getElementById("level-lock-close");

items.forEach(item => {
  item.addEventListener("click", (e) => {
    e.stopPropagation();

    const chosen = item.textContent.trim(); 

    if (chosen === "Level 2" || chosen === "Level 3") {
      popup.classList.add("is-show");
      dd.classList.remove("is-open");
      return;
    }

    items.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    if (textSpan) textSpan.textContent = chosen;
    dd.classList.remove("is-open");
  });
});

closeBtn.addEventListener("click", () => {
  popup.classList.remove("is-show");
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.classList.remove("is-show");
});

    
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      document.querySelectorAll(".quiz-level-dd.is-open").forEach(x => {
        if (x !== dd) x.classList.remove("is-open");
      });

      dd.classList.toggle("is-open");
    });

    items.forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();

        items.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        if (textSpan) textSpan.textContent = item.textContent.trim();

        dd.classList.remove("is-open");
      });
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".quiz-level-dd.is-open").forEach(dd => {
      dd.classList.remove("is-open");
    });
  });
});
