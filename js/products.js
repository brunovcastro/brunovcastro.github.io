//const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let PRODUCTS_API = PRODUCTS_URL + localStorage.getItem('catID') + '.json'
let productList = ""
let catNames = { 101: 'Autos',102: "Juguetes",103: "Muebles", 104: "Herramientas",105: "Computadoras",10: "Vstimenta",107:"Electrodomesticos",10:"Deporte", 109: "Celulares"
 };
 
 let rangeMin = document.getElementById("CountMin")
 let rangeMax = document.getElementById("CountMax")
 
 
 
 
 function searchAndFilter() {
 
     let filteredProducts = productList;
 
     if (rangeMin.value != "") {
         filteredProducts = filteredProducts.filter(element => element.cost > rangeMin.value)
 
     }
 
 
 
     if (rangeMax.value != "") {
         filteredProducts = filteredProducts.filter(element=>
             element.cost < rangeMax.value)
     }
 

 
     showProducts(filteredProducts)
 
 }
 




//Funciones ASC-DESC//

//DSC//

function sortByPriceDesc(a,b){

    return a.cost -  b.cost 

}
//ASC//

function sortByPriceAsc(a,b){

    return b.cost -  a.cost 

}
//More action//


function productSortMore(){

showinfo(productList.sort(sortByPriceDesc));


}


function productSortLess() {

    showinfo(productList.sort(sortByPriceAsc));
    
    
    }

    



//funcion que cargará los datos obtenidos:
fetch(PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE) // parte 1
.then( respuesta => respuesta.json() )  
.then( data => {
    const ArrayDatos = data;
    showinfo(ArrayDatos.products);
} )

function showinfo(array){
    array.forEach(element => {
        var elementHTML = ` <div class="list-group-item list-group-item-action">
                                <div class="row">
                                    <div class="col-3">
                                        <img src="${element.image}" alt="auto-gerico" class="img-thumbnail">  
                                    </div>   
                                    <div class="col">
                                        <div class="d-flex w-100 justify-content-between">
                                            <div>
                                                <h4>${element.name} - ${element.currency} ${element.cost}</h4>
                                                <p>${element.description}</p>
                                            </div>
                                            <small>${element.soldCount} vendidos</small>
                                        </div>
                                    </div>
                                </div>  
                            </div> `
         document.getElementById("info").innerHTML += elementHTML;
            catText();
    });

}




function catText(){
    document.getElementById("catName").innerText = catNames[localStorage.getItem('catID')]
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_API).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productList = resultObj.data.products;
            console.log(productList);
            
        }
    });

});


document.getElementById("CountMin").addEventListener('input', searchAndFilter);
document.getElementById("CountMax").addEventListener('input', searchAndFilter);




/*<img src " ${product.img}" alt= "product image" class="img-thumbnail">
</div>
  <div class="col">
     <div class="d-flex w-100 justify-content-between">
       <div class="mb-1">
          <h4> `+ product.name+` </h4>
          <p> `+ product.description +` </p>
          <br> <br>
             <h3 class="mb-1"> $` + product.cost + ` ` + product.currency + ` </h3>
             </div>

             <small class="text-muted"> ` + product.soldCount + ` vendidos </small>*/ 
