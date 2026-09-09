(() => {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const isHome = Boolean(document.querySelector(".hero"));

  const onScroll = () => {
    if (!header || !isHome) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeMenu = () => {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    mobileNav.hidden = true;
  };

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      mobileNav.hidden = open;
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll("[data-reveal]");

  if (reduceMotion) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
})();
