"use strict";

////////////// Récupérer dans l'URL l'Id du produit sélectionné //////////////////////////////////////
function getId() {
  var param = location.search;
  var id = param.replace("?id=", ""); // retire ?ID= des paramètres de l'URL, récupère uniquement l'identifiant

  return id;
} ////////// Appeler la fonction de récupération de l'API par ID et implémenter la page HTML avec les données du produit sélectionné //////


function getCamera(url) {
  //fetch (URL) + promises
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (data) {
    var place2 = '<div></div>'; //prépare l'emplacement qui va accueillir l'implémentation automatique des données de la carte sélectionnée

    place2 += "\n            <div class=\"col-12 col-md-5 mx-auto\">\n                <div class=\"card shadow mb-5\">\n                    <a href=\"Produit.html?id=".concat(data._id, "\">\n                    <img class=\"card-img-top\" src=\"").concat(data.imageUrl, "\"></>\n                    </a>\n                    <div class =\"card-body\">\n                    <h3 class=\"card-title\">").concat(data.name, "</h3>\n                    <p class=\"card-text\">").concat(data.description, "</p>\n                    <select id=\"select\">\n                    </select>\n                    <p class=\"card-text\">").concat(data.price / 100, " \u20AC</p>\n                    <button id=\"btn\">Ajouter au panier</button>\n                    </div>\n                </div>\n            </div>\n        ");
    document.getElementById('choix').innerHTML = place2; //intègre dans le HTML l'emplacement de la carte sélectionnée 

    var place3 = '<option>Merci de choisir une option</option>'; // prépare l'emplacement du menu déroulant pour le choix de la lentille

    for (var i = 0; i < data.lenses.length; i = i + 1) {
      //affiche autant de lentilles que présentes sur l'Id sélectionné
      place3 += "<option value=\"".concat(data.lenses[i], "\">").concat(data.lenses[i], "</option>");
      document.getElementById('select').innerHTML = place3; //intègre dans le HTML l'emplacement du menu déroulant 
    }

    var btn = document.getElementById("btn"); //intègre dans le HTML l'emplacement du bouton qui permet de mettre le produit pour le panier avec la lentille sélectionnée

    btn.addEventListener('click', function () {
      var lenses = document.getElementsByTagName("select");
      var lenseSelected = lenses[0].value;
      addToBasket(lenseSelected);
      alert("ajouté au panier"); // ajoute un message d'alerte qui valide l'ajout au panier
    });

    function addToBasket(lenseSelected) {
      //enregistre dans le LocalStorage tous les produits sélectionnés (avec le choix de la lentille) qui représentent le contenu du panier
      var basketContent = JSON.parse(localStorage.getItem("basketContent"));

      if (basketContent === null) {
        basketContent = [];
      }

      var product = new Product(id, lenseSelected);
      basketContent.push(product);
      localStorage.setItem("basketContent", JSON.stringify(basketContent));
    }
  });
}

var id = getId();
getCamera("http://localhost:3000/api/cameras/" + id); // exécute la fonction de récupération de la carte à afficher selon l'Id cliqué