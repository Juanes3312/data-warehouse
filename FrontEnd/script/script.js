let iptNombre = document.getElementById("inputNombre");
let iptPassword = document.getElementById("inputPassword");
let btnIngresar = document.getElementById("btnIngresar");
let storageLocal = JSON.parse(sessionStorage.getItem("key"));
let cajaLogin = document.getElementById('login');
let container1 = document.getElementById("container1");
let container2 = document.getElementById("container2");
//console.log(storageLocal)
let headerx = document.getElementsByName("navbar")[0]
let usuariosHeader = document.getElementById("usuariosHeader")
console.log(headerx)
if(storageLocal== null){
  cajaLogin.classList.remove("display-none")
  container1.classList.add("display-none")
  container2.classList.add("display-none")
  headerx.classList.add("blur");
}else{

}



// login 
function Login(nombre, password){
    const Usuario= {
        "nombre": nombre,
        "password" : password
      }
      const parametros = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Usuario),
        json: true,
      }
      console.log(parametros.body);
      fetch(`http://localhost:4000/login`, parametros)
        .then(response => response.json())
        .then((data) => {
          console.log(data, " soy data");
          alertify.message('Bienvenido ' + nombre)
          let mensaje = document.getElementsByClassName("ajs-message")[0];
          mensaje.style.background = "#1D72C2"
          mensaje.style.color = "white";
          console.log(data.token, "soy data.token")
          sessionStorage.setItem("key", JSON.stringify(data.token));
          setTimeout(function(){
            cajaLogin.classList.add("display-none")
            container1.classList.remove("display-none")
            container2.classList.remove("display-none")
            headerx.classList.remove("blur")
        },2000);
        if(data.admin == 0){
          usuariosHeader.classList.add("display-none")
        }
        })
        .catch(error => {
          console.log(error)
        })
}

async function fetchContactos(){
  let url = 'http://localhost:4000/contactos';
  let response = await fetch(url);
  let json = await response.json();
  console.log(json)
  return json;
}

function agregarContactos(){
  let contactos
}





btnIngresar.addEventListener("click", function(){
    Login(iptNombre.value, iptPassword.value)
})