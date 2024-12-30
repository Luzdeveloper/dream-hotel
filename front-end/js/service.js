let services = []; 

const container = document.getElementById("list-services");
const contFoot = document.getElementById("footer-service");

async function fetchServices() {
    try {
        const response = await fetch("http://localhost:1337/api/services?populate=*"); 
        const dataf = await response.json();
        
        if (dataf.data) {
            // Mapper les données pour inclure l'image en format medium
            services = dataf.data.map(item => ({
                name: item.name,
                description: item.description,
                icon: item.icon
            }));
        afficherServices();
        } 
    } catch (error) {
        console.error("Erreur lors du chargement des services :", error);
    }
}


function afficherServices() {
    container.innerHTML = ""; 
    let DivA = true;

    services.forEach(function(service) {
        const { icon,name,description } = service; 

        if (DivA)
        {
            container.innerHTML += `
            <div class="container-service DivA">
                <div class="service">
                    <div class="service-icon">${icon}</div>
                    <div class="service-info">
                        <div class="service-title">${name}</div>
                        <div class="service-desc">${description}</div>
                    </div>
                </div>
            </div>
            <div class="linear-A-B"></div>
            `;
        }
        else
        {
            container.innerHTML += `
            <div class="container-service DivB">
                <div class="service">
                    <div class="service-icon">${icon}</div>
                    <div class="service-info">
                        <div class="service-title">${name}</div>
                        <div class="service-desc">${description}</div>
                    </div>
                </div>
            </div>
            <div class="linear-B-A"></div>
            `;
        }

        DivA = !DivA;
        
    });
    if (!DivA)
    {
        contFoot.innerHTML = `
        <div class="DivB">
            <p>&copy;2024 - Dream Hotel - LT/FL</p>
        </div>
        `
    }
    else
    {
        contFoot.innerHTML = `
        <div class="DivA">
            <p>&copy; 2024 - Dream Hotel - LT/FL</p>
        </div>
        `
    }
}

fetchServices();