let chambers = []; 

const container = document.getElementById("list-chambers");
const contFoot = document.getElementById("footer-room");

async function fetchChambers() {
    try {
        const response = await fetch("http://localhost:1337/api/chambers?populate=*"); 
        const dataf = await response.json();
        
        if (dataf.data) {
            // Mapper les données pour inclure l'image en format medium
            chambers = dataf.data.map(item => ({
                name: item.name,
                beds: item.beds,
                description: item.description,
                image: item.picture?.formats?.small?.url || null
            }));
        afficherChambers();
        } 
    } catch (error) {
        console.error("Erreur lors du chargement des chambres :", error);
    }
}


function afficherChambers() {
    container.innerHTML = ""; 
    let DivA = true;

    chambers.forEach(function(chamber) {
        const { name, beds, description, image } = chamber; 

        if (DivA)
        {
            container.innerHTML += `
            <div class="chamber DivA">
                <div class="chamber-picture">
                    ${image ? `<img src="http://localhost:1337${image}" alt="${name}" />` : "<p>Aucune image disponible</p>"}
                </div>
                <div class="chamber-info">
                    <div class="chamber-name">${name}</div>
                    <div class="chamber-beds"><span>Nombre de Lits :</span> ${beds}</div>
                    <div class="chamber-desc"><span>Description :</span> ${description}</div>
                    <button class="btn btnA"> Reserver </button>
                </div>
            </div>
            <div class="linear-A-B"></div>
            `;
        }
        else
        {
            container.innerHTML += `
            <div class="chamber DivB">
                <div class="chamber-picture">
                    ${image ? `<img src="http://localhost:1337${image}" alt="${name}" />` : "<p>Aucune image disponible</p>"}
                </div>
                <div class="chamber-info">
                    <div class="chamber-name">${name}</div>
                    <div class="chamber-beds"><span>Nombre de Lits :</span> ${beds}</div>
                    <div class="chamber-desc"><span>Description :</span> ${description}</div>
                    <button class="btn btnB"> Reserver </button>
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
            <p>&copy; 2024 - Dream Hotel - LT/FL</p>
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

fetchChambers();