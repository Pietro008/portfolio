/* ============================================
   SCRIPT — PORTFÓLIO PIETRO FILIPE
   Boot Sequence + Background + Scroll Animations
   ============================================ */
(function () {
  "use strict";
  // =========================================
  // 1. BOOT SEQUENCE
  // =========================================
  const bootScreen = document.getElementById("boot-screen");
  const bootCursor = document.getElementById("boot-cursor");
  const bootText = document.getElementById("boot-text");
  const siteContent = document.getElementById("site-content");
  const fullText = "< INICIANDO PROTOCOLO  ";
  let phase = 0;
  // Phase 0: cursor blinks for 1.5s
  setTimeout(() => {
    phase = 1;
    bootCursor.style.display = "none";
    typeText(0);
  }, 1500);
  function typeText(i) {
    if (i <= fullText.length) {
      bootText.textContent = fullText.slice(0, i);
      setTimeout(() => typeText(i + 1), 40);
    } else {
      // Done typing — wait then fade out
      setTimeout(() => {
        bootScreen.classList.add("fade-out");
        siteContent.classList.remove("hidden");
        setTimeout(() => {
          bootScreen.style.display = "none";
        }, 400);
      }, 400);
    }
  }
  // =========================================
  // 2. BACKGROUND CANVAS (Grid + Purple Glow)
  // =========================================
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let time = 0;
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  function drawBackground() {
    time += 0.005;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Grid lines
    const spacing = 60;
    ctx.strokeStyle = "rgba(0, 230, 0, " + (0.03 + Math.sin(time) * 0.01) + ")";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < canvas.width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    // Purple radial glow
    const grd = ctx.createRadialGradient(
      canvas.width * 0.7, canvas.height * 0.3, 0,
      canvas.width * 0.7, canvas.height * 0.3, canvas.width * 0.5
    );
    grd.addColorStop(0, "rgba(138, 43, 226, " + (0.06 + Math.sin(time * 0.5) * 0.02) + ")");
    grd.addColorStop(1, "transparent");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(drawBackground);
  }
  drawBackground();
  // =========================================
  // 3. SCROLL ANIMATIONS (Intersection Observer)
  // =========================================
  const fadeElements = document.querySelectorAll(".fade-element");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  fadeElements.forEach((el) => observer.observe(el));
  // =========================================
  // 4. NAVBAR SCROLL EFFECT
  // =========================================
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  // =========================================
  // 5. MOBILE MENU TOGGLE
  // =========================================
  const navToggle = document.getElementById("nav-toggle");
  const navMobile = document.getElementById("nav-mobile");
  navToggle.addEventListener("click", () => {
    const isOpen = !navMobile.classList.contains("hidden");
    if (isOpen) {
      navMobile.classList.add("hidden");
      navToggle.textContent = "[MENU]";
    } else {
      navMobile.classList.remove("hidden");
      navToggle.textContent = "[FECHAR]";
    }
  });
  // Close mobile menu on link click
  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMobile.classList.add("hidden");
      navToggle.textContent = "[MENU]";
    });
  });
  // =========================================
  // 6. FORM INTERACTION
  // =========================================
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Mensagem enviada com sucesso! (simulação)");
      form.reset();
    });
  }
})();