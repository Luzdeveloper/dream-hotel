const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);




//CARROUSEL
export class Carousel {
  constructor(images, targetDivId, targetDotId) {
    this.images = images;
    this.targetDiv = document.getElementById(targetDivId);
    this.targetDot = document.getElementById(targetDotId);
    this.slideIndex = 1;

    if (!this.targetDiv || !this.targetDot) {
      console.error(`Les éléments cible pour le carrousel ou les points ne sont pas trouvés : ${targetDivId}, ${targetDotId}`);
      return;
    }

    this.initCarousel();
  }

  initCarousel() {
    const max = this.images.length;

    // Créer des fragments DOM pour les slides et les dots
    const slideFragment = document.createDocumentFragment();
    const dotFragment = document.createDocumentFragment();

    let count = 1;

    this.images.forEach(({ image, description }) => {
      const slide = document.createElement("div");
      slide.classList.add("custom-slider", "fade");

      slide.innerHTML = `
        <div class="slide-img"><img src="${image}" alt="Image ${count}"></div>
        <div class="slide-text">${description}</div>
      `;

      slideFragment.appendChild(slide);

      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => this.currentSlide(count));
      dotFragment.appendChild(dot);

      count++;
    });

    this.targetDiv.appendChild(slideFragment);
    this.targetDot.appendChild(dotFragment);

    // Afficher les slides initiales
    this.showSlides(this.slideIndex);

    // Ajouter des écouteurs pour les boutons si nécessaire
    const prevButton = this.targetDiv.parentElement.querySelector(".prev-slide");
    const nextButton = this.targetDiv.parentElement.querySelector(".next-slide");

    if (prevButton) prevButton.addEventListener("click", () => this.plusSlides(-1));
    if (nextButton) nextButton.addEventListener("click", () => this.plusSlides(1));
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    const slides = this.targetDiv.getElementsByClassName("custom-slider");
    const dots = this.targetDot.getElementsByClassName("dot");

    if (n > slides.length) { this.slideIndex = 1; }
    if (n < 1) { this.slideIndex = slides.length; }

    Array.from(slides).forEach(slide => slide.style.display = "none");
    Array.from(dots).forEach(dot => dot.classList.remove("active"));

    slides[this.slideIndex - 1].style.display = "flex";
    dots[this.slideIndex - 1].classList.add("active");
  }
}
