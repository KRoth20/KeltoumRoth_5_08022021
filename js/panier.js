///////////////////// AFFICHER PANIER DANS LE HTML//////// /////////////////////////////
function createBasket(container, productInfo, productBasket, basketContent, totalPrice){
    const productContainer = document.createElement("div");// prépare l'emplacement et le format du panier avec les données à insérer
    productContainer.setAttribute("class", "row justify-content-around align-items-center mb-5");
    productContainer.innerHTML = `
    <img width="10%" src="${productInfo.imageUrl}"</img>
    <p class="col-md-3">${productInfo.name}</p>
    <div class="col-md-3">${productBasket.lenses}</div>
    <div class="col-md-3">${productInfo.price/100}€</div>
    `
    const btn = document.createElement ("button");
    btn.innerHTML = "Supprimer";
    btn.setAttribute("class", "bg-light text-dark");
    btn.setAttribute("data-id", productInfo._id);

    totalPrice = totalPrice + productInfo.price;      

    ////////// Supprimer un élément du panier //////////
    btn.addEventListener('click', function(e){ 
        const id = e.target.getAttribute("data-id");

        for (let x = 0; x != basketContent.length; x = x + 1){
            if (basketContent[x].id === id){
                basketContent.splice(x, 1);
                break;
            }
        }
        localStorage.setItem("basketContent", JSON.stringify(basketContent)); 
        window.location.href = "panier.html"; 
    });

    productContainer.appendChild(btn);
    container.appendChild(productContainer);

    return totalPrice; //récupère le calcul du prix total (montant du panier + montant du nouveau produit)
}



////////////////////// //////// IMPLEMENTATION DU PANIER  //////////////////////////////////////////

getBasket = async (url) => { //récupération des données par l'URL
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

getBasket("http://localhost:3000/api/cameras/").then(function(response){
   
    const basketContent = JSON.parse(localStorage.getItem("basketContent"));
    const container = document.getElementById("product-basket");
    if (basketContent.length === 0){ 
        emptyBasketMessage(container);
    } else { 
        let totalPrice = 0; 
        for (let productBasket of basketContent){ 
            for (let productInfo of response){ 
                if (productBasket.id === productInfo._id){ 
                    totalPrice = createBasket(container, productInfo, productBasket, basketContent, totalPrice);
                    localStorage.setItem("totalPriceConfirmationPage", totalPrice);
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