////////////////////////////// RECUPERATION DE L'API////////////////////
function get(url){
    // Je crée une fonction pour demander à l'API DE RECUPERER les éléments contenus dans l'url du serveur local,
        const promise = new Promise(function(resolve, reject)
            {
            const request = new XMLHttpRequest();
            request.open("GET", url);
            request.onreadystatechange = function(){
                if (this.readyState === XMLHttpRequest.DONE)
                {
                    if(this.status === 200)
                    {
                        resolve(JSON.parse(request.responseText));
                    }
                    else
                    {
                        reject(request.status);
                    }
                }
            };
            request.send(); 
            });
        return promise;
    }
    
    // console.log(get("http://localhost:3000/api/cameras"));
    
    ///////////////////////////////////////// RENVOI DE L'API //////////////////////////////////////////////////////////
    function post(url, jsonBody){
    // Je crée une fonction pour demander à l'API d'AFFICHER les éléments contenus dans l'url du serveur local, dans un .json
        const promise = new Promise(function(resolve, reject)
        {
            const request = new XMLHttpRequest();
            request.open("POST", url);
            request.setRequestHeader("Content-Type", "application/json");
            request.onreadystatechange = function () 
            {
                if (this.readyState === 4)
                {
                    if(this.status === 201)
                    {
                        resolve(JSON.parse(this.responseText));
                     }else{
                        reject(request.status);
                    }
                }
            };
            request.send(JSON.stringify(jsonBody));
        });
        return promise;
    }
    
    ////////////////////////////// AJOUT DES INFOS RECUPEREES DANS LE HTML ////////////////////
    function addCameras(responseProduct, place)
    // je créé une fonction pour ajouter les produits récupérés (responseproduct) et les implémenter dans le DOM à l'emplacement choisi (place) qui sera indetifié par un getElementsByClassName dans le HTML
    {
        const div = document.createElement("div");
        div.innerHTML = responseProduct.name;
        div.setAttribute("class", "col-md-5 product-border mt-5 mb-4 col-sm-6 mr-4 ml-4 border");
    
        const img = document.createElement("img");
        img.setAttribute("src", responseProduct.imageUrl);
        img.setAttribute("width", "100%");
    
        const legend = document.createElement("div");
        legend.innerHTML = responseProduct.description;
    
        const lenses = document.createElement("p");
        lenses.innerHTML = "Choix des optiques: "+ responseProduct.lenses;
        
        const price = document.createElement("p");
        price.innerHTML = responseProduct.price + "€";
    
        const link = document.createElement("a");
        link.setAttribute("href", "zoom.html?id=" + responseProduct._id);
    
        
        place.appendChild(div);
            div.appendChild(link);
                link.appendChild(img);
            div.appendChild(legend);
            div.appendChild(lenses);
            div.appendChild(price);
    }
    
    get("http://localhost:3000/api/cameras").then( function(response)
    
    {
        const place = document.getElementById("stock");

    ///////////////////////////// Création automatiques des cartes ////////////////////////
        for (let i = 0; i < response.length; i = i + 1){   
            addCameras(response[i], place);
        }

    ///////////////////////////// Vérification erreur ////////////////////////
    
    }).catch(function(err){
        console.log(err);
        if(err === 0){ // requete ajax annulée
            alert("serveur HS");
        }
    });
            
    
    
    