document.addEventListener('DOMContentLoaded', function () {

    /* ============================
       OPTIONAL CUSTOMIZER (MSA EXCLUSIVES)
       Only runs if that section exists
    ============================ */
    const left = document.querySelector('.msa-ex-left');

    if (left) {
        const customizer   = left.querySelector('.msa-customizer');
        const customizeBtn = left.querySelector('.msa-btn-customize');

        if (customizer && customizeBtn) {
            const tabs   = customizer.querySelectorAll('.msa-custom-tab');
            const panels = customizer.querySelectorAll('.msa-custom-panel');

            const nextBtn = customizer.querySelector('.msa-step-next');
            const backBtn = customizer.querySelector('.msa-step-back');

            let currentStep = 1;

            function showStep(step) {
                currentStep = step;

                panels.forEach(panel => {
                    panel.classList.toggle('active', Number(panel.dataset.step) === step);
                });

                tabs.forEach(tab => {
                    tab.classList.toggle('active', Number(tab.dataset.step) === step);
                });

                backBtn.disabled = false;
                nextBtn.textContent = (step === 3) ? 'Check Out' : 'Next >';
            }

            // Open customizer
            customizeBtn.addEventListener('click', () => {
                left.classList.add('is-customizing');
                showStep(1);
            });

            // Tabs
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const step = Number(tab.dataset.step);
                    showStep(step);
                });
            });

            // Next / Check Out
            nextBtn.addEventListener('click', () => {
                if (currentStep < 3) {
                    showStep(currentStep + 1);
                } else {
                    left.classList.remove('is-customizing');
                    showStep(1);
                }
            });

            // Back
            backBtn.addEventListener('click', () => {
                if (currentStep > 1) {
                    showStep(currentStep - 1);
                } else {
                    left.classList.remove('is-customizing');
                    showStep(1);
                }
            });

            // Step 1 — item selection
            const itemButtons = customizer.querySelectorAll('.msa-item-btn');
            itemButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    itemButtons.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                });
            });

            // Step 2 — text counter + quotes
            const textInput = customizer.querySelector('.msa-custom-text-input');
            const charSpan  = customizer.querySelector('#msa-char-current');

            if (textInput && charSpan) {
                const updateCount = () => {
                    charSpan.textContent = textInput.value.length;
                };

                textInput.addEventListener('input', updateCount);
                updateCount();

                customizer.querySelectorAll('.msa-quote-pill').forEach(btn => {
                    btn.addEventListener('click', () => {
                        textInput.value = btn.textContent.trim();
                        updateCount();
                    });
                });
            }
        }
    }

    /* ============================
       PRODUCT SYSTEM (hero section)
    ============================ */
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

    window.changeProduct = function (item) {
        if (item === currentMain) return;

        const main = products[item];

        if (!main) return;

        document.getElementById("product-title").innerText    = main.title;
        document.getElementById("product-subtitle").innerText = main.subtitle;
        document.getElementById("description").innerText      = main.description;
        document.getElementById("price").innerText            = main.price;
        document.getElementById("main-img").src               = main.img;
        document.getElementById("vertical-text").innerText    = main.vertical;

        currentMain = item;
        updateCards();
    };

    function updateCards() {
        const order = Object.keys(products).filter(key => key !== currentMain);

        const cardImages = document.querySelectorAll(".suggest-card img");
        const cardTexts  = document.querySelectorAll(".suggest-card .item-name");

        order.forEach((id, index) => {
            if (!cardImages[index] || !cardTexts[index]) return;

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

 
    const customizeBtn = document.querySelector('.msa-btn-customize');
    const customizer   = document.querySelector('.msa-customizer');

    if (!customizeBtn || !customizer) return;

    const tabs   = customizer.querySelectorAll('.msa-custom-tab');
    const panels = customizer.querySelectorAll('.msa-custom-panel');

    const nextButtons = customizer.querySelectorAll('.msa-step-next');
    const backButtons = customizer.querySelectorAll('.msa-step-back');
    const checkoutBtn = customizer.querySelector('.msa-step-checkout');
    const closeBtn    = customizer.querySelector('.msa-custom-close');

    let currentStep = 1;



    function showStep(step) {
        panels.forEach(p => p.classList.remove('active'));
        tabs.forEach(t => t.classList.remove('active'));

        const panel = customizer.querySelector('.msa-custom-panel[data-step="' + step + '"]');
        const tab   = customizer.querySelector('.msa-custom-tab[data-step="' + step + '"]');

        if (panel) panel.classList.add('active');
        if (tab)   tab.classList.add('active');

        currentStep = step;
    }

    function openCustomizer() {
        customizer.classList.add('is-open');
        showStep(1);
        document.body.style.overflow = 'hidden'; 
    }

    function closeCustomizer() {
        customizer.classList.remove('is-open');
        showStep(1);
        document.body.style.overflow = '';
    }



    customizeBtn.addEventListener('click', openCustomizer);

    if (closeBtn) {
        closeBtn.addEventListener('click', closeCustomizer);
    }

  
    customizer.addEventListener('click', (e) => {
        if (e.target === customizer) {
            closeCustomizer();
        }
    });



    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const step = Number(tab.dataset.step || 1);
            showStep(step);
        });
    });



    nextButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('msa-step-checkout')) {
                closeCustomizer();
                return;
            }

            if (currentStep < 3) {
                showStep(currentStep + 1);
            }
        });
    });


    
    backButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            } else {
                closeCustomizer();
            }
        });
    });



    const itemButtons = customizer.querySelectorAll('.msa-item-btn');
    itemButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            itemButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    const qtyValueEl = document.getElementById('msa-qty-value');
    const qtyButtons = customizer.querySelectorAll('.msa-qty-btn');

    if (qtyValueEl) {
        let qty = parseInt(qtyValueEl.textContent, 10) || 1;

        qtyButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const dir = btn.dataset.dir;
                if (dir === '+' && qty < 9) qty++;
                if (dir === '-' && qty > 1) qty--;
                qtyValueEl.textContent = qty;
            });
        });
    }


    
    const textInput = customizer.querySelector('.msa-custom-text-input');
    const charSpan  = customizer.querySelector('#msa-char-current');

    if (textInput && charSpan) {
        const updateCount = () => {
            charSpan.textContent = textInput.value.length;
        };

        textInput.addEventListener('input', updateCount);
        updateCount();

        customizer.querySelectorAll('.msa-quote-pill').forEach(btn => {
            btn.addEventListener('click', () => {
                textInput.value = btn.textContent.trim();
                updateCount();
            });
        });
    }



    const addAnotherBtn = customizer.querySelector('.msa-step-secondary');
    if (addAnotherBtn) {
        addAnotherBtn.addEventListener('click', () => {
            showStep(1);
        });
    }


});
