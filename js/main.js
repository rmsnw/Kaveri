/* =====================================================================
   Kaveri Prashanth Patali — shared site scripts
   - Mobile navigation toggle
   - Active link highlighting
   - Scroll reveal animation
   - Contact form validation (client-side demo)
   - Footer year
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Staggered scroll reveal ---------- */
  /* Give grid/flex siblings a cascading delay for a smooth, premium feel */
  document.querySelectorAll(".grid, .hero-grid, .cta-actions, .trustbar-inner, .checklist").forEach(function (group) {
    var kids = group.querySelectorAll(":scope > .reveal, :scope > .reveal-left, :scope > .reveal-right");
    kids.forEach(function (el, i) { el.style.transitionDelay = (i * 90) + "ms"; });
  });

  var reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Scroll progress bar ---------- */
  var progress = document.createElement("div");
  progress.className = "scroll-progress";
  document.body.appendChild(progress);

  /* ---------- Back-to-top button ---------- */
  var toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
  document.body.appendChild(toTop);
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Scroll-aware header + progress + to-top (one handler) ---------- */
  var header = document.querySelector(".site-header");
  var ticking = false;
  function onScroll() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docH > 0 ? (st / docH) * 100 : 0;
    progress.style.width = pct + "%";
    if (header) { header.classList.toggle("scrolled", st > 12); }
    toTop.classList.toggle("show", st > 600);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Smooth anchor scrolling (for in-page links) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
      }
    });
  });

  /* ---------- Media link arrow nudge ---------- */
  document.querySelectorAll(".media-link").forEach(function (l) {
    l.addEventListener("mouseenter", function () { l.style.gap = "12px"; });
    l.addEventListener("mouseleave", function () { l.style.gap = "6px"; });
  });

  /* ---------- Footer year ---------- */
  var yr = document.getElementById("year");
  if (yr) { yr.textContent = new Date().getFullYear(); }

  /* ---------- Contact form (client-side validation demo) ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    var success = document.getElementById("form-success");

    function setError(field, on) {
      var wrap = field.closest(".field");
      if (wrap) { wrap.classList.toggle("error", on); }
    }

    function validEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var required = form.querySelectorAll("[required]");

      required.forEach(function (input) {
        var empty = !input.value.trim();
        var bad = empty;
        if (!empty && input.type === "email") { bad = !validEmail(input.value.trim()); }
        setError(input, bad);
        if (bad) { ok = false; }
      });

      if (!ok) {
        var firstErr = form.querySelector(".field.error");
        if (firstErr) { firstErr.scrollIntoView({ behavior: "smooth", block: "center" }); }
        return;
      }

      /* No backend is wired up yet — show a friendly confirmation.
         See README.md to connect Formspree / Netlify Forms / email. */
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.reset();
    });

    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      input.addEventListener("input", function () { setError(input, false); });
    });
  }

  /* ---------- Testimonials slider (2-up, pages through pairs) ---------- */
  var slider = document.querySelector(".tslider");
  if (slider) {
    var track = slider.querySelector(".tslider-track");
    var slides = slider.querySelectorAll(".tslide");
    var dotsWrap = slider.querySelector(".tdots");
    var prevBtn = slider.querySelector(".tarrow.prev");
    var nextBtn = slider.querySelector(".tarrow.next");
    var total = slides.length;
    var index = 0, pages = 1, perView = 2, timer = null;

    function calcPerView() { return window.innerWidth >= 768 ? 2 : 1; }

    function buildDots() {
      dotsWrap.innerHTML = "";
      for (var i = 0; i < pages; i++) {
        var d = document.createElement("button");
        d.className = "tdot" + (i === index ? " active" : "");
        d.setAttribute("aria-label", "Go to slide " + (i + 1));
        (function (n) { d.addEventListener("click", function () { go(n); restart(); }); })(i);
        dotsWrap.appendChild(d);
      }
    }
    function updateDots() {
      dotsWrap.querySelectorAll(".tdot").forEach(function (dot, k) {
        dot.classList.toggle("active", k === index);
      });
    }
    function go(n) {
      index = (n + pages) % pages;
      track.style.transform = "translateX(-" + (index * 100) + "%)";
      updateDots();
    }
    function setup() {
      perView = calcPerView();
      pages = Math.ceil(total / perView);
      slides.forEach(function (s) { s.style.minWidth = (100 / perView) + "%"; });
      if (index >= pages) { index = pages - 1; }
      buildDots();
      track.style.transform = "translateX(-" + (index * 100) + "%)";
    }
    function next() { go(index + 1); }
    function prev() { go(index - 1); }
    function start() { timer = setInterval(next, 6000); }
    function restart() { clearInterval(timer); start(); }

    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });
    slider.addEventListener("mouseenter", function () { clearInterval(timer); });
    slider.addEventListener("mouseleave", start);

    var startX = 0;
    slider.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { if (dx < 0) { next(); } else { prev(); } restart(); }
    });

    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(setup, 180); });

    setup();
    start();
  }

  /* ---------- FAQ accordion (single-open) ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    if (!btn || !panel) { return; }
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = null;
        o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
})();
