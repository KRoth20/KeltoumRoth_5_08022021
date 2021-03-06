//////////////////////////VALIDATION DES CHAMPS INPUTS//////////////////////////////////////////////

//nom, prénom, ville : lettres uniquement acceptées //
function isAlpha(value){
    return /[a-zA-Z]+/.test(value);
}

// mail : lettres et chiffres acceptés, caractère @ obligatoire//
function isEmail(value){
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
    return true;
  }
  return false;
}

// adresse : chiffres et/ou lettres acceptés//
function isAdresse(value){
    return /^([0-9]{1,})[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,}$/.test(value);
}

// message d'erreur du formulaire quand les champs ne sont pas correctement remplis //
function checkFormErrors(orderValidity){
    const error = document.getElementById("error"); 
    error.innerHTML = "";
    let inputIds = ["name", "firstname", "email", "adresse", "city"]; 
    let inputTexts = ["nom", "prénom", "mail", "adresse", "ville"];
    
    for (let i = 0; i < inputIds.length; i = i + 1){ 
        const input = document.getElementById(inputIds[i]);
        if (input.value === ""){ 
            error.innerHTML += `<p class="text-danger"> Merci d'indiquer votre ${inputTexts[i]}</p>` 
            orderValidity = false;
            
        }else{
            if (inputIds[i] === "name" || inputIds[i] === "firstname" || inputIds[i] === "city"){ 
                if (isAlpha(input.value) === false){ 
                    error.innerHTML += `<p class="text-warning"> Merci d'écrire votre ${inputTexts[i]} en toutes lettres</p>`
                    orderValidity = false;
                }
            }
            if (inputIds[i] === "email"){
                if (isEmail(input.value) === false){
                    error.innerHTML += `<p class="text-warning"> Merci d'écrire un ${inputTexts[i]} valide</p>`
                    orderValidity = false;
                }
            }
            if (inputIds[i] === "adresse"){
                if (isAdresse(input.value) === false){
                    error.innerHTML += `<p class="text-warning"> Merci d'écrire une ${inputTexts[i]} valide</p>`
                    orderValidity = false;
                }
            }
        }
    }
    return orderValidity; //récupère le résultat de la validation
}

// création du bouton "envoyer" qui vérifie la validité des inputs//
const btn = document.getElementById("btn");

btn.addEventListener("click", function(event){
    event.preventDefault();//pour ne pas changer de page en cas d'erreur
    let orderValidity = true;
    orderValidity = checkFormErrors(orderValidity);

    if (orderValidity === true){
        sendOrder();
    }
});


//////////////////////////RENVOI DANS UN j.son DES DONNEES A L'API//////////////////////////////////////////////

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
    //structure pour le HTML ://
    const name = document.getElementById("name").value;
    const firstname = document.getElementById("firstname").value;
    const mail = document.getElementById("email").value;
    const adress = document.getElementById("adresse").value;
    const city = document.getElementById("city").value;  
    //stocke les infos du formulaire 
    const formInformation = new infoForm (name, firstname, mail, adress, city);
    //rappelle les infos contenus dans le panier
    const basketContent = JSON.parse(localStorage.getItem("basketContent"));
    //contenant vide de la commande à implémenter
    let idOrder = [];
    
    for (let i = 0; i < basketContent.length; i =  i + 1){ //
        basketContent[i].id;
        idOrder.push(basketContent[i].id);
    }
    const command = new orderInfo(formInformation, idOrder); //stocke les infos du formulaire + les infos de la commande
    post("http://localhost:3000/api/cameras/order", command).then( function(response){
        localStorage.setItem("basketContent", JSON.stringify([])); 
        localStorage.setItem("orderConfirmation", response.orderId); 
        window.location.href = "confirmation.html"; 

    }).catch(function(err){ //récupère les exceptions et affiche un message d'erreur
        console.log(err);
        if(err === 0){ 
            alert("serveur HS");
        }
    });
}

