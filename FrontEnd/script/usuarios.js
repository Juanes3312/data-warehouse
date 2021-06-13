let cajaHeader = document.getElementsByTagName("header")[0];
let cajaCrearUsuario = document.getElementById('crearUsuario');
let cajaEditarUsuario = document.getElementById("editarUsuario")
let iptNombre = document.getElementById("inputNombre");
let iptApellido = document.getElementById("inputApellido")
let iptEmail = document.getElementById("inputEmail")
let iptDireccion = document.getElementById("inputDireccion")
let iptPassword = document.getElementById("inputPassword")
let iptPasswordConf = document.getElementById("inputPasswordConfirm");
let uIptNombre = document.getElementById("updateInputNombre");
let uIptApellido = document.getElementById("updateInputApellido")
let uIptEmail = document.getElementById("updateInputEmail")
let uIptDireccion = document.getElementById("updateInputDireccion")
let btnEnviarUsuario = document.getElementById("btncrearUsuario");
let btnEditarUsuario = document.getElementById("btnEditarUsuario");
let container = document.getElementById("container");
let key = JSON.parse(sessionStorage.getItem("key"));
console.log(cajaHeader)
function guardarUsuarioDB(nombre, apellido, email, direccion, password, key) {
  console.log(key);
  const nuevoUsuario = {
    "name": nombre,
    "apellido": apellido,
    "email": email,
    "direccion": direccion,
    "password": password
  }
  const parametros = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'token': key
    },
    body: JSON.stringify(nuevoUsuario),
    json: true,
  }
  console.log(parametros.body);

  fetch(`http://localhost:4000/usuarios`, parametros)

    .then(response => {
      let json = response.json()
      if (response.ok) {
        return json
      } else {
        return json.then(err => {
          throw err
        })
      }
    })
    .then(
      (data) => {
        console.log(data, 'soy data');
        alertify.message('Usuario creado')
        let mensaje = document.getElementsByClassName("ajs-message")[0];
        mensaje.style.background = "#1D72C2"
        mensaje.style.color = "white"
        setTimeout(function () {
          document.location.reload();
        }, 2000);
      }
    )
    .catch(error => {
      console.log(error, ' error')
      alertify.alert(error.mensaje);
    })
}

btnEnviarUsuario.addEventListener("click", async function () {
  let validacion = await CrearUsuarioValid();
  if (validacion) {
    try {
      guardarUsuarioDB(iptNombre.value, iptApellido.value, iptEmail.value, iptDireccion.value, iptPassword.value, key)
    } catch {
      console.log("no pase33333")
    }
  }
})

function HacerAdmin(id) {
  const parametros = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'token': key
    },
    json: true,
  }
  console.log(parametros.body);
  fetch(`http://localhost:4000/usuarios/admin/` + id, parametros)
  .then(response => {
    let json = response.json()
    if (response.ok) {
      return json
    } else {
      return json.then(err => {
        throw err
      })
    }
  })
  .then(
    (data) => {
      console.log(data, 'soy data');
      document.location.reload(); 
    }
  )
  .catch(error => {
    console.log(error, ' error')
    alertify.alert(error.message);
  })
}



function CrearUsuarioValid() {
  if (iptPassword.value.length == 0 || iptPasswordConf.value.length == 0 ||
    iptNombre.value.length == 0 || iptApellido.value.length == 0 ||
    iptEmail.value.length == 0 || iptDireccion.value.length == 0) {
    alertify
      .alert("Debe rellenar todos los campos", function () {});
    let alerta = document.getElementsByClassName('ajs-header')[0];
    alerta.innerHTML = ""
    return false;
  }
  if (iptPassword.value != iptPasswordConf.value) {
    alertify
      .alert("Las contraseñas deben ser iguales", function () {});
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

async function fetchUsuario(num) {
  console.log(num, 'soy num');
  let url = 'http://localhost:4000/usuario/' + num;
  const parametros = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'token': key
    },
    json: true,
  }
  let response = await fetch(url, parametros);
  let json = await response.json();
  console.log(json, "soy el usuario a editar")
  return json;
}

function deleteUsuarios(num) {
  const parametros = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'token': key
    },
    json: true,
  }
  let url = 'http://localhost:4000/usuarios/' + num;
  fetch(url, parametros)
  .then(response => {
    let json = response.json()
    if (response.ok) {
      return json
    } else {
      return json.then(err => {
        throw err
      })
    }
  })
  .then(
    (data) => {
      console.log(data, 'soy data');
      alertify.message('usuario borrado')
      let mensaje = document.getElementsByClassName("ajs-message")[0];
      mensaje.style.background = "#1D72C2"
      mensaje.style.color = "white"
      setTimeout(function () {
        document.location.reload();
      }, 2000);
    }
  )
  .catch(error => {
    console.log(error, ' error')
    alertify.alert(error.message);
  })
}

async function updateUsuarios(nombre, apellido, email, direccion, id) {
  const UsuarioEditar = {
    nombre: nombre,
    apellido: apellido,
    email: email,
    direccion: direccion
  }
  const parametros = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'token': key
    },
    body: JSON.stringify(UsuarioEditar),
    json: true,
  }
  console.log(parametros.body);
  fetch(`http://localhost:4000/usuarios/` + id, parametros)
    .then(response => {
      response.json()
      document.location.reload();
    })
    .catch(error => {
      console.log(error)
    })
}

async function agregarUsuarios() {
  let usuarios = await fetchUsuarios();
  for (i = 0; i < usuarios.length; i++) {
    let trUsuario = document.createElement("tr");
    container.appendChild(trUsuario)
    trUsuario.setAttribute("data", usuarios[i].id);
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
    btnEditar.addEventListener("click", async function () {
      cajaHeader.classList.add("blur")
      cajaCrearUsuario.classList.add("blur")
      container.classList.add("blur");
      cajaEditarUsuario.classList.remove('display-none')
      let usuario = await fetchUsuario(trUsuario.getAttribute("data"));
      console.log(usuario[0], "plis");
      uIptNombre.value = usuario[0].nombre
      uIptApellido.value = usuario[0].apellido;
      uIptEmail.value = usuario[0].email
      uIptDireccion.value = usuario[0].direccion;
      btnEditarUsuario.addEventListener("click", function () {
        updateUsuarios(uIptNombre.value, uIptApellido.value, uIptEmail.value, uIptDireccion.value, trUsuario.getAttribute("data"))

      })
    })
    let btnEliminar = document.createElement("button");
    btnEliminar.innerHTML = "Eliminar";
    btnEliminar.setAttribute("class", "eliminar");
    tdOp.appendChild(btnEliminar);
    btnEliminar.addEventListener("click", () => {
      deleteUsuarios(trUsuario.getAttribute("data"));
    })
    if (usuarios[i].admin === 1) {
      tdAdmin.innerHTML = 'Si'
    } else {
      tdAdmin.innerHTML = 'No'
      let btnAdmin = document.createElement("button")
      btnAdmin.setAttribute("id", "admin")
      btnAdmin.innerHTML = "Hacer admin"
      tdOp.appendChild(btnAdmin)
      btnAdmin.addEventListener("click", function () {
        HacerAdmin(trUsuario.getAttribute("data"))
      })
    }

  }
}

try {
  agregarUsuarios();

} catch (err) {
  console.log("el back no esta prendido");
}