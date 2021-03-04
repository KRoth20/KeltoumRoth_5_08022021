////////// Appeler la fonction de récupération de l'API et implémenter la page HTML avec les données récupérées //////
    
    function get(url){ 
        fetch (url)
        .then ((res) => res.json())
        .then((data) => {
            let place = '<div></div>';
             //prépare l'emplacement qui va accueillir l'implémentation automatique des données
        data.forEach(function(camera){ //structure pour chaque élément trouvé
            place += `
            <div class="col-12 col-md-5 mx-auto">
                <div class="card shadow mb-5">
                    <a href="produit.html?id=${camera._id}">
                    <img class="card-img-top" src="${camera.imageUrl}"></>
                    </a>
                    <div class="card-body">
                        <h3 class="card-title">${camera.name}</h3>
                        <p class="card-text">${camera.description}</p>
                        <p class="card-text">Optiques : ${camera.lenses}</p>
                        <p class="card-text">${camera.price/100}€</p>
                    </div>
                </div>
            </div>
            `;
         
        })
        document.getElementById('stock').innerHTML = place;//intègre l'emplacement des cartes dans le HTML
        })
    }
    
    get("http://localhost:3000/api/cameras") //éxecute la fonction de récupération des données
    
    
    