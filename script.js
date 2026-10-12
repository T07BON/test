const projects = [
  {
    id: 1,
    title: "Neonowy świat przyszłości",
    description:
      "Seria koncepcyjnych grafik przedstawiających futurystyczne miasto i eksperyment z oświetleniem generatywnym.",
    category: "grafika",
    categoryLabel: "Grafika",
    tool: "Midjourney",
    visual: "visual-1",
    symbol: "✦",
    link: "#"
  },
  {
    id: 2,
    title: "Marka od zera",
    description:
      "Koncepcja identyfikacji wizualnej fikcyjnej marki: kierunek artystyczny, ton komunikacji i przykładowe materiały.",
    category: "grafika",
    categoryLabel: "Grafika",
    tool: "Adobe Firefly",
    visual: "visual-2",
    symbol: "◒",
    link: "#"
  },
  {
    id: 3,
    title: "Historia w 60 sekund",
    description:
      "Krótki scenariusz i storyboard do filmu edukacyjnego przygotowane z pomocą generatywnego AI.",
    category: "wideo",
    categoryLabel: "Wideo",
    tool: "ChatGPT + Runway",
    visual: "visual-3",
    symbol: "▶",
    link: "#"
  },
  {
    id: 4,
    title: "Landing page dla aplikacji",
    description:
      "Responsywny prototyp strony internetowej dla aplikacji wykorzystującej AI do organizacji zadań.",
    category: "web",
    categoryLabel: "Web",
    tool: "ChatGPT",
    visual: "visual-4",
    symbol: "</>",
    link: "#"
  },
  {
    id: 5,
    title: "Mini e-book: AI w praktyce",
    description:
      "Przystępny materiał tekstowy o codziennych zastosowaniach sztucznej inteligencji i dobrych praktykach.",
    category: "tekst",
    categoryLabel: "Teksty",
    tool: "Claude",
    visual: "visual-5",
    symbol: "Aa",
    link: "#"
  },
  {
    id: 6,
    title: "Prezentacja: przyszłość pracy",
    description:
      "Koncepcja 10-slajdowej prezentacji pokazującej wpływ AI na sposób pracy i uczenia się.",
    category: "prezentacja",
    categoryLabel: "Prezentacja",
    tool: "Gamma",
    visual: "visual-6",
    symbol: "▤",
    link: "#"
  },
  {
    id: 7,
    title: "Gra: Złap prompt",
    description:
      "Prosta gra przeglądarkowa będąca ćwiczeniem z logiki, interakcji i projektowania doświadczenia użytkownika.",
    category: "gra",
    categoryLabel: "Gra",
    tool: "ChatGPT",
    visual: "visual-7",
    symbol: "★",
    link: "#"
  },
  {
    id: 8,
    title: "Asystent kreatywny",
    description:
      "Prototyp prostego narzędzia pomagającego porządkować pomysły i zamieniać je w konkretne zadania.",
    category: "web",
    categoryLabel: "Web",
    tool: "ChatGPT + HTML/CSS/JS",
    visual: "visual-8",
    symbol: "{ }",
    link: "#"
  }
];

const projectGrid = document.querySelector("#project-grid");
const emptyState = document.querySelector("#empty-state");
const filterButtons = document.querySelectorAll(".filter-btn");

const modal = document.querySelector("#modal");
const modalPanel = document.querySelector(".modal-panel");
const modalVisual = document.querySelector("#modal-visual");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalCategory = document.querySelector("#modal-category");
const modalTool = document.querySelector("#modal-tool");
const modalLink = document.querySelector("#modal-link");

let lastFocusedElement = null;


/* ==========================================
   TWORZENIE KART PROJEKTÓW
========================================== */

function createProjectCard(project) {
  const article = document.createElement("article");

  article.className = "project-card";
  article.dataset.category = project.category;

  article.innerHTML = `
    <button
      class="project-thumb"
      type="button"
      aria-label="Powiększ podgląd projektu: ${project.title}"
      data-project-id="${project.id}"
    >
      <div
        class="visual ${project.visual}"
        role="img"
        aria-label="Miniatura projektu: ${project.title}"
      >
        <span class="visual-symbol" aria-hidden="true">
          ${project.symbol}
        </span>
      </div>
    </button>

    <div class="project-body">

      <div class="project-meta">
        <span class="project-category">
          ${project.categoryLabel}
        </span>

        <span class="project-tool">
          ${project.tool}
        </span>
      </div>

      <h3>${project.title}</h3>

      <p>
        ${project.description}
      </p>

      <a
        class="project-link"
        href="${project.link}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Otwórz projekt: ${project.title}"
      >
        Otwórz materiał ↗
      </a>

    </div>
  `;

  return article;
}


