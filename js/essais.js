
function get(){
    fetch ("http://localhost:3000/api/cameras")
    .then (res =>{
        let dataList = res.json();
        return (dataList)
    })
    .then(data => {
        return (data)
    })
    .catch(error => console.log("ERROR"))
}



 function post(){
    fetch ("http://localhost:3000/api/cameras",{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify()
    })
    .then (res =>{
        return res.json ()

    })
    .then(data => console.log (data))
    .catch(error => console.log("ERROR"))
}

function getId(){
    const param = location.search;
    const urlId = param.replace("?id=","");
    return urlId;
}
    