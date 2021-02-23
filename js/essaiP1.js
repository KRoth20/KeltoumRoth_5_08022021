// function addProductsList(){
//         const place = document.getElementById('stock');

//     ///////////////////////////// Création automatiques des cartes ////////////////////////
        
//             addCameras(place,dataList);
// }

// addProductsList()

 function addCameras(place,dataList){
    for (let content in dataList){
        const newCamera = document.createElement('div');
        newCamera.classList.add('items');
        newCamera.innerHTML = 
            '<a href="produit.html?id=' + dataList[content]._id + '">' + '<div class="items__img"><img src=\"' + dataList[content].imageUrl + '\" alt=\"Photo d\'un appareil '+ dataList[content].name + '\"/></div>' + '<div class="items__text">' + '<div class="items-name-price">' + '<h2>' + dataList[content].name + '</h2>' + '<p class="items__price">' + (dataList[content].price/100) + '€</p>' + '</div>' + '<p class="items__description">' + dataList[content].description + '</p>'+ '</div>' + '</a>';
        place.appendChild(newCamera);
    }
}
