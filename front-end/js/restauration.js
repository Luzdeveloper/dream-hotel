import { Carousel } from './script.js';

async function fetchFoods() {
  try {
    const response = await fetch("http://localhost:1337/api/foods?populate=*");
    const dataf = await response.json();

    if (dataf.data) {
      const foods = dataf.data.map(item => ({
        description : item.name,
        image: item.picture?.formats?.small?.url 
          ? `http://localhost:1337${item.picture.formats.small.url}`
          : "default-image.jpg", // Image par défaut si aucune image n'existe
      }));
      // Création de plusieurs carrousels
      new Carousel(foods, "carrousel-restau-1", "dot-restau-1");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des restaurants :", error);
  }
}

fetchFoods();