/* ==========================================
   WYŚWIETLANIE PROJEKTÓW
========================================== */

function renderProjects(filter = "all") {
  projectGrid.innerHTML = "";

  const visibleProjects = projects.filter(project => {
    return filter === "all" || project.category === filter;
  });

  visibleProjects.forEach(project => {
    projectGrid.appendChild(
      createProjectCard(project)
    );
  });

  emptyState.hidden = visibleProjects.length !== 0;
}


/* ==========================================
   OTWIERANIE MODALA
========================================== */

function openModal(project) {
  lastFocusedElement = document.activeElement;

  modal.hidden = false;

  document.body.classList.add("modal-open");

  modalVisual.className =
    `modal-visual visual ${project.visual}`;

  modalVisual.setAttribute(
    "aria-label",
    `Podgląd projektu: ${project.title}`
  );

  modalVisual.innerHTML = `
    <span class="visual-symbol" aria-hidden="true">
      ${project.symbol}
    </span>
  `;

  modalTitle.textContent = project.title;

  modalDescription.textContent =
    project.description;

  modalCategory.textContent =
    project.categoryLabel;

  modalTool.textContent =
    project.tool;

  modalLink.href =
    project.link;

  modalPanel.focus();
}


/* ==========================================
   ZAMYKANIE MODALA
========================================== */

function closeModal() {
  modal.hidden = true;

  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}


/* ==========================================
   KLIKNIĘCIE W MINIATURĘ
========================================== */

projectGrid.addEventListener("click", event => {

  const thumb =
    event.target.closest(".project-thumb");

  if (!thumb) {
    return;
  }

  const projectId =
    Number(thumb.dataset.projectId);

  const project =
    projects.find(project => project.id === projectId);

  if (project) {
    openModal(project);
  }
});


/* ==========================================
   FILTROWANIE PROJEKTÓW
========================================== */

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {

      const active =
        btn === button;

      btn.classList.toggle(
        "active",
        active
      );

      btn.setAttribute(
        "aria-pressed",
        String(active)
      );

    });

    renderProjects(
      button.dataset.filter
    );

  });

});


/* ==========================================
   OBSŁUGA MODALA
========================================== */

modal.addEventListener("click", event => {

  if (
    event.target.matches(
      "[data-close-modal]"
    )
  ) {
    closeModal();
  }

});


/* ==========================================
   KLAWISZ ESCAPE + FOCUS TRAP
========================================== */

document.addEventListener("keydown", event => {

  /*
    Zamknięcie modala klawiszem Escape
  */

  if (
    event.key === "Escape" &&
    !modal.hidden
  ) {
    closeModal();
  }


  /*
    Prosty focus trap dla modala
  */

  if (
    event.key === "Tab" &&
    !modal.hidden
  ) {

    const focusable =
      modal.querySelectorAll(
        "button, a, [tabindex]:not([tabindex='-1'])"
      );

    if (!focusable.length) {
      return;
    }

    const first =
      focusable[0];

    const last =
      focusable[focusable.length - 1];


    /*
      Shift + Tab
    */

    if (
      event.shiftKey &&
      document.activeElement === first
    ) {

      event.preventDefault();

      last.focus();

    }


    /*
      Tab
    */

    else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {

      event.preventDefault();

      first.focus();

    }

  }

});


/* ==========================================
   MENU MOBILNE
========================================== */

const menuToggle =
  document.querySelector(".menu-toggle");

const mainNav =
  document.querySelector("#main-nav");


menuToggle.addEventListener("click", () => {

  const isOpen =
    mainNav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menuToggle.setAttribute(
    "aria-label",
    isOpen
      ? "Zamknij menu"
      : "Otwórz menu"
  );

});


/* ==========================================
   ZAMYKANIE MENU PO KLIKNIĘCIU W LINK
========================================== */

mainNav.addEventListener("click", event => {

  if (
    event.target.matches("a")
  ) {

    mainNav.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Otwórz menu"
    );

  }

});


/* ==========================================
   AKTUALNY ROK W STOPCE
========================================== */

document.querySelector("#year").textContent =
  new Date().getFullYear();


/* ==========================================
   START STRONY
========================================== */

renderProjects();