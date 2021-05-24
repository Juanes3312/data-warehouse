let iptNombre = document.getElementById("inputNombre");
let iptPassword = document.getElementById("inputPassword");
let btnIngresar = document.getElementById("btnIngresar");

// login 
function Login(nombre, password){
    const nuevoUsuario= {
        "nombre": nombre,
        "password" : password
      }
      const parametros = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoUsuario),
        json: true,
      }
      console.log(parametros.body);
      fetch(`http://localhost:4000/login`, parametros)
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          alertify.message('Bienvenido ' + nombre)
          let mensaje = document.getElementsByClassName("ajs-message")[0];
          mensaje.style.background = "#1D72C2"
          mensaje.style.color = "white"
          setTimeout(function(){
            //quitar la caja del login y poner el token en el local host
        },3000);
        })
        .catch(error => {
          console.log(error)
        })
}

btnIngresar.addEventListener("click", function(){
    Login(iptNombre.value, iptPassword.value)
})