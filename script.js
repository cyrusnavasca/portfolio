(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Hero carousel
  var carousel = document.querySelector(".hero-carousel");
  if (carousel) {
    var track = carousel.querySelector(".hero-carousel-track");
    var slides = carousel.querySelectorAll(".hero-slide");
    var dots = carousel.querySelectorAll(".hero-carousel-dot");
    var prevBtn = carousel.querySelector(".hero-carousel-prev");
    var nextBtn = carousel.querySelector(".hero-carousel-next");
    var total = slides.length;
    var current = 0;
    var autoAdvanceInterval;

    function goToSlide(index) {
      current = ((index % total) + total) % total;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("hero-slide-active", i === current);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("hero-dot-active", i === current);
        dot.setAttribute("aria-selected", i === current);
      });
    }

    function startAutoAdvance() {
      if (autoAdvanceInterval) clearInterval(autoAdvanceInterval);
      autoAdvanceInterval = setInterval(function () {
        goToSlide(current + 1);
      }, 8000);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goToSlide(current - 1);
        startAutoAdvance();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goToSlide(current + 1);
        startAutoAdvance();
      });
    }
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goToSlide(i);
        startAutoAdvance();
      });
    });

    startAutoAdvance();
  }

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.contains("is-open");
      navLinks.classList.toggle("is-open", !isOpen);
      toggle.setAttribute("aria-expanded", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Contact form: open mailto with pre-filled message
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("contact-email").value;
      var first = document.getElementById("contact-first").value;
      var last = document.getElementById("contact-last").value;
      var subjectInput = document.getElementById("contact-subject").value.trim();
      var body = document.getElementById("contact-message").value;
      var name = [first, last].filter(Boolean).join(" ");
      var subject = subjectInput || (name ? "Message from " + name : "Portfolio contact");
      var mailto = "mailto:cyrus.navasca54@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body + (email ? "\n\n— Reply to: " + email : ""));
      window.location.href = mailto;
    });
  }

  // Scroll-triggered animations: reveal elements when they enter viewport
  var animated = document.querySelectorAll(".animate-on-scroll");
  if (animated.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.1 }
    );
    animated.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animated.forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
