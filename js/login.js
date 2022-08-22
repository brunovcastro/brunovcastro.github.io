var nombre = document.getElementById("usuario"); //variable para usuario//
var contraseña = document.getElementById("contraseña"); //variable para contraseña//
const button = document.getElementById("acceso");  //variable para el boton acceder//


//evento de validacion para button//
button .addEventListener('click', (e)=>{
    e.preventDefault()
    const delta = {nombre:nombre.value, contraseña:contraseña.value}
    validación()
});


//funcion login que recoge los datos y me manda al index//
function login(){
    if(nombre.value == "Bruno" && contraseña.value == "1234"){
       
        alert("sesión iniciada");
        window.location = "index.html";
       
    } else{
        alert("usuario o contraseña incorrecta");
    }

}






