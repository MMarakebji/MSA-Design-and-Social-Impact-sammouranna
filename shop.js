document.addEventListener('DOMContentLoaded', function () {

    /* ============================
       ELEMENTS
    ============================ */
    const left = document.querySelector('.msa-ex-left');
    if (!left) return;

    const customizer   = left.querySelector('.msa-customizer');
    const customizeBtn = left.querySelector('.msa-btn-customize');

    const tabs   = customizer.querySelectorAll('.msa-custom-tab');
    const panels = customizer.querySelectorAll('.msa-custom-panel');

    const nextBtn = customizer.querySelector('.msa-step-next');
    const backBtn = customizer.querySelector('.msa-step-back');

    let currentStep = 1;


    /* ============================
       SHOW STEP FUNCTION
    ============================ */
    function showStep(step) {
        currentStep = step;

        // Show correct panel
        panels.forEach(panel => {
            panel.classList.toggle('active', Number(panel.dataset.step) === step);
        });

        // Activate correct tab
        tabs.forEach(tab => {
            tab.classList.toggle('active', Number(tab.dataset.step) === step);
        });

        // We always want Back to be clickable
        backBtn.disabled = false;

        // Change Next label on last step
        nextBtn.textContent = (step === 3) ? 'Check Out' : 'Next >';
    }


    /* ============================
       OPEN CUSTOMIZER
    ============================ */
    customizeBtn.addEventListener('click', () => {
        left.classList.add('is-customizing');
        showStep(1);
    });


    /* ============================
       TABS
    ============================ */
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const step = Number(tab.dataset.step);
            showStep(step);
        });
    });


    /* ============================
       NEXT / CHECK OUT
    ============================ */
    nextBtn.addEventListener('click', () => {
        if (currentStep < 3) {
            // Step 1 → 2, Step 2 → 3
            showStep(currentStep + 1);
        } else {
            // Step 3: Check Out → exit customize + reset
            left.classList.remove('is-customizing');
            showStep(1);
        }
    });


    /* ============================
       BACK
    ============================ */
    backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            // Step 3 → 2, Step 2 → 1
            showStep(currentStep - 1);
        } else {
            // Step 1: go back to ORIGINAL shirt card
            left.classList.remove('is-customizing');
            showStep(1);
        }
    });


    /* ============================
       STEP 1 — ITEM SELECTION
    ============================ */
    const itemButtons = document.querySelectorAll('.msa-item-btn');
    itemButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            itemButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });


    /* ============================
       STEP 2 — TEXT COUNTER + QUOTES
    ============================ */
    const textInput = document.querySelector('.msa-custom-text-input');
    const charSpan  = document.getElementById('msa-char-current');

    if (textInput && charSpan) {
        const updateCount = () => {
            charSpan.textContent = textInput.value.length;
        };
        textInput.addEventListener('input', updateCount);
        updateCount();

        document.querySelectorAll('.msa-quote-pill').forEach(btn => {
            btn.addEventListener('click', () => {
                textInput.value = btn.textContent.trim();
                updateCount();
            });
        });
    }

});
