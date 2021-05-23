let iptNombre = document.getElementById("inputNombre");
let iptApellido = document.getElementById("inputApellido")
let iptEmail = document.getElementById("inputEmail")
let iptDireccion = document.getElementById("inputDireccion")
let iptPassword = document.getElementById("inputPassword")
let iptPasswordConf = document.getElementById("inputPasswordConfirm");
let btnEnviarUsuario = document.getElementById("crearUsuario");
let container = document.getElementById("container")

function guardarUsuarioDB(nombre,apellido,email,direccion,password){
    const nuevoUsuario= {
        "name": nombre,
        "apellido": apellido,
        "email": email,
        "direccion": direccion,
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
      fetch(`http://localhost:4000/usuarios`, parametros)
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          alertify.message('Usuario creado')
          let mensaje = document.getElementsByClassName("ajs-message")[0];
          mensaje.style.background = "#1D72C2"
          mensaje.style.color = "white"
          setTimeout(function(){
            document.location.reload();
        },3000);
        })
        .catch(error => {
          console.log(error)
        })
}

btnEnviarUsuario.addEventListener("click", async function () {
    let validacion =  await CrearUsuarioValid();
    if(validacion){
        console.log("entre");
        guardarUsuarioDB(iptNombre.value, iptApellido.value, iptEmail.value, iptDireccion.value, iptPassword.value)
    }
})

function CrearUsuarioValid() {
    if (iptPassword.value.length == 0 || iptPasswordConf.value.length == 0 ||
        iptNombre.value.length == 0 ||  iptApellido.value.length == 0 || 
        iptEmail.value.length == 0 ||  iptDireccion.value.length == 0) {
        alertify
            .alert("Debe rellenar todos los campos", function () {
            });
        let alerta = document.getElementsByClassName('ajs-header')[0];
            alerta.innerHTML = ""
        return false;
    }
    if (iptPassword.value != iptPasswordConf.value) {
        alertify
            .alert("Las contraseñas deben ser iguales", function (){
            });
        let alerta = document.getElementsByClassName('ajs-header')[0];
           alerta.innerHTML = ""
        return false;
    }
    return true;
};

async function fetchUsuarios() {
    let url = 'http://localhost:4000/usuarios';
    let response = await fetch(url);
    let json = await response.json();
    console.log(json)
    return json;
  }

async function agregarUsuarios(){
  let usuarios = await fetchUsuarios();
  for(i = 0; i<usuarios.length; i++){
    console.log("oe")
    let trUsuario = document.createElement("tr");
    container.appendChild(trUsuario)
    let tdNombre = document.createElement("td")
    tdNombre.setAttribute("id", "nombre")
    tdNombre.innerHTML = usuarios[i].nombre;
    trUsuario.appendChild(tdNombre)
    let tdApellido = document.createElement('td');
    tdApellido.setAttribute('id', "apellido")
    tdApellido.innerHTML = usuarios[i].apellido;
    trUsuario.appendChild(tdApellido);
    let tdCorreo = document.createElement("td");
    tdCorreo.setAttribute("id", "correo")
    tdCorreo.innerHTML = usuarios[i].email;
    trUsuario.appendChild(tdCorreo);
    let tdDireccion = document.createElement("td");
    tdDireccion.setAttribute("id", "correo")
    tdDireccion.innerHTML = usuarios[i].direccion;
    trUsuario.appendChild(tdDireccion);
    let tdAdmin = document.createElement("td");
    tdAdmin.setAttribute("id", "correo");
    
    trUsuario.appendChild(tdAdmin)
    let tdOp = document.createElement("td");
    tdOp.setAttribute("id", "opciones");
    trUsuario.appendChild(tdOp)
    let btnEditar = document.createElement("button")
    btnEditar.innerHTML = " Editar"
    btnEditar.setAttribute('class', "editar");
    tdOp.appendChild(btnEditar);
    let btnEliminar = document.createElement("button");
    btnEliminar.innerHTML = "Eliminar";
    btnEliminar.setAttribute("class", "eliminar");
    tdOp.appendChild(btnEliminar);
    if(usuarios[i].admin === 1){
      tdAdmin.innerHTML = 'Si'
    }else{
      tdAdmin.innerHTML = 'No'
      let btnAdmin = document.createElement("button")
      btnAdmin.setAttribute("id", "admin")
      btnAdmin.innerHTML = "Hacer admin"
      tdOp.appendChild(btnAdmin)
    }

  }
}

agregarUsuarios();