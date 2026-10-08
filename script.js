(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  const contrastButton = document.querySelector(".contrast-toggle");
  const factOutput = document.querySelector("#fact-output");

  // Menu mobile: feedback claro e fechamento ao selecionar um link.
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.querySelector(".sr-only").textContent = isOpen ? "Fechar menu" : "Abrir menu";
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.querySelector(".sr-only").textContent = "Abrir menu";
      });
    });
  }

  // Alternância de contraste para complementar o contraste padrão AA.
  if (contrastButton) {
    contrastButton.addEventListener("click", () => {
      const highContrast = document.body.classList.toggle("high-contrast");
      contrastButton.setAttribute("aria-pressed", String(highContrast));
      contrastButton.textContent = highContrast ? "Contraste normal" : "Alto contraste";
    });
  }

  // Curiosidades interativas, com atualização anunciada por leitor de tela.
  document.querySelectorAll(".fact-card").forEach(card => {
    card.addEventListener("click", () => {
      const text = card.dataset.fact || "";
      factOutput.textContent = text;
      document.querySelectorAll(".fact-card").forEach(item => item.removeAttribute("aria-current"));
      card.setAttribute("aria-current", "true");
    });
  });

  // Atalhos de teclado: "/" leva o foco para a navegação.
  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      event.preventDefault();
      const firstLink = nav?.querySelector("a");
      firstLink?.focus();
    }
  });
})();
