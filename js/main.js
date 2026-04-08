(function () {
  "use strict";

  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");
  var yearEl = document.getElementById("year");
  var contactForm = document.getElementById("contact-form");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    siteNav.querySelectorAll("a[href^=\"#\"]").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initCarousels() {
    var carousels = document.querySelectorAll("[data-carousel]");
    carousels.forEach(function (carousel) {
      var viewport = carousel.querySelector(".carousel-viewport");
      var track = carousel.querySelector(".carousel-track");
      var slides = carousel.querySelectorAll(".carousel-slide");
      var dotsRoot = carousel.querySelector(".carousel-dots");
      var toolbar = carousel.querySelector(".carousel-toolbar");

      if (!viewport || !track || !slides.length || !dotsRoot) return;

      var count = slides.length;
      var index = 0;

      function layout() {
        var w = viewport.offsetWidth;
        if (!w) return;
        for (var i = 0; i < slides.length; i++) {
          slides[i].style.flex = "0 0 " + w + "px";
        }
        track.style.transform = "translateX(" + -index * w + "px)";
      }

      function updateDots() {
        var dots = dotsRoot.querySelectorAll(".carousel-dot");
        for (var j = 0; j < dots.length; j++) {
          if (j === index) dots[j].setAttribute("aria-current", "true");
          else dots[j].removeAttribute("aria-current");
        }
      }

      function update() {
        layout();
        updateDots();
      }

      if (count <= 1) {
        if (toolbar) toolbar.hidden = true;
        window.addEventListener("resize", layout);
        layout();
        return;
      }

      if (toolbar) toolbar.hidden = false;

      dotsRoot.innerHTML = "";
      for (var d = 0; d < count; d++) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", "Go to image " + (d + 1) + " of " + count);
        if (d === 0) dot.setAttribute("aria-current", "true");
        (function (di) {
          dot.addEventListener("click", function () {
            index = di;
            update();
          });
        })(d);
        dotsRoot.appendChild(dot);
      }

      window.addEventListener("resize", layout);
      update();
    });
  }

  initCarousels();

  if (contactForm) {
    // Form submission handled by Formspree Ajax SDK (loaded in index.html)
  }
})();
