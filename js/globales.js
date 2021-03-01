////////////////////////////// RECUPERATION DE L'API////////////////////
// function get(url){
//     // Je crée une fonction pour demander à l'API DE RECUPERER les éléments contenus dans l'url du serveur local,
//         return new Promise(function(resolve, reject)
//             {
//             const request = new XMLHttpRequest();
//             request.open("GET", url);
//             request.onreadystatechange = function(){
//                 if (this.readyState === XMLHttpRequest.DONE)
//                 {
//                     if(this.status === 200)
//                     {
//                         resolve(JSON.parse(request.responseText));
//                     }
//                     else
//                     {
//                         reject(request.status);
//                     }
//                 }
//             };
//             request.send(); 
//             });
//     }
    
    // console.log(get("http://localhost:3000/api/cameras"));
    
    ///////////////////////////////////////// RENVOI DE L'API //////////////////////////////////////////////////////////
    function post(url, jsonBody){
    // Je crée une fonction pour demander à l'API de RENVOYER les éléments contenus dans l'url du serveur local, dans un .json
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