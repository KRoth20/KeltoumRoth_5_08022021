    ////////////////////////////// AJOUT DES INFOS RECUPEREES DANS LE HTML ////////////////////
    
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
                        <p class="card-text">Optiques : ${camera.lenses}</p>
                        <p class="card-text">${camera.price/100}  €</p>
                    </div>
                </div>
            </div>
            `;
        })
        document.getElementById('stock').innerHTML = place;
        })
    }
    
    get("http://localhost:3000/api/cameras") 
            
    
    