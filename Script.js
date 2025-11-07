  const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");

    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });


document.getElementById("year").textContent = new Date().getFullYear();
AOS.init({ once: false, duration: 900, easing: "ease-in-out" });
new Typed("#typed-text", {
    strings: [
        "a freelancer",
        "a Web Developer",
        "a Graphics Designer",
        "a Creative Mind",
    ],
    typeSpeed: 80,
    backSpeed: 40,
    loop: true,
});

tsParticles.load("tsparticles", {
    fullScreen: { enable: true },
    particles: {
        number: { value: 60 },
        color: { value: "#f59e0b" },
        shape: { type: "circle" },
        opacity: { value: 0.12 },
        size: { value: { min: 1, max: 4 } },
        move: { enable: true, speed: 0.7, outModes: { default: "out" } },
        links: { enable: true, color: "#f59e0b", distance: 150, opacity: 0.06 },
    },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
        },
        modes: {
            grab: { distance: 140, links: { opacity: 0.12 } },
            push: { quantity: 4 },
        },
    },
    detectRetina: true,
});

(function () {
    const trail = document.getElementById("cursor-trail");
    const dots = [];
    for (let i = 0; i < 8; i++) {
        const d = document.createElement("div");
        d.className = "trail-dot";
        d.style.position = "absolute";
        d.style.left = "0px";
        d.style.top = "0px";
        d.style.opacity = String(1 - i * 0.12);
        trail.appendChild(d);
        dots.push(d);
    }
    let mouseX = 0,
        mouseY = 0;
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    function animate() {
        let x = mouseX,
            y = mouseY;
        dots.forEach((d, idx) => {
            setTimeout(() => {
                d.style.transform = `translate(${x}px, ${y}px)`;
            }, idx * 10);
            x += (mouseX - x) * (0.25 + idx * 0.02);
            y += (mouseY - y) * (0.25 + idx * 0.02);
        });
        requestAnimationFrame(animate);
    }
    animate();
})();

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.getAttribute("data-count");
                let v = 0;
                const step = Math.ceil(target / 60);
                const iv = setInterval(() => {
                    v += step;
                    if (v >= target) {
                        v = target;
                        clearInterval(iv);
                    }
                    el.textContent = v;
                }, 20);
                counterObserver.unobserve(el);
            }
        });
    },
    { threshold: 0.4 }
);
counters.forEach((c) => counterObserver.observe(c));

const projectCards = document.querySelectorAll(".project-card");
const modal = document.getElementById("project-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalLive = document.getElementById("modal-live");
const modalRepo = document.getElementById("modal-repo");

projectCards.forEach((card) => {
    card.addEventListener("click", () => {
        modalImg.src = card.dataset.img || "";
        modalTitle.textContent = card.dataset.title || "";
        modalDesc.textContent = card.dataset.desc || "";

        // Live link
        if (card.dataset.live) {
            modalLive.href = card.dataset.live;
            modalLive.classList.remove("opacity-50", "pointer-events-none");
            modalLive.setAttribute("target", "_blank");
            modalLive.setAttribute("rel", "noopener noreferrer");
        } else {
            modalLive.href = "#";
            modalLive.classList.add("opacity-50", "pointer-events-none");
            modalLive.removeAttribute("target");
            modalLive.removeAttribute("rel");
        }

        // Repo link
        if (card.dataset.repo) {
            modalRepo.href = card.dataset.repo;
            modalRepo.classList.remove("opacity-50", "pointer-events-none");
            modalRepo.setAttribute("target", "_blank");
            modalRepo.setAttribute("rel", "noopener noreferrer");
        } else {
            modalRepo.href = "#";
            modalRepo.classList.add("opacity-50", "pointer-events-none");
            modalRepo.removeAttribute("target");
            modalRepo.removeAttribute("rel");
        }

        modal.classList.remove("hidden");
        modal.classList.add("flex");
    });
});

function closeModal() {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    // clear image to free memory
    modalImg.src = "";
    // restore body scroll if it was locked
    document.body.classList.remove("overflow-hidden");
}

document.getElementById("modal-close").addEventListener("click", closeModal);
const modalBackdropEl = document.getElementById("modal-backdrop");
if (modalBackdropEl) modalBackdropEl.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
mobileBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    if (isHidden) {
        mobileMenu.classList.remove("hidden");
        mobileBtn.setAttribute("aria-expanded", "true");
        document.body.classList.add("overflow-hidden");
    } else {
        mobileMenu.classList.add("hidden");
        mobileBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("overflow-hidden");
    }
});

// close mobile menu when any nav link inside it is clicked
const mobileNavLinks = mobileMenu.querySelectorAll(".nav-link");
mobileNavLinks.forEach((l) =>
    l.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("overflow-hidden");
    })
);

const navLinks = document.querySelectorAll(".nav-link");
const sections = [
    "home",
    "about",
    "projects",
    "experience",
    "skills",
    "contact",
].map((id) => document.getElementById(id));
const io = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((a) => a.classList.remove("text-yellow-400"));
                const a = document.querySelector(
                    `.nav-link[href="#${entry.target.id}"]`
                );
                if (a) a.classList.add("text-yellow-400");
            }
        });
    },
    { threshold: 0.5 }
);
sections.forEach((s) => {
    if (s) io.observe(s);
});

// (function () {
//     emailjs.init("Gz3yiik5YvKvG32Kg");
//     const form = document.getElementById("contact-form");
//     const sendBtn = document.getElementById("send-btn");
//     const sendLoading = document.getElementById("send-loading");
//     const msgEl = document.getElementById("form-msg");
//     form.addEventListener("submit", function (e) {
//         e.preventDefault();
//         sendBtn.classList.add("hidden");
//         sendLoading.classList.remove("hidden");
//         msgEl.textContent = "";
//         const formData = new FormData(form);
//         const data = Object.fromEntries(formData.entries());
//         emailjs
//             .send("service_0tq0xw7", "template_mv5h15v", data)
//             .then(() => {
//                 msgEl.textContent = "Message sent — I will reply soon!";
//                 form.reset();
//             })
//             .catch(() => {
//                 msgEl.textContent = "Oops — something went wrong. Try again later.";
//             })
//             .finally(() => {
//                 sendBtn.classList.remove("hidden");
//                 sendLoading.classList.add("hidden");
//             });
//     });
// })();
