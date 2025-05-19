// Modal functionality for service cards
document.addEventListener("DOMContentLoaded", function () {
  // Initialize testimonial carousel
  const carouselTrack = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.querySelector(".carousel-nav.prev");
  const nextBtn = document.querySelector(".carousel-nav.next");
  let currentIndex = 0;
  let slideInterval;

  // Set initial position
  function setSlidePosition() {
    carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Auto rotate slides every 5 seconds
  function startCarousel() {
    slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      setSlidePosition();
    }, 5000);
  }

  // Start auto-rotation
  startCarousel();

  // Pause on hover
  carouselTrack.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  carouselTrack.addEventListener("mouseleave", startCarousel);

  // Navigation buttons
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    setSlidePosition();
    resetInterval();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    setSlidePosition();
    resetInterval();
  });

  function resetInterval() {
    clearInterval(slideInterval);
    startCarousel();
  }

  // Set initial position
  setSlidePosition();

  // Get all service cards
  const serviceCards = document.querySelectorAll(".service-card");
  const modal = document.getElementById("serviceModal");
  const modalContent = document.getElementById("modalContent");
  const closeModal = document.querySelector(".close-modal");

  // Service content data
  const serviceData = {
    whispering_wind: {
      title: "The Whispering Wind Cut",
      description:
        "A bespoke cut tailored to your hair's natural flow and your soul's unspoken yearnings.",
      image: "/images/whispering_wind.png",
    },
    lunar_lustre: {
      title: "The Lunar Lustre Treatment",
      description:
        "An ancient blend of rare oils and botanical extracts, infused under the full moon to impart unparalleled shine and vitality.",
      image: "/images/lunar_lustre_treatment.png",
    },
    sunstone_sculpt: {
      title: "The Sunstone Sculpt",
      description:
        "Bold and architectural styles that capture the light and command attention. For hair that dares to be seen.",
      image: "/images/sunstone_sculpt.png",
    },
    shadow_silk: {
      title: "The Shadow Silk Smoothing",
      description:
        "Taming unruly textures with a secret technique that leaves hair impossibly smooth and ethereally soft.",
      image: "/images/smoothing.png",
    },
    ephemeral_elixir: {
      title: "The Ephemeral Elixir Consultation",
      description:
        "A private audience with Raul Sergio to diagnose your hair's unique needs and prescribe a personalized path to follicular nirvana.",
      image: "/images/consultation.png",
    },
    corte_viento: {
      title: "El Corte de Viento Susurrante",
      description:
        "Un corte a medida adaptado al flujo natural de tu cabello y los anhelos no dichos de tu alma.",
      image: "/images/whispering_wind.png",
    },
    brillo_lunar: {
      title: "El Tratamiento de Brillo Lunar",
      description:
        "Una mezcla ancestral de aceites raros y extractos botánicos, infundidos bajo la luna llena para impartir un brillo y vitalidad sin igual.",
      image: "/images/lunar_lustre_treatment.png",
    },
    piedra_solar: {
      title: "El Esculpido de Piedra Solar",
      description:
        "Estilos audaces y arquitectónicos que capturan la luz y demandan atención. Para cabello que se atreve a ser visto.",
      image: "/images/sunstone_sculpt.png",
    },
    seda_sombria: {
      title: "El Suavizado de Seda Sombria",
      description:
        "Domando texturas rebeldes con una técnica secreta que deja el cabello imposiblemente suave y etéreamente sedoso.",
      image: "/images/smoothing.png",
    },
    elixir_efimero: {
      title: "Consulta de Elixir Efímero",
      description:
        "Una audiencia privada con Raul Sergio para diagnosticar las necesidades únicas de tu cabello y prescribir un camino personalizado hacia el nirvana folicular.",
      image: "/images/consultation.png",
    },
  };

  // Add click event to each service card
  serviceCards.forEach((card) => {
    card.addEventListener("click", function () {
      const serviceId = this.getAttribute("data-service");
      const service = serviceData[serviceId];

      // Get all service IDs and current index
      const serviceIds = Object.keys(serviceData);
      const currentIndex = serviceIds.indexOf(serviceId);

      // Populate modal content with navigation
      modalContent.innerHTML = `
                <h2 class="modal-title">${service.title}</h2>
                <div class="modal-body">
                    <button class="modal-nav prev">
                        &larr;
                    </button>
                    <div class="modal-image-container">
                        <img src="${service.image}" alt="${service.title}" class="modal-image">
                    </div>
                    <div class="modal-text">
                        <p>${service.description}</p>
                            <button class="cta-button request-service" data-service="${service.title}">${document.documentElement.lang === 'es' ? 'Solicitar Servicio' : 'Request Service'}</button>
                    </div>
                    <button class="modal-nav next">
                        &rarr;
                    </button>
                </div>
            `;

      // Add navigation event listeners with loop logic
      document
        .querySelector(".modal-nav.prev")
        ?.addEventListener("click", () => {
          const prevIndex =
            currentIndex === 0 ? serviceIds.length - 1 : currentIndex - 1;
          const prevServiceId = serviceIds[prevIndex];
          const prevService = serviceData[prevServiceId];
          updateModalContent(prevServiceId, prevService);
        });

      document
        .querySelector(".modal-nav.next")
        ?.addEventListener("click", () => {
          const nextIndex =
            currentIndex === serviceIds.length - 1 ? 0 : currentIndex + 1;
          const nextServiceId = serviceIds[nextIndex];
          const nextService = serviceData[nextServiceId];
          updateModalContent(nextServiceId, nextService);
        });

      // Helper function to update modal content
      function updateModalContent(serviceId, service) {
        const newIndex = serviceIds.indexOf(serviceId);

        modalContent.innerHTML = `
                    <h2 class="modal-title">${service.title}</h2>
                    <div class="modal-body">
                        <button class="modal-nav prev">
                            &larr;
                        </button>
                        <div class="modal-image-container">
                            <img src="${service.image}" alt="${service.title}" class="modal-image">
                        </div>
                        <div class="modal-text">
                            <p>${service.description}</p>
                            <button class="cta-button request-service" data-service="${service.title}">${document.documentElement.lang === 'es' ? 'Solicitar Servicio' : 'Request Service'}</button>
                        </div>
                        <button class="modal-nav next">
                            &rarr;
                        </button>
                    </div>
                `;

        // Re-add event listeners with loop logic
        document
          .querySelector(".modal-nav.prev")
          ?.addEventListener("click", () => {
            const prevIndex =
              newIndex === 0 ? serviceIds.length - 1 : newIndex - 1;
            const prevServiceId = serviceIds[prevIndex];
            const prevService = serviceData[prevServiceId];
            updateModalContent(prevServiceId, prevService);
          });

        document
          .querySelector(".modal-nav.next")
          ?.addEventListener("click", () => {
            const nextIndex =
              newIndex === serviceIds.length - 1 ? 0 : newIndex + 1;
            const nextServiceId = serviceIds[nextIndex];
            const nextService = serviceData[nextServiceId];
            updateModalContent(nextServiceId, nextService);
          });

        document
          .querySelector(".request-service")
          ?.addEventListener("click", requestServiceHandler);
      }

      // Add event listener to request service button
      function requestServiceHandler() {
        // Close service modal
        const scrollY = document.body.style.top;
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
        document.documentElement.style.scrollBehavior = "";
        document.body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);

        // Open contact modal and preselect service
        const contactModal = document.getElementById("contactModal");
        contactModal.style.display = "block";
        document.body.classList.add("modal-open");
        document.body.style.top = `-${window.scrollY}px`;
        document.getElementById("service").value = service.title;
      }

      document
        .querySelector(".request-service")
        ?.addEventListener("click", requestServiceHandler);

      // Show modal and prevent body scrolling
      const scrollY = window.scrollY; // Store current scroll position
      modal.style.display = "block";
      document.body.classList.add("modal-open");
      document.body.style.top = `-${scrollY}px`; // Offset body position
      document.documentElement.style.scrollBehavior = "auto";
    });
  });

  // Close modals when X is clicked
  document.querySelectorAll(".close-modal").forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      const scrollY = document.body.style.top;
      document.querySelectorAll(".modal").forEach((modal) => {
        modal.style.display = "none";
      });
      document.body.classList.remove("modal-open");
      document.documentElement.style.scrollBehavior = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    });
  });

  // Close modal when clicking outside content
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      const scrollY = document.body.style.top;
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
      document.documentElement.style.scrollBehavior = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  });

  // Language switcher functionality
  const languageSwitcher = document.querySelector(".language-switcher");
  if (languageSwitcher) {
    languageSwitcher.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        e.preventDefault();
        const lang = e.target.getAttribute("data-lang");
        if (lang === "es") {
          window.location.href = "../es/index.html";
        } else if (lang === "en") {
          window.location.href = "../en/index.html";
        }
      }
    });
  }

  // Handle "Submit Your Request" button in contact section
  const submitRequestBtn = document.querySelector(".contact .cta-button");
  if (submitRequestBtn) {
    submitRequestBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const contactModal = document.getElementById("contactModal");
      contactModal.style.display = "block";
      document.body.classList.add("modal-open");
      document.body.style.top = `-${window.scrollY}px`;
      document.getElementById("service").value = "";
    });
  }
});
