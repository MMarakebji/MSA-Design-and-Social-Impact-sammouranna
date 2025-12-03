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


const products = {
    goggles: {
        title: "Speedo Goggles Blue",
        subtitle: "Anti fog & UV protection swimming goggles",
        description: "Designed for comfort, clarity, and performance...",
        price: "$9.23 /923 Pt",
        img: "images/Property 1=Variant4.png",
        vertical: "SPEEDO"
    },
    XStream: {
        title: "Xstream Red Cap",
        subtitle: "Soft silicone cap built for everyday training",
        description: "Built for speed and comfort...",
        price: "$8.00 /800 Pt",
        img: "images/hat.png",
        vertical: "XSTREAM"
    },
    Shorts: {
        title: "Speedo Shorts",
        subtitle: "Durable shorts for daily swimming training",
        description: "Built for comfort and durability...",
        price: "$12.00 /1200 Pt",
        img: "images/Property 1=Variant3.png",
        vertical: "SPEEDO"
    },
    Cap: {
        title: "MSA Cap",
        subtitle: "Classic blue cap for outdoor comfort",
        description: "Perfect for casual wear or training...",
        price: "$6.50 /650 Pt",
        img: "images/Property 1=Variant5.png",
        vertical: "MSA"
    }
};

let currentMain = "goggles";

function changeProduct(item) {
    if (item === currentMain) return;

    const main = products[item];
    document.getElementById("product-title").innerText = main.title;
    document.getElementById("product-subtitle").innerText = main.subtitle;
    document.getElementById("description").innerText = main.description;
    document.getElementById("price").innerText = main.price;
    document.getElementById("main-img").src = main.img;
    document.getElementById("vertical-text").innerText = main.vertical;

    currentMain = item;
    updateCards();
}

function updateCards() {
    const order = Object.keys(products).filter(key => key !== currentMain);
    const cardImages = document.querySelectorAll("images/.suggest-card img");
    const cardTexts = document.querySelectorAll("images/.suggest-card .item-name");

    order.forEach((id, index) => {
        cardImages[index].src = products[id].img;

        cardTexts[index].innerHTML = products[id].title.split(" ").join("<br>");
        cardImages[index].parentElement.setAttribute("onclick", `changeProduct('${id}')`);
        cardTexts[index].parentElement.setAttribute("onclick", `changeProduct('${id}')`);
    });
}

updateCards();


document.querySelectorAll(".flip-card").forEach(card => {

    card.querySelectorAll(".flip-open").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            card.classList.add("flipped");
        });
    });

    card.querySelector(".close-flip").addEventListener("click", e => {
        e.stopPropagation();
        card.classList.remove("flipped");
    });

    card.querySelector(".msa-shop-card-image").addEventListener("click", () => {
        card.classList.add("flipped");
    });
});


