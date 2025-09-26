document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll) library
  AOS.init({
    duration: 800, // animation duration
    once: true, // whether animation should happen only once - default
    mirror: false, // whether elements should animate out while scrolling past them
  });

  // --- Dark Mode Toggle ---
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const body = document.body;
  const iconMoon = document.getElementById("icon-moon");
  const iconSun = document.getElementById("icon-sun");

  // Check for saved theme in localStorage or default to 'dark'
  const currentTheme = localStorage.getItem("theme") || "dark";
  body.setAttribute("data-bs-theme", currentTheme);
  if (currentTheme === "light") {
    iconMoon.classList.add("d-none");
    iconSun.classList.remove("d-none");
  } else {
    iconMoon.classList.remove("d-none");
    iconSun.classList.add("d-none");
  }

  darkModeToggle.addEventListener("click", () => {
    if (body.getAttribute("data-bs-theme") === "dark") {
      body.setAttribute("data-bs-theme", "light");
      localStorage.setItem("theme", "light");
      iconMoon.classList.add("d-none");
      iconSun.classList.remove("d-none");
    } else {
      body.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
      iconMoon.classList.remove("d-none");
      iconSun.classList.add("d-none");
    }
  });

  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      // Add 'scrolled' class after scrolling 50px
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // --- Smooth Scroll for Navbar Links ---
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor click behavior
      const targetId = this.getAttribute("href"); // Get the href value
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate offset for fixed navbar
        const navbarHeight = navbar.offsetHeight;
        const offsetTop = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Close the navbar toggler on small screens after clicking a link
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.getElementById("navbarNav");
        if (navbarToggler && navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        }
      }
    });
  });

  // --- Scroll to Top Button ---
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      // Show button after scrolling 300px
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // --- Update Copyright Year ---
  const currentYear = new Date().getFullYear();
  document.getElementById("year").textContent = currentYear;
});
