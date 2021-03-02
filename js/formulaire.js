//////////////////////////VALIDATION DES CHAMPS INPUTS//////////////////////////////////////////////

//nom, prénom, ville : lettres uniquement acceptées //
function isAlpha(value){
    return /[a-zA-Z]+/.test(value);
}

// mail : lettres et chiffres acceptés, caractère @ obligatoire//
function validateEmail(value){
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
    return true;
  }
  return false;
}

// adresse : chiffres et/ou lettres acceptés//
function isAdresse(value){
    return /\w+/.test(value);
}

// message d'erreur du formulaire quand les champs ne sont pas correctement remplis //
function checkFormErrors(orderValidity){
    const error = document.getElementById("error"); //crée un emplacement vide dans le HTML pour indiquer l'éventuel message 
    error.innerHTML = "";
    let inputIds = ["name", "firstname", "email", "adresse", "city"]; //crée un tableau avec les id dans un certain ordre
    let inputTexts = ["nom", "prénom", "mail", "adresse", "ville"];// crée un tableau avec le texte en français qui correspond à chaque id dans le même ordre
    for (let i = 0; i < inputIds.length; i = i + 1){//parcourt la liste des inputId par indice
        const input = document.getElementById(inputIds[i]);
        if (input.value === ""){// si input PAS rempli
            const errorMessage = document.createElement("p"); //crée un p
            errorMessage.setAttribute("class", "text-danger");
            errorMessage.innerHTML = "Merci d'indiquer votre " + inputTexts[i];
            orderValidity = false;
            error.appendChild(errorMessage);// ajoute dans l'emplacement "error" le texte prévu + l'inputText correspondant à l'indice
        }else{
            if (inputIds[i] === "name" || inputIds[i] === "firstname" || inputIds[i] === "city"){ 
                if (isAlpha(input.value) === false){ //si input nom,prénom et ville MAL rempli
                    const errorMessage = document.createElement("p");
                    errorMessage.setAttribute("class", "text-warning");
                    errorMessage.innerHTML = "Merci d'écrire votre " + inputTexts[i] + " en toutes lettres";
                    orderValidity = false;
                    error.appendChild(errorMessage);
                }
            }
            if (inputIds[i] === "email"){
                if (validateEmail(input.value) === false){// si input mail mal rempli
                    const errorMessage = document.createElement("p");
                    errorMessage.setAttribute("class", "text-warning");
                    errorMessage.innerHTML = "Merci d'écrire un " + inputTexts[i] + " valide";
                    orderValidity = false;
                    error.appendChild(errorMessage);
                }
            }
            if (inputIds[i] === "adresse"){
                if (isAdresse(input.value) === false){// si input adresse mal rempli
                    const errorMessage = document.createElement("p");
                    errorMessage.setAttribute("class", "text-warning");
                    errorMessage.innerHTML = "Merci d'écrire une " + inputTexts[i] + " valide";
                    orderValidity = false;
                    error.appendChild(errorMessage);
                }
            }
        }
    }
    return orderValidity; //récupère le résultat de la validation
}

// création du bouton "envoyer" qui vérifie la validité des inputs//
const btn = document.getElementById("btn");

btn.addEventListener("click", function(event){
    event.preventDefault();
    let orderValidity = true;
    orderValidity = checkFormErrors(orderValidity);

    if (orderValidity === true){//si les infos contenues dans les inputs sont validées
        sendOrder();//alors lance la requête au serveur
    }
});


//////////////////////////RENVOI DANS UN j.son DES DONNEES CONTENUES DANS L'URL DU LOCALHOST PAR L'API//////////////////////////////////////////////

function post(url, jsonBody){
        return new Promise(function(resolve, reject)
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
        
    }

//////////////////////////// ENVOYER LA REQUETE /////////////////////////////////////////////////
function sendOrder(){
    //format :
    const name = document.getElementById("name").value;
    const firstname = document.getElementById("firstname").value;
    const mail = document.getElementById("email").value;
    const adress = document.getElementById("adresse").value;
    const city = document.getElementById("city").value;  

    const formInformation = new infoForm (name, firstname, mail, adress, city);
    const basketContent = JSON.parse(localStorage.getItem("basketContent"));

    let idOrder = [];
    
    for (let i = 0; i < basketContent.length; i =  i + 1){//pour chaque produit récupéré du LocalStorage on implémente le contenu de la requête
        basketContent[i].id;
        idOrder.push(basketContent[i].id);
    }
    const command = new orderInfo(formInformation, idOrder);
    post("http://localhost:3000/api/cameras/order", command).then( function(response){
        localStorage.setItem("basketContent", JSON.stringify([])); //récupère les éléments dans le localStorage
        localStorage.setItem("orderConfirmation", response.orderId); //prépare le message
        window.location.href = "confirmation.html"; //envoie à la page de confirmation

    }).catch(function(err){ //récupère les exceptions et affiche un message d'erreur
        console.log(err);
        if(err === 0){ 
            alert("serveur HS");
        }
    });
}

