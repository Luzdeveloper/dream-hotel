import { Carousel } from './script.js';

async function fetchRestaurants() {
  try {
    const response = await fetch("http://localhost:1337/api/restaurants?populate=*");
    const dataf = await response.json();

    if (dataf.data) {
      const restaurants = dataf.data.map(item => ({
        name: item.name,
        description: item.description,
        image: item.picture?.formats?.small?.url 
          ? `http://localhost:1337${item.picture.formats.small.url}`
          : "default-image.jpg", // Image par défaut si aucune image n'existe
      }));

      // Création de plusieurs carrousels
      new Carousel(restaurants, "carrousel-restau-1", "dot-restau-1");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des restaurants :", error);
  }
}

let services = []; 

const container = document.getElementById("list-services");

async function fetchChambres() {
    try {
      const response = await fetch("http://localhost:1337/api/chambers?populate=*");
      const dataf = await response.json();
  
      if (dataf.data) {
        const restaurants = dataf.data.map(item => ({
          description: item.name,
          image: item.picture?.formats?.small?.url 
            ? `http://localhost:1337${item.picture.formats.small.url}`
            : "default-image.jpg", // Image par défaut si aucune image n'existe
        }));
  
        // Création de plusieurs carrousels
        new Carousel(restaurants, "carrousel-chamber-1", "dot-chamber-1");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des restaurants :", error);
    }
  }

  async function fetchServices() {
    try {
        const response = await fetch("http://localhost:1337/api/services?populate=*"); 
        const dataf = await response.json();
        
        if (dataf.data) {
          // Mapper les données pour inclure l'image en format medium
          services = dataf.data.slice(0, 3).map(item => ({
            name: item.name,
            description: item.description,
            icon: item.icon
          }));
        
          services.forEach(function(service) {
            const { icon,name,description } = service; 
              container.innerHTML += `
                <div class="container-service">
                  <div class="service">
                    <div class="service-icon">${icon}</div>
                    <div class="service-info">
                      <div class="service-title">${name}</div>
                      <div class="service-desc">${description}</div>
                    </div>
                  </div>
                </div>`;
          });
        } 
    } catch (error) {
        console.error("Erreur lors du chargement des services :", error);
    }
}

fetchServices()
fetchRestaurants();
fetchChambres();


