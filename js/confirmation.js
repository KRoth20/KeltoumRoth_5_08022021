/////////////////////////////////////// AFFICHAGE DE LA CONFIRMATION DE LA COMMANDE /////////////////////////////////

function addConfirmationText(){
    const confirmationId = localStorage.getItem("orderConfirmation"); // récupère l'ID (N° de commande)dans le localStorage
    const totalPrice = localStorage.getItem("totalPriceConfirmationPage"); //récupère le prix dans le localStorage
    const confirmation = document.getElementById("confirmation"); //prépare l'emplacement de la confirmation
    const messageConfirmation = document.createElement("p"); //format pour le message
    const confirmationPrice = document.createElement("p"); //format p pour le prix
    messageConfirmation.innerHTML = "Nous vous remercions pour votre commande n° "+ confirmationId;
    confirmationPrice.innerHTML = "Prix total de votre commande: "+ totalPrice/100 + "€";
    messageConfirmation.setAttribute("class", "confirmation-title pt-5")
    confirmation.appendChild(messageConfirmation);
    confirmation.appendChild(confirmationPrice);
}

addConfirmationText(); //éxécute l'affichage de la confirmation de commande

