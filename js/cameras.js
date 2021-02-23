    ////////////////////////////// AJOUT DES INFOS RECUPEREES DANS LE HTML ////////////////////
    // function addCameras(responseProduct, place)
    // // je créé une fonction pour ajouter les produits récupérés (responseproduct) et les implémenter dans le DOM à l'emplacement choisi (place) qui sera indetifié par un getElementsByClassName dans le HTML
    // {
    //     const div = document.createElement("div");
    //     div.innerHTML = responseProduct.name;
    //     div.setAttribute("class", "col-md-5 product-border mt-5 mb-4 col-sm-6 mr-4 ml-4 border");
    
    //     const img = document.createElement("img");
    //     img.setAttribute("src", responseProduct.imageUrl);
    //     img.setAttribute("width", "100%");
    
    //     const legend = document.createElement("div");
    //     legend.innerHTML = responseProduct.description;
    
    //     const lenses = document.createElement("p");
    //     lenses.innerHTML = "Choix des optiques: "+ responseProduct.lenses;
        
    //     const price = document.createElement("p");
    //     price.innerHTML = responseProduct.price + "€";
    
    //     const link = document.createElement("a");
    //     link.setAttribute("href", "zoom.html?id=" + responseProduct._id);
    
    //     place.appendChild(div);
    //         div.appendChild(link);
    //             link.appendChild(img);
    //         div.appendChild(legend);
    //         div.appendChild(lenses);
    //         div.appendChild(price);
    // }
        
    function get(){
        fetch ("http://localhost:3000/api/cameras")
        .then (res =>{
            let dataList = res.json();
            return (dataList)
        })
        .then(data => {
            return (data)
        })
        .catch(error => console.log("ERROR"))
    }
    get("http://localhost:3000/api/cameras").then( function(response){
        const place = document.getElementById("stock");
    
        function addCameras(place,dataList){
        for (let content in dataList){
            const newCamera = document.createElement('div');
            newCamera.classList.add('items');
            newCamera.innerHTML = 
                '<a href="produit.html?id=' + dataList[content]._id + '">' + '<div class="items__img"><img src=\"' + dataList[content].imageUrl + '\" alt=\"Photo d\'un appareil '+ dataList[content].name + '\"/></div>' + '<div class="items__text">' + '<div class="items-name-price">' + '<h2>' + dataList[content].name + '</h2>' + '<p class="items__price">' + (dataList[content].price/100) + '€</p>' + '</div>' + '<p class="items__description">' + dataList[content].description + '</p>'+ '</div>' + '</a>';
        place.appendChild(newCamera);
        }
    }
    addCameras()
        ///////////////////////////// Création automatiques des cartes ////////////////////////
        // for (let i = 0; i < response.length; i = i + 1){   
        //     addCameras(response[i], place);
        // }

    ///////////////////////////// Vérification erreur ////////////////////////
    
    }).catch(function(err){
        console.log(err);
        if(err === 0){ // requete ajax annulée
            alert("serveur HS");
        }
    });
            
    
    
    