

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_ASC_BY_PRICE = "$";
const ORDER_DESC_BY_PRICE = "$$";
const ORDER_DESC_BY_SOLD = "REL";
let FiltroArray = [];
let min = 0;
let max = 0;
 

function comparacion(a, b) {
    return a.name.localeCompare(b.name)
}
 
function sortAndShowCategories(criterio, array){
    if (criterio === ORDER_ASC_BY_NAME) {
        FiltroArray = array.sort(comparacion)
    }
    else if (criterio === ORDER_DESC_BY_NAME) {
             FiltroArray = array.reverse(comparacion)
    }
    if (criterio === ORDER_ASC_BY_PRICE) {
        FiltroArray = array.sort((a, b) => {return a.cost - b.cost})
    }
    else if (criterio === ORDER_DESC_BY_PRICE) {
        FiltroArray = array.sort((a, b) => {return b.cost - a.cost})
    }
    else if (criterio === ORDER_DESC_BY_SOLD) {
        FiltroArray = array.sort((a, b) => {return b.soldCount - a.soldCount})
    }

        document.getElementById("info").innerHTML = " ";
        showinfo(FiltroArray);
        
}


        document.getElementById("sortByNameAsc").addEventListener("click", function () {
            sortAndShowCategories(ORDER_ASC_BY_NAME, FiltroArray);
        });  
        
        document.getElementById("sortByNameDesc").addEventListener("click", function () {
            sortAndShowCategories(ORDER_DESC_BY_NAME, FiltroArray);
        });

        document.getElementById("sortByPriceAsc").addEventListener("click", function () {
            sortAndShowCategories(ORDER_ASC_BY_PRICE, FiltroArray);
        });

        document.getElementById("sortByPriceDesc").addEventListener("click", function () {
            sortAndShowCategories(ORDER_DESC_BY_PRICE, FiltroArray);
        });

        document.getElementById("sortByRelevance").addEventListener("click", function () {
            sortAndShowCategories(ORDER_DESC_BY_SOLD, FiltroArray);
        });

        document.getElementById("rangeFilterCount").addEventListener("click", function () {
            min = document.getElementById("rangeFilterCountMin").value;
            max = document.getElementById("rangeFilterCountMax").value;
            document.getElementById("info").innerHTML = ""
            showinfo(FiltroArray)
        });
    
        document.getElementById("clearRangeFromFilterCount").addEventListener("click", function () {
            min = document.getElementById("rangeFilterCountMin").value = "";
            max = document.getElementById("rangeFilterCountMax").value = "";
            document.getElementById("info").innerHTML = ""
            showinfo(FiltroArray)
        });


    document.addEventListener("DOMContentLoaded", function(a) {
        fetch(PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE) // parte 1
            .then( respuesta => respuesta.json() )  
            .then( data => {
                 FiltroArray = data.products;
                 showinfo(FiltroArray);
            })
        })     
    


    function showinfo(array){
        array.forEach(element => {
            if (((min == 0) || (parseInt(element.cost) >= min)) &&
                ((max == 0) || (parseInt(element.cost) <= max))) {

            var elementHTML = ` <div onclick="setProducts(${element.id})" class="list-group-item list-group-item-action">
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
                }
        });
    
    }

   
 /*function searchAndFilter() {
 
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

function setProducts(id){
    localStorage.setItem("ProdID", id);
    window.location.href = "product-info.html";
}

function showinfo(array){
    array.forEach(element => {
        var elementHTML = ` <div onclick="setProducts(${element.id})" class="list-group-item list-group-item-action">
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
