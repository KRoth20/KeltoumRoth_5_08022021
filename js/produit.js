
////////////// Récupérer dans l'URL l'Id du produit sélectionné //////////////////////////////////////
function getId(){
    const param = location.search;
    const id = param.replace("?id=", ""); // retire ?ID= des paramètres de l'URL, récupère uniquement l'identifiant
    return id;
}

////////// Appeler la fonction de récupération de l'API par ID et implémenter la page HTML avec les données du produit sélectionné //////

function getCamera(url) { 
    fetch(url)
    .then ((res) => res.json())
    .then ((data) => {
        let place2 = '<div></div>';//prépare l'emplacement qui va accueillir l'implémentation automatique des données de la carte sélectionnée
        place2 += `
            <div class="col-12 col-md-5 mx-auto">
                <div class="card shadow mb-5">
                    <a href="Produit.html?id=${data._id}">
                    <img class="card-img-top" src="${data.imageUrl}"></>
                    </a>
                    <div class ="card-body">
                    <h3 class="card-title">${data.name}</h3>
                    <p class="card-text">${data.description}</p>
                    <select id="select">
                    </select>
                    <p class="card-text">${data.price/100}€</p>
                    <button id="btn">Ajouter au panier</button>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('choix').innerHTML = place2; //intègre dans le HTML l'emplacement de la carte sélectionnée 

        let place3 = '<option>Merci de choisir une option</option>'; // créé la 1ère option du menu déroulant
        for (let i = 0; i < data.lenses.length; i = i +1){ //parcourt l'ensemble des lentilles présentes sur l'Id sélectionné
            place3 += `<option value="${data.lenses[i]}">${data.lenses[i]}</option>`    
            document.getElementById('select').innerHTML = place3;//intègre dans le menu déroulant les différentes options

        }

        const btn = document.getElementById("btn"); //intègre dans le HTML l'emplacement du bouton qui permet de mettre le produit dans le panier avec la lentille sélectionnée
        btn.addEventListener('click', function(){ 
            const lenses = document.getElementsByTagName("select");         
            const lenseSelected = lenses[0].value;
            addToBasket(lenseSelected);//exécute la fonction d'ajout au panier
            alert("ajouté au panier"); // ajoute un message d'alerte qui valide l'ajout au panier
        });

        function addToBasket(lenseSelected){ //enregistre dans le LocalStorage tous les produits sélectionnés (avec le choix de la lentille) qui représentent le contenu du panier
            let basketContent = JSON.parse(localStorage.getItem("basketContent"));//créé une "clé"
            if (basketContent === null){//si nul laisse vide
                basketContent = [];
            }
            let product = new Product(id, lenseSelected);//dans tous les cas créé un nouveau produit
            basketContent.push(product); //push la "valeur" dans la "clé"
            localStorage.setItem("basketContent", JSON.stringify(basketContent)); // affiche dans le localStorage 
        }
    })
}

const id = getId();
getCamera("http://localhost:3000/api/cameras/" + id);// exécute la fonction de récupération de la carte à afficher selon l'Id cliqué
