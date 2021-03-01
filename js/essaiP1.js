// function addProductsList(){
//         const place = document.getElementById('stock');

//     ///////////////////////////// Création automatiques des cartes ////////////////////////
        
//             addCameras(place,dataList);
// }

// addProductsList()

//  function addCameras(place,dataList){
//     for (let content in dataList){
//         const newCamera = document.createElement('div');
//         newCamera.classList.add('items');
//         newCamera.innerHTML = 
//             '<a href="produit.html?id=' + dataList[content]._id + '">' + '<div class="items__img"><img src=\"' + dataList[content].imageUrl + '\" alt=\"Photo d\'un appareil '+ dataList[content].name + '\"/></div>' + '<div class="items__text">' + '<div class="items-name-price">' + '<h2>' + dataList[content].name + '</h2>' + '<p class="items__price">' + (dataList[content].price/100) + '€</p>' + '</div>' + '<p class="items__description">' + dataList[content].description + '</p>'+ '</div>' + '</a>';
//         place.appendChild(newCamera);
//     }
// }

function get(url){
    fetch (url)
    .then ((res) => res.json())
    .then((data) => {
        let place = '<div></div>';
    data.forEach(function(camera){
        place += `
        <div class="col-12 col-md-5 mx-auto">
            <div class="card shadow mb-5">
                <a href="zoom.html?id=${camera._id}">
                <img class="card-img-top" src="${camera.imageUrl}"></>
                </a>
                <div class="card-body">
                    <h3 class="card-title">${camera.name}</h3>
                    <p class="card-text">${camera.description}</p>
                    <p class="card-text">Choix des optiques : ${camera.lenses}</p>
                    <p class="card-text">${camera.price} €</p>
                </div>
            </div>
        </div>
        `;
    })
    document.getElementById('stock').innerHTML = place;
    })
}

get("http://localhost:3000/api/cameras") 
        
