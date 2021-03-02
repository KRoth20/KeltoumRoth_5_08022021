///////////////////// AFFICHER PANIER DANS LE HTML//////// /////////////////////////////
function addBasketProduct(container, productInfo, productBasket, basketContent, totalPrice){
    const productContainer = document.createElement("div");// prépare l'emplacement et le format du panier avec les données à insérer
    productContainer.setAttribute("class", "row justify-content-around align-items-center mb-5");
    productContainer.innerHTML = `
    <img width="10%" src="${productInfo.imageUrl}"</img>
    <p class="col-md-3">${productInfo.name}</p>
    <div class="col-md-3">${productBasket.lenses}</div>
    <div class="col-md-3">${productInfo.price/100}€</div>
    `
    const btn = document.createElement ("button");// crée le format d'un bouton qui permet la suppression d'un produit
    btn.innerHTML = "Supprimer";
    btn.setAttribute("class", "bg-light text-dark");
    btn.setAttribute("data-id", productInfo._id);//le bouton est rattaché à l'Id du produit

    totalPrice = totalPrice + productInfo.price;      

    ////////// Supprimer un élément du panier //////////
    btn.addEventListener('click', function(e){ //crée l'action de supprimer au click sur le bouton
        const id = e.target.getAttribute("data-id");

        for (let x = 0; x != basketContent.length; x = x + 1){//parcourt le panier de produit en produit
            if (basketContent[x].id === id){//si id est trouvé 
                basketContent.splice(x, 1);//suppression d'un seul élément en partant de la position de l'id
                break;//arrête la boucle
            }
        }
        localStorage.setItem("basketContent", JSON.stringify(basketContent)); // sauvegarde du panier mis à jour
        window.location.href = "panier.html"; // actualise la page
    });

    productContainer.appendChild(btn);// intègre le bouton à l'emplacement dans le HTML
    container.appendChild(productContainer);

    return totalPrice; //récupère le calcul du prix total (montant du panier + montant du nouveau produit)
}



////////////////////// //////// IMPLEMENTATION DU PANIER  //////////////////////////////////////////

get = async (url) => { //récupération des données par l'URL
    try {
        let response = await fetch(url);
        if (response.ok){
            let dataList = await response.json();
            return dataList
        } else {
            console.log('Retour du serveur : ' + response.status);
        }
    } catch (e) {
        console.error(e);
    }
}

get("http://localhost:3000/api/cameras/").then(function(response){
   
    const basketContent = JSON.parse(localStorage.getItem("basketContent"));//on utilise le contenu du panier dans le localStorage
    const container = document.getElementById("product-basket");//on crée l'emplacement du contenu dans le HTML
    if (basketContent.length === 0){ 
        emptyBasketMessage(container);// si le contenu est nul on affiche le message panier vide 
    } else { //sinon 
        let totalPrice = 0; // en partant de 0
        for (let productBasket of basketContent){ //pour chaque produit récupéré du LocalStorage
            for (let productInfo of response){ // et pour chaque produit récupéré du LocalHost par l'API
                if (productBasket.id === productInfo._id){ // si l'id du produit déjà stocké dans le panier = à l'id de la base de données
                    totalPrice = addBasketProduct(container, productInfo, productBasket, basketContent, totalPrice);//ajoute le produit à 0 et implémente le HTML
                    localStorage.setItem("totalPriceConfirmationPage", totalPrice);//et on met à jour le Local Storage avec une nouvelle "clé" qui a comme "valeur" le résultat de la fonction d'ajout
                }
            }
        }
        // affiche le montant total dans le HTML
        document.getElementById("total-price").innerHTML = "Total: " + totalPrice/100 + "€";
    }

}).catch(function(err){ //récupère les exceptions et affiche un message d'erreur
    console.log(err);
    if(err === 0){ 
        alert("serveur HS");
    }
});

// Message panier vide //
function emptyBasketMessage(container){
    const emptyBasket = document.createElement("div")
    emptyBasket.innerHTML = "Votre panier est vide";
    container.appendChild(emptyBasket);

    return container;// récupère le message
}