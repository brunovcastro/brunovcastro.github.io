

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

