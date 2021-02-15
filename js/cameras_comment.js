////////////////////////////// RECUPERATION DE L'API////////////////////
function get(url){
// Je crée une fonction pour demander à l'API DE RECUPERER les éléments contenus dans l'url du serveur local,
    const promise = new Promise(function(resolve, reject)
    // dans laquelle je crée une constante 'promise', pour obtenir la certitude d'une réponse de l'API dans les 2 cas (ok, ko) 
        {
        const request = new XMLHttpRequest();
        // Celle-ci comporte un objet Ajax qui va contenir notre requête et permette son exécution en mode asynchrone
        request.open("GET", url);
        // puis je demande à ouvrir une connexion avec le service web qui correspond à l'url, en précisant que ma requête HTTP est un GET (récupération de ressources)
        request.onreadystatechange = function(){
        // puis je récupère le résultat (onreadystatechange) en fonction de:
            if (this.readyState === XMLHttpRequest.DONE)
            {
            // si l'élément ciblé est présent et que l'opération est terminée
                if(this.status === 200)
                {
                // et si l'élément ciblé a un code d'erreur de 200 (succès)
                    resolve(JSON.parse(request.responseText));
                    // alors il affiche la réponse du service web en format texte, et la transforme en objet js
                }
                else
                // sinon
                {
                    reject(request.status);
                    // il rejète la requête et il affiche son statut (code erreur)
                }
            }
        };
        request.send(); 
        //j'envoie la requête au service web
        });
    return promise;
    // j'éxécute la fonction
}

// console.log(get("http://localhost:3000/api/cameras"));

///////////////////////////////////////// RENVOI DE L'API //////////////////////////////////////////////////////////
function post(url, jsonBody){
// Je crée une fonction pour demander à l'API d'AFFICHER les éléments contenus dans l'url du serveur local, dans un .json
    const promise = new Promise(function(resolve, reject)
     // dans laquelle je crée une constante 'promise', pour obtenir la certitude d'une réponse de l'API dans les 2 cas (ok, ko) 
    {
        const request = new XMLHttpRequest();
        // Celle-ci comporte un objet Ajax qui va contenir notre requête et permette son exécution en mode asynchrone
        request.open("POST", url);
        // puis je demande à ouvrir une connexion avec le service web qui correspond à l'url, en précisant que ma requête HTTP est un POST (modifier des ressources)
        request.setRequestHeader("Content-Type", "application/json");
        //info obligatoire pour requête entre le open et le send
        request.onreadystatechange = function () 
        // puis je récupère le résultat (onreadystatechange) en fonction de:
        {
            if (this.readyState === 4)
            //si l'élément ciblé est présent et que l'opération correspond à 4 = DONE = terminée
            {
                if(this.status === 201)
                 // et si l'élément ciblé a un code d'erreur de 201 (succès)
                {
                    resolve(JSON.parse(this.responseText));
                    // alors il affiche la réponse du service web en format texte, et la transforme en objet js qui évite au navigateur de parser
                 }else{
                    reject(request.status);
                    //sinon rejète la requête
                }
            }
        };
        request.send(JSON.stringify(jsonBody));
         //j'envoie la requête au service web et lui demande une réponse en texte js
    });
    return promise;
    //j'éxécute la fonction
}

////////////////////////////// AJOUT DES INFOS RECUPEREES DANS LE HTML ////////////////////
function addCameras(responseProduct, place)
// je créé une fonction pour ajouter les produits récupérés (responseproduct) et les implémenter dans le DOM à l'emplacement choisi (place) qui sera indetifié par un getElementsByClassName dans le HTML
{
    const div = document.createElement("div");
    //dans cette fonction je crée d'abord une constante que j'appelle "div", balise div qui accueillera l'ensemble des éléments qui composent le produit (l'image, le link de l'url, la description, le type de lentille et le prix)
    div.innerHTML = responseProduct.name;
    // cette div comprendra un titre/référence en format texte 
    div.setAttribute("class", "col-md-5 product-border mt-5 mb-4 col-sm-6 mr-4 ml-4 border border-dark");
    //et je lui attribue une mise en forme,et je gère le responsive

    const img = document.createElement("img");
    //je crée ensuite une constante que j'appelle "img", blaise img qui accueillera l'image du produit
    img.setAttribute("src", responseProduct.imageUrl);
    //je lui ajoute un lien qui permettra de la télécharger à partir d'un URL
    img.setAttribute("width", "100%");
    //j'attribue une mise en forme à l'image

    const legend = document.createElement("div");
    //je crée ensuite une constante que j'appelle "legend", div qui accueillera la description du produit
    legend.innerHTML = responseProduct.description;
    //dans lequel sera ajouté un texte en semantique HTML qui réprésente la description du produit

    const lenses = document.createElement("p");
     //je crée ensuite une constante que j'apelle "lenses" reliée à l'élément enfant P, p qui accueillera le type de lentille
    lenses.innerHTML = "Choix des optiques: "+ responseProduct.lenses;
     //dans laquelle sera ajouté un texte en semantique HTML qui réprésente les caractéristiques de la lentille,texte précédé de la mention fixe "choix des optiques"
    
    const price = document.createElement("p");
    //je crée ensuite une constante que j'apelle "price" reliée à l'élément enfant P, p qui accueillera le prix du produit
    price.innerHTML = responseProduct.price + "€";
     //dans lequel sera ajouté un texte en semmantique HTML qui réprésente le prix, précédé de la mention fixe "€"

    const link = document.createElement("a");
    //je crée ensuite une constante que j'apelle "link" reliée à l'élément enfant A, a qui accueillera le lien cliquable
    link.setAttribute("href", "produit.html?id=" + responseProduct._id);
    //dans lequel sera ajouté un lien qui contient l'_Id du produit

    
    place[1].appendChild(div);
    //"div" sera placé à l'intérieur de "place" (qui correspond à la 2eme class .row du HTML)
        div.appendChild(link);
        //"link" sera placé dans "div"
            link.appendChild(img);
            //"img " sera placé dans "link"
        div.appendChild(legend);
        //"legend" sera placé dans "div"
        div.appendChild(lenses);
        //"lenses" sera placé dans "div"
        div.appendChild(price);
        //"price" sera placé dans "div"
}

////////////////////////////////////// Ajoute une div //////////////////////////////////////////////////////////
// function addDivToFixDisplay(place){
//     const div = document.createElement("div");
//     div.setAttribute("class", "col-md-5 mt-5 mb-4 ml-4 mr-4");
//     place[1].appendChild(div);
// }
get("http://localhost:3000/api/cameras").then( function(response)

{
    const place = document.getElementsByClassName("row");
    //je créé une constante appelée "place" qui définira l'emplacement choisi à savoir la 2e class "row" dans le HTML

    ///////////////////////////// Création des cardes de présentation des appareils photos ////////////////////////
    for (let i = 0; i < response.length; i = i + 1){   
        addCameras(response[i], place);
    }
    ////////////////////////////////////////Ajoute une div quand le nombre d'élément est impair/////////////////
    ////////////////////modulo 2 = le reste de la division par 2, exemple 3/2 = 1, reste 1
    // if (response.length % 2 === 1){
    //     addDivToFixDisplay(place);
    // }
    
}).catch(function(err){
    console.log(err);
    if(err === 0){ // requete ajax annulée
        alert("serveur HS");
    }
});
        


