document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll) library
  AOS.init({
    duration: 800, // animation duration
    once: true, // whether animation should happen only once - default
    mirror: false, // whether elements should animate out while scrolling past them
  });

  // --- Typing Effect for Hero Subtitle ---
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const texts = [
      'Diseñador y desarrollador web',
      'Especialista en UX/UI',
      'Creador de experiencias digitales',
      'Desarrollador Frontend'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before starting new text
      }
      
      setTimeout(typeText, typingSpeed);
    }
    
    // Start typing effect after a short delay
    setTimeout(typeText, 1000);
  }

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

  // --- Enhanced Navbar Scroll Effect ---
  const navbar = document.querySelector(".navbar-modern");
  let lastScrollY = window.scrollY;
  
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    
    // Add subtle animation based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    
    lastScrollY = currentScrollY;
  });

  // --- Active Link Highlighting ---
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveLink);
  highlightActiveLink(); // Call once on load

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
        const navbarToggler = document.querySelector(".mobile-menu-toggle");
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

  // --- Scroll Indicator Click ---
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const aboutSection = document.querySelector('#about');
      if (aboutSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const offsetTop = aboutSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }

  // --- Skills Progress Bars Animation ---
  const progressBars = document.querySelectorAll('.progress-bar');
  
  function animateProgressBars() {
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    });
  }

  // Intersection Observer for skills section
  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateProgressBars, 500);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
  }

  // --- Update Copyright Year ---
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = currentYear;
  }

  // --- Contact Form Enhancement ---
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...';
      submitBtn.disabled = true;
      
      // Reset button after 3 seconds (in case of redirect issues)
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    });
  }
});
