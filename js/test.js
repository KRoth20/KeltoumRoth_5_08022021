////////////////////////////// RECUPERATION DE L'API////////////////////
get function (url){
    const = new Promise (resolve,reject)
    const request = XMLHttpRequest();
    request.open (GET,url);
    request.onreadystatechange {
        if{ 
            this.XMLHttpRequest === 
        }
    }

}   
           
            // puis je récupère le résultat (onreadystatechange) en fonction de:
                // si l'élément ciblé est présent et que l'opération est terminée
                    // et si l'élément ciblé a un code d'erreur de 200 (succès)
                        // alors il affiche la réponse du service web en format texte, et la transforme en objet js
                    // sinon
                        // il rejète la requête et il affiche son statut (code erreur)
            //j'envoie la requête au service web        // j'éxécute la fonction
    
    // console.log(get("http://localhost:3000/api/cameras"));
    
    ///////////////////////////////////////// RENVOI DE L'API //////////////////////////////////////////////////////////
    // Je crée une fonction pour demander à l'API d'AFFICHER les éléments contenus dans l'url du serveur local, dans un .json
         // dans laquelle je crée une constante 'promise', pour obtenir la certitude d'une réponse de l'API dans les 2 cas (ok, ko) 
            // Celle-ci comporte un objet Ajax qui va contenir notre requête et permette son exécution en mode asynchrone
            // puis je demande à ouvrir une connexion avec le service web qui correspond à l'url, en précisant que ma requête HTTP est un POST (modifier des ressources)
            //info obligatoire pour requête entre le open et le send
            // puis je récupère le résultat (onreadystatechange) en fonction de:
                //si l'élément ciblé est présent et que l'opération correspond à 4 = DONE = terminée
                     // et si l'élément ciblé a un code d'erreur de 201 (succès)
                        // alors il affiche la réponse du service web en format texte, et la transforme en objet js qui évite au navigateur de parser
                        //sinon rejète la requête
             //j'envoie la requête au service web et lui demande une réponse en texte js
        //j'éxécute la fonction
    
    ////////////////////////////// AJOUT DES INFOS RECUPEREES DANS LE HTML ////////////////////
    // je créé une fonction pour ajouter les produits récupérés (responseproduct) et les implémenter dans le DOM à l'emplacement choisi (place) qui sera indetifié par un getElementsByClassName dans le HTML
        //dans cette fonction je crée d'abord une constante que j'appelle "div", balise div qui accueillera l'ensemble des éléments qui composent le produit (l'image, le link de l'url, la description, le type de lentille et le prix)
        // cette div comprendra un titre/référence en format texte 
        //et je lui attribue une mise en forme,et je gère le responsive
    
        //je crée ensuite une constante que j'appelle "img", blaise img qui accueillera l'image du produit
        //je lui ajoute un lien qui permettra de la télécharger à partir d'un URL
        //j'attribue une mise en forme à l'image
    
        //je crée ensuite une constante que j'appelle "legend", div qui accueillera la description du produit
        //dans lequel sera ajouté un texte en semantique HTML qui réprésente la description du produit
    
         //je crée ensuite une constante que j'apelle "lenses" reliée à l'élément enfant P, p qui accueillera le type de lentille
         //dans laquelle sera ajouté un texte en semantique HTML qui réprésente les caractéristiques de la lentille,texte précédé de la mention fixe "choix des optiques"
        
        //je crée ensuite une constante que j'apelle "price" reliée à l'élément enfant P, p qui accueillera le prix du produit
         //dans lequel sera ajouté un texte en semmantique HTML qui réprésente le prix, précédé de la mention fixe "€"
    
        //je crée ensuite une constante que j'apelle "link" reliée à l'élément enfant A, a qui accueillera le lien cliquable
        //dans lequel sera ajouté un lien qui contient l'_Id du produit
    
        
        //"div" sera placé à l'intérieur de "place" (qui correspond à la 2eme class .row du HTML)
            //"link" sera placé dans "div"
                //"img " sera placé dans "link"
            //"legend" sera placé dans "div"
            //"lenses" sera placé dans "div"
            //"price" sera placé dans "div"
    }
    
    ////////////////////////////////////// Ajoute une div //////////////////////////////////////////////////////////
    // function addDivToFixDisplay(place){
    //     const div = document.createElement("div");
    //     div.setAttribute("class", "col-md-5 mt-5 mb-4 ml-4 mr-4");
    //     place[1].appendChild(div);
    // }    
        //je créé une constante appelée "place" qui définira l'emplacement choisi à savoir la 2e class "row" dans le HTML
    
        ///////////////////////////// Création des cardes de présentation des appareils photos ////////////////////////
        ////////////////////////////////////////Ajoute une div quand le nombre d'élément est impair/////////////////
        ////////////////////modulo 2 = le reste de la division par 2, exemple 3/2 = 1, reste 1
        // if (response.length % 2 === 1){
        //     addDivToFixDisplay(place);
        // }
        
            
    
    
    