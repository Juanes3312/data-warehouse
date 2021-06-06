let iptNombre = document.getElementById("inputNombre");
let iptPassword = document.getElementById("inputPassword");
let btnIngresar = document.getElementById("btnIngresar");
let storageLocal = JSON.parse(sessionStorage.getItem("key"));
let cajaLogin = document.getElementById('login');
let container1 = document.getElementById("container1");
let container2 = document.getElementById("container2");
//console.log(storageLocal)
let headerx = document.getElementsByName("navbar")[0]
let usuariosHeader = document.getElementById("usuariosHeader");
let checkBoxpp = document.getElementById("checkboxPp");
let checkbox = document.getElementsByClassName("checkBox")
let contactosSeleccionados = [];
let trContacto;
//let checkBox;
let contacto = document.getElementsByClassName("contacto");
let btnDelete = document.getElementsByClassName("delete")[0];
if (storageLocal == null) {
  cajaLogin.classList.remove("display-none")
  container1.classList.add("display-none")
  container2.classList.add("display-none")
  headerx.classList.add("blur");
}



(function checkBoxPrincipal() {
  checkBoxpp.addEventListener("change", function validaCheckbox() {
    let checked = checkBoxpp.checked;
    console.log(checkbox)
    console.log(btnDelete)
    if (checked) {
      for (i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = true;
        contactosSeleccionados.push(contacto[i].getAttribute("data"));
        checkbox[i].parentNode.parentNode.classList.add("checked")
      }
      if (contactosSeleccionados.length > 0) {
        btnDelete.classList.remove("display-none")
      }
    } else {
      for (i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false;
        let e = contactosSeleccionados.indexOf(contacto[i].getAttribute('data'))
        contactosSeleccionados.splice(e, 1);
        checkbox[i].parentNode.parentNode.classList.remove("checked")
      }
      if (contactosSeleccionados.length === 0) {
        btnDelete.classList.add("display-none")
      }
    }
    console.log(contactosSeleccionados);
  }, false);

})();



async function fetchPais(id) {
  let url = 'http://localhost:4000/pais/' + id;
  let response = await fetch(url);
  let json = await response.json();
  //console.log(json)
  return json;
}

async function fetchCompania(id) {
  let url = 'http://localhost:4000/compania/' + id;
  let response = await fetch(url);
  let json = await response.json();
  //console.log(json)
  return json;
}



// login 
function Login(nombre, password) {
  const Usuario = {
    "nombre": nombre,
    "password": password
  }
  const parametros = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Usuario),
    json: true,
  }
  //console.log(parametros.body);
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
      setTimeout(function () {
        cajaLogin.classList.add("display-none")
        container1.classList.remove("display-none")
        container2.classList.remove("display-none")
        headerx.classList.remove("blur")
      }, 2000);
      if (data.admin == 0) {
        usuariosHeader.classList.add("display-none")
      }
    })
    .catch(error => {
      console.log(error)
    })
}

async function fetchContactos() {
  let url = 'http://localhost:4000/contactos';
  let response = await fetch(url);
  let json = await response.json();
  //console.log(json)
  return json;
}




async function agregarContactos() {
  let contactos = await fetchContactos();
  for (i = 0; i < contactos.length; i++) {
    trContacto = document.createElement("tr");
    trContacto.setAttribute("data", contactos[i].id);
    trContacto.classList.add("contacto")
    container2.appendChild(trContacto);
    let tdCheckBox = document.createElement("td");
    trContacto.appendChild(tdCheckBox);
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", 'checkBox');
    checkBox.setAttribute("class", 'checkBox');
    checkBox.addEventListener("change", async function validaCheckbox() {
      let checked = checkBox.checked;
      if (checked) {
        console.log(checkBox);
        console.log(checkBox.parentNode.parentNode.getAttribute("data"),"aaaaaaaaaaaa")
        contactosSeleccionados.push(checkBox.parentNode.parentNode.getAttribute('data'));
        checkBox.parentNode.parentNode.classList.add("checked")
        if (contactosSeleccionados.length > 0) {
          btnDelete.classList.remove("display-none")
        }
        console.log(contactosSeleccionados.length);
      } else {
        let j = await contactosSeleccionados.indexOf(checkBox.parentNode.parentNode.getAttribute('data'))
        contactosSeleccionados.splice(j, 1);
        checkBoxpp.checked = false;
        checkBox.parentNode.parentNode.classList.remove("checked")
        if (contactosSeleccionados.length === 0) {
          btnDelete.classList.add("display-none")
        }
        console.log(contactosSeleccionados.length);
      }
      console.log(contactosSeleccionados);
    }, false);
    tdCheckBox.appendChild(checkBox);
    let tdNombre = document.createElement("td")
    tdNombre.setAttribute("id", "nombre");
    tdNombre.innerText = contactos[i].nombre;
    trContacto.appendChild(tdNombre)
    let tdPais = document.createElement("td");
    tdPais.setAttribute("id", "pais");
    let pais = await fetchPais(contactos[i].id_pais);
    for (e = 0; e < pais.length; e++) {
      tdPais.innerHTML = pais[e].nombre;
      trContacto.appendChild(tdPais);
    }
    let tdCompania = document.createElement("td");
    tdCompania.setAttribute("id", "compania");
    let compania = await fetchCompania(contactos[i].id_compania)
    for (e = 0; e < compania.length; e++) {
      tdCompania.innerHTML = compania[e].nombre;
      trContacto.appendChild(tdCompania);
    }
    let tdCargo = document.createElement("td");
    tdCargo.setAttribute("id", "compania");
    tdCargo.innerHTML = contactos[i].cargo
    trContacto.appendChild(tdCargo);
    let tdInteres = document.createElement("td");
    tdInteres.setAttribute("id", "interes");
    tdInteres.setAttribute("data", contactos[i].interes);
    trContacto.appendChild(tdInteres);
    let pInteres = document.createElement("p");
    pInteres.classList.add("porcentaje");
    tdInteres.appendChild(pInteres)
    let divInteres = document.createElement("div");
    divInteres.classList.add("barraProgreso");
    tdInteres.appendChild(divInteres);
    let span1 = document.createElement("span");
    divInteres.appendChild(span1);
    let span2 = document.createElement("span");
    divInteres.appendChild(span2);
    if (contactos[i].interes === 25) {
      span1.classList.add("porcentajeUno25");
      span2.classList.add("porcentajeDos25");
      pInteres.innerHTML = "25%";
    } else if (contactos[i].interes === 50) {
      span1.classList.add("porcentajeUno50");
      span2.classList.add("porcentajeDos50");
      pInteres.innerHTML = "50%";
    } else if (contactos[i].interes === 75) {
      span1.classList.add("porcentajeUno75");
      span2.classList.add("porcentajeDos75");
      pInteres.innerHTML = "75%";
    } else if (contactos[i].interes === 100) {
      span1.classList.add("porcentajeUno100");
      span2.classList.add("porcentajeDos100");
      pInteres.innerHTML = "100%";
    }
    let tdAcciones = document.createElement("td");
    trContacto.appendChild(tdAcciones);
    let btnEditar = document.createElement('button');
    btnEditar.innerHTML = "Editar"
    tdAcciones.appendChild(btnEditar)
  }
}

agregarContactos();


/*(function btnBorrar(){
  if(contactosSeleccionados.length > 0){
    btnDelete.classList.toggle("display-none")
  }else if(contactosSeleccionados.length = 0){
    btnDelete.classList.remove("display-none")
  }
  console.log(contactosSeleccionados.length);
})();*/




for (i = 0; i < checkbox.length; i++) {
  checkbox[i].addEventListener("change", function () {
    if (contactosSeleccionados.length > 0) {
      btnDelete.classList.toggle("display-none")
    } else if (contactosSeleccionados.length = 0) {
      btnDelete.classList.remove("display-none")
    }
    console.log(contactosSeleccionados.length);
  })
}




btnIngresar.addEventListener("click", function () {
  Login(iptNombre.value, iptPassword.value)
})