///////////////////////// AFFICHAGE DE LA CONFIRMATION DE LA COMMANDE /////////////////////////////////

function addConfirmationText(){
    const confirmationId = localStorage.getItem("orderConfirmation"); // stocke l'ID (N° de commande)récupéré dans le localStorage
    const totalPrice = localStorage.getItem("totalPriceConfirmationPage"); //stocke le prix récupéré dans le localStorage
    //structure HTML
    document.getElementById("confirmation").innerHTML =` 
    <p class="confirmation-title pt-5"> Nous vous remercions pour votre commande n° ${confirmationId}</p>
    <p class="text-center"> Prix total de votre commande: ${totalPrice/100}€</p>`
}

addConfirmationText(); //éxécute l'affichage de la confirmation de commande

