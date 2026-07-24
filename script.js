document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".accordion-item > button, .faq-toggle > button").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => {
      const item = button.closest(".accordion-item, .faq-toggle");
      if (!item) return;

      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".header nav");

  menuButton?.addEventListener("click", () => {
    navigation?.classList.toggle("open");
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navigation.classList.remove("open"));
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("in"));
  }

  document.querySelectorAll('a[href^="https://t.me/aishaseller_bot"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "telegram_cta_click", {
          event_category: "conversion",
          event_label: link.textContent.trim(),
        });
      }
    });
  });
});
