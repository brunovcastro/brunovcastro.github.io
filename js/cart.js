const USER_25801 = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
const cartProducts = document.getElementById("cartProducts");
let products = [];
let porcentaje = 0 ;




//Funcion que se encarga de crear todos los elementos HTML correspondientes a partir de los productos dentro del carrito de compras.
const showCartProducts = (product) => {
	const tr = document.createElement("tr");

	tr.innerHTML = `
		<th scope="row"><img src="${product.image}" width="70px" alt="Imagen del producto ${product.name}" /></th>
		<td>${product.name}</td>
		<td >${product.currency} ${product.unitCost}</td>
		<td><input class="inputCart" type="number" value="${product.count}"  id="countInput" min="0"/></td>
		<td class="tdSubTotal col-2" id="subtotal">${product.currency} ${product.unitCost}</td>
	`;

	cartProducts.appendChild(tr);
	const input = tr.querySelector("input");

	//Agrego el evento dentro del input para que cuando sea modificado tambien se modifique el campo del subtotal.
	input.addEventListener("input", () => {
		tr.querySelector(".tdSubTotal").innerHTML = `${product.currency} ${Number(input.value) * product.unitCost}`;
	});
};

document.addEventListener("DOMContentLoaded", (e) => {
	document.getElementById("infoProducts").innerHTML;

	//Obtenemos los datos del carrito de compras para mostrarlos mediante elementos HTML.
	getJSONData(USER_25801).then((resultObj) => {
		if (resultObj.status === "ok") {
			const userCartProducts = [...resultObj.data.articles, ...products];
			userCartProducts.forEach((product) => showCartProducts(product));
		}
	});
});


///////////////////////////////////////////////////////////////////////////////////////////////////


let button = document.getElementById("button");
let calle = document.getElementById("street");
let numero = document.getElementById("number");
let esquina = document.getElementById("Int");


let check = document.getElementById("terminos");
let btncheck = document.getElementById("btnCheck");


function validData(dato) {
    if (dato.value.length == 0) {
        dato.classList.add("is-invalid")
    }
    else { 
        dato.classList.add("is-valid")
    }
}

function validPassword() {

    if (pass1.value.length < 6) {
        pass1.classList.add("is-invalid")
    }
    else {
        pass1.classList.add("is-valid")
    }

    if (pass2.value == pass1.value && pass1.value.length >= 6) {
        pass2.classList.add("is-valid")
    }
    else {
        pass2.classList.add("is-invalid")
    }

}

function validCheck() {
    if (check.checked == false) {
        btncheck.classList.add("is-invalid")
        btncheck.style.color = "red"
        check.classList.add("is-invalid")
    }
    else {
        btncheck.classList.add("is-valid")
        check.classList.add("is-valid")
        btncheck.style.color = "green"
    }
}



function validaDataInput(input) {
    validData(input);
    input.addEventListener("input", () => {
        input.classList.remove("is-valid")
        input.classList.remove("is-invalid")
        validData(input);
    });
}



function validaBtnCheck() {
    validCheck()
    check.addEventListener("change", () => {  
        check.classList.remove("is-invalid")
        check.classList.remove("is-valid")
        btncheck.classList.remove("is-invalid")
        btncheck.classList.remove("is-valid")
        validCheck()
    });
}

button.addEventListener("click", () => {
    validaDataInput(calle);
    validaDataInput(numero);
    validaDataInput(esquina);
    
    validaBtnCheck();

});

















/*document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            console.log(resultObj); 
            cart = resultObj.data
            console.log(cart);
    
            articulo = cart.articles;
            console.log(articulo);
    
            let htmlContentToAppend = ""; 
            for(let i=0; i < articulo.length; i++){
            let article = articulo[i];
            htmlContentToAppend += `
           <div class="row">
          
            <p class="col"><img src="` + article.src + `" class="img-thumbnail"></p>
            <p class="col">`+ article.name +`</p>
            <p class="col" id="unitCost">` + article.currency + ` ` + article.unitCost + `</p>
            
            <p class="col"><input type="number" class="form-control" min= 0 name="cantidad" value="`+ article.count + `" id="countInput"></input></p>
            <div class="invalid-feedback">
                    El número de artículos debe ser mayor a 0.
                  </div>
            <p class="col"><span id="subtotal">` + article.currency + ` ` + article.unitCost * article.count + `</span></p>
            
            
            </div>
            <hr>
            
            
            `;
            document.getElementById("cart").innerHTML = htmlContentToAppend;
        document.getElementById("subtotal-to-show").innerHTML += article.unitCost * article.count;

        }
        
    };
//Calculo el subtotal a pagar
        function showSubtotal(){
            for(let i=0; i < articulo.length; i++){
                let article = articulo[i];
                console.log(articulo)
            let cantidad =  document.getElementById("countInput").value;
            let subtotalHTML = document.getElementById("subtotal");
            let subtotalToShow = Math.round(article.unitCost * cantidad);

            subtotalHTML.innerHTML = article.currency + " " + subtotalToShow ;   
        };
        };
//Calculo el total y el subtotal a pagar
        function SubtotalYTotal(){
            for(let i=0; i < articulo.length; i++){
                
            let article = articulo[i];
            let cantidad =  document.getElementById("countInput").value;
            let unitProductCostHTML = document.getElementById("subtotal-to-show");
            let unitCostToShow = Math.round(article.unitCost * cantidad);
            
            unitProductCostHTML.innerHTML = article.currency + " " + unitCostToShow;
           
        }; 
    };
//Calculo costo del envío
    function calcularEnvio() {
        for(let i=0; i < articulo.length; i++){
            let article = articulo[i];
            
        let costoEnvioHTML = document.getElementById("envio");
        let totalCostHTML = document.getElementById("totalCost");
        let cantidad =  document.getElementById("countInput").value;

        let unitCostToShow = Math.round(article.unitCost * cantidad);
        let costoEnvio = Math.round(unitCostToShow * porcentaje);

         costoEnvioHTML.innerHTML = article.currency + " " + costoEnvio;

         

         totalCostHTML.innerHTML = article.currency + " " + Math.round(unitCostToShow + costoEnvio);
        };
        };

    //Eventos change para subtotal
        document.getElementById("countInput").addEventListener("change", function(){
            showSubtotal();
            
        });

        document.getElementById("countInput").addEventListener("change", function(){
            SubtotalYTotal();
        });

    //Para envío
    document.getElementById("premium").addEventListener("change", function(){
        porcentaje = 0.15;
        calcularEnvio();
    });
    
    document.getElementById("express").addEventListener("change", function(){
        porcentaje = 0.07;
        calcularEnvio();
    });

    document.getElementById("estandar").addEventListener("change", function(){
        porcentaje = 0.05;
        calcularEnvio();
    });
      
});
//VALIDACIONES 
document.getElementById("finalizarCompra").addEventListener("click", function() {
    
    var cant = document.getElementById("countInput").value
    var tarj = document.getElementById("tarjeta").checked == false;
    var transf = document.getElementById("transferencia").checked == false;
    var efec = document.getElementById("efectivo").checked == false;
    var pre = document.getElementById("premium").checked == false;
    var exp = document.getElementById("express").checked == false;
    var stan = document.getElementById("estandar").checked == false;

    if (cant < 1 || tarj ^ transf ^ efec || pre ^ exp ^ stan) {
        alert("¡Ha ocurrido un error! verifica que todos los pasos se hayan completado ") }
        else 
        { Swal.fire({
            title: "¡Su compra ha sido procesada con éxito!",
            icon: "success"
        }); 
    
    };

});
});*/