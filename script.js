// Always start at top on refresh
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");
    navToggle.classList.toggle("nav-toggle--open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close nav when a link is clicked (on mobile)
  nav.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches(".nav__link") && window.innerWidth < 880) {
      nav.classList.remove("nav--open");
      navToggle.classList.remove("nav-toggle--open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Scroll-to-top button
const scrollTopBtn = document.getElementById("scroll-top");

if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add("scroll-top--visible");
    } else {
      scrollTopBtn.classList.remove("scroll-top--visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Simple, lightweight form handling (front-end only)
const form = document.getElementById("appointment-form");
const successEl = document.getElementById("form-success");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = form.elements.namedItem("name");
    const phoneInput = form.elements.namedItem("phone");

    const nameError = document.querySelector('[data-error-for="name"]');
    const phoneError = document.querySelector('[data-error-for="phone"]');

    let isValid = true;

    // Reset messages
    if (successEl) successEl.textContent = "";
    if (nameError) nameError.textContent = "";
    if (phoneError) phoneError.textContent = "";

    // Name validation
    if (!nameInput.value.trim()) {
      if (nameError) nameError.textContent = "Please enter your full name.";
      isValid = false;
    }

    // Very simple phone validation (you can adjust pattern later)
    if (!phoneInput.value.trim()) {
      if (phoneError) phoneError.textContent = "Please enter your mobile number.";
      isValid = false;
    } else if (phoneInput.value.replace(/\D/g, "").length < 10) {
      if (phoneError) phoneError.textContent = "Please enter a valid phone number.";
      isValid = false;
    }

    if (!isValid) return;

    // Simulated submit
    form.reset();
    if (successEl) {
      successEl.textContent =
        "Thank you. Our patient care team will contact you shortly to confirm your appointment.";
    }
  });
}

