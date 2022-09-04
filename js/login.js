
var nombre = document.getElementById("user"); //variable para usuario//
var contraseña = document.getElementById("password"); //variable para contraseña//
const button = document.getElementById("acceso");  //variable para el boton acceder//


//evento de validacion para button//
button .addEventListener('click', (e)=>{
    e.preventDefault()
    const delta = {nombre:nombre.value, contraseña:contraseña.value}
   
});


//funcion login que recoge los datos y me manda al index//
function login(){
    if(nombre.value == "Ingresar" && contraseña.value == null){
       
        window.location = "index.html";
       
    } 

}



function entrar()

{
const usu = document.getElementById('user').value;
const pass = document.getElementById('password').value;
console.log(usu, pass);

    if(usu == "Bruno Castro" && pass == "1234"){
       
        alert("Bienvenido Bruno Castro");
        window.location = "index.html";
        localStorage.usuario = usu
       
    } else{
        alert("Datos incorrectos, prueba con usuario: Bruno Castro y contraseña: 1234");
    }

}




