/* =========================================================
   ASHISH MEENA PORTFOLIO
========================================================= */


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1200);

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================================
   NAVBAR SCROLL
========================================================= */

const navbar =
    document.querySelector(".navbar");

window.addEventListener(
    "scroll",
    () => {

        if (!navbar) return;

        if (window.scrollY > 60) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".desktop-nav a");


const navObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const id =
                        entry.target.getAttribute("id");

                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                        if (
                            link.getAttribute("href")
                            === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                }

            });

        },
        {
            threshold: 0.45
        }
    );


sections.forEach(section => {

    navObserver.observe(section);

});


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    targetId === "#" ||
                    !targetId
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   CINEMATIC HERO SCROLL
   PHOTO ZOOM-OUT + TEXT MOVEMENT
========================================================= */

const hero =
    document.querySelector(".hero");

const heroImage =
    document.querySelector(".hero-image");

const heroName =
    document.querySelector(".hero-name");

const heroIntro =
    document.querySelector(".hero-intro");

const heroFirstName =
    document.querySelector(".hero-first-name");

const heroLastName =
    document.querySelector(".hero-last-name");


let ticking = false;


function updateHeroScroll() {

    if (!hero) {
        ticking = false;
        return;
    }

    const scrollY =
        window.scrollY;

    const heroHeight =
        hero.offsetHeight;


    /*
       Progress through the hero.

       0 = hero at the top
       1 = hero completely scrolled away
    */

    const progress =
        Math.min(
            Math.max(
                scrollY / heroHeight,
                0
            ),
            1
        );


    /* =====================================================
       PHOTO ZOOM OUT
       Desktop: 1.12 → 1.00
       Mobile:  1.08 → 1.00
    ===================================================== */

    const isMobile =
        window.innerWidth <= 700;

    const startScale =
        isMobile ? 1.08 : 1.12;


    const scale =
        startScale -
        (
            progress *
            (startScale - 1)
        );


    /*
       Small vertical camera movement.
       This makes the zoom feel cinematic.
    */

    const translateY =
        progress * -18;


    if (heroImage) {

        heroImage.style.transform =
            `scale(${scale}) translateY(${translateY}px)`;


        /*
           Slightly darken image while leaving hero.
        */

        const brightness =
            0.72 -
            (progress * 0.10);


        heroImage.style.filter =
            `brightness(${brightness})
             contrast(1.08)
             saturate(0.95)`;

    }


    /* =====================================================
       HERO NAME MOVEMENT
    ===================================================== */

    if (heroName) {

        const nameMove =
            progress * -45;

        const nameOpacity =
            1 -
            (progress * 0.65);

        heroName.style.transform =
            `translateY(${nameMove}px)`;

        heroName.style.opacity =
            nameOpacity;

    }


    /* =====================================================
       ASHISH COLOR TRANSITION
    ===================================================== */

    if (heroFirstName) {

        /*
           Starts white.
           Becomes lime while scrolling away.
        */

        const red =
            Math.round(
                243 -
                (progress * 58)
            );

        const green =
            Math.round(
                243 +
                (progress * 12)
            );

        const blue =
            Math.round(
                243 -
                (progress * 243)
            );


        heroFirstName.style.color =
            `rgb(${red}, ${green}, ${blue})`;

    }


    /* =====================================================
       MEENA COLOR / OUTLINE TRANSITION
    ===================================================== */

    if (heroLastName) {

        const strokeOpacity =
            0.78 -
            (progress * 0.35);


        heroLastName.style.webkitTextStroke =
            `1px rgba(185,255,0,${strokeOpacity})`;

    }


    /* =====================================================
       HERO INTRO MOVEMENT
    ===================================================== */

    if (heroIntro) {

        const introMove =
            progress * 25;

        const introOpacity =
            1 -
            (progress * 0.75);

        heroIntro.style.transform =
            `translateY(${introMove}px)`;

        heroIntro.style.opacity =
            introOpacity;

    }


    ticking = false;
}


window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateHeroScroll
            );

            ticking = true;

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   RESET HERO WHEN PAGE LOADS
========================================================= */

window.addEventListener(
    "load",
    () => {

        updateHeroScroll();

    }
);


/* =========================================================
   MOBILE TOUCH FEEDBACK
   DESKTOP HOVER = MOBILE TOUCH
========================================================= */

const touchElements = document.querySelectorAll(
    ".project-item, " +
    ".skill-row, " +
    ".journey-item, " +
    ".social-links a, " +
    ".contact-email, " +
    ".send-button"
);


touchElements.forEach(element => {

    let removeTimer;


    element.addEventListener(
        "touchstart",
        () => {

            clearTimeout(removeTimer);

            element.classList.add("touch-active");

        },
        {
            passive: true
        }
    );


    element.addEventListener(
        "touchend",
        () => {

            removeTimer = setTimeout(() => {

                element.classList.remove(
                    "touch-active"
                );

            }, 500);

        },
        {
            passive: true
        }
    );


    element.addEventListener(
        "touchcancel",
        () => {

            element.classList.remove(
                "touch-active"
            );

        },
        {
            passive: true
        }
    );

});

/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formNote =
    document.getElementById("formNote");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById("name")
                    .value
                    .trim();

            const email =
                document.getElementById("email")
                    .value
                    .trim();

            const subject =
                document.getElementById("subject")
                    .value
                    .trim();

            const message =
                document.getElementById("message")
                    .value
                    .trim();


            const mailSubject =
                encodeURIComponent(
                    subject
                );


            const mailBody =
                encodeURIComponent(
                    `Name: ${name}\n` +
                    `Email: ${email}\n\n` +
                    `${message}`
                );


            const mailto =
                `mailto:ansh997788@gmail.com` +
                `?subject=${mailSubject}` +
                `&body=${mailBody}`;


            window.location.href =
                mailto;


            if (formNote) {

                formNote.textContent =
                    "Opening your email application...";

            }

        }
    );

}


/* =========================================================
   PROJECT CLICK FEEDBACK
========================================================= */

projectItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            item.classList.add(
                "project-clicked"
            );

            setTimeout(() => {

                item.classList.remove(
                    "project-clicked"
                );

            }, 300);

        }
    );

});


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            document.activeElement?.blur();

        }

    }
);
/* =========================================================
   ABOUT SECTION REVEAL
========================================================= */

const aboutSection = document.querySelector(".about-section");

if (aboutSection) {

    const aboutObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    aboutObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    aboutObserver.observe(aboutSection);
}