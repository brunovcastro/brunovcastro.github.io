const USER_25801 = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
const cartProducts = document.getElementById("cartProducts");
let products = [];

//Funcion que se encarga de crear todos los elementos HTML correspondientes a partir de los productos dentro del carrito de compras.
const showCartProducts = (product) => {
	const tr = document.createElement("tr");

	tr.innerHTML = `
		<th scope="row"><img src="${product.image}" width="70px" alt="Imagen del producto ${product.name}" /></th>
		<td>${product.name}</td>
		<td >${product.currency} ${product.unitCost}</td>
		<td><input class="inputCart" type="number" value="${product.count}" min="0"/></td>
		<td class="tdSubTotal col-2">${product.currency} ${product.unitCost}</td>
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
