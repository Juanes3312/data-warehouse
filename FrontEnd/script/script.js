import {
  fetchRegiones,
  fetchPaises,
  fetchCiudades,
  fetchCompanias,
  guardarContactoDB,
  updateContactos,
  deleteContactos,
  fetchPais,
  fetchCiudad,
  fetchCompania,
  fetchContacto,
  fetchContactos,
  fetchRegion,
  fetchContactosParams
} from "./Fetch/fetch.js"
let iptPassword = document.getElementById("inputPassword");
let btnIngresar = document.getElementById("btnIngresar");
let storageLocal = JSON.parse(sessionStorage.getItem("key"));
let cajaLogin = document.getElementById('login');
let container1 = document.getElementById("container1");
let container2 = document.getElementById("container2");
let xCajaAzul = document.getElementById("xCajaAzul");
let cajaAzul = document.getElementById("cajaAzul")
//console.log(storageLocal)
let header = document.getElementsByName("navbar")[0]
let usuariosHeader = document.getElementById("usuariosHeader");
let checkBoxpp = document.getElementById("checkboxPp");
let checkbox = document.getElementsByClassName("checkBox")
let contactosSeleccionados = [];
let trContacto;
let iptNombre = document.getElementById("inputNombre");
let iptNombreCont = document.getElementById("inputNombreCont")
let iptCargo = document.getElementById("inputCargo");
let iptEmail = document.getElementById("inputEmail");
let iptCompania = document.getElementById("selectCompania");
let iptRegion = document.getElementById("selectRegion");
let iptPais = document.getElementById("selectPais");
let iptCiudad = document.getElementById("selectCiudad")

let iptInteres = document.getElementById("iptInteres")
//let checkBox;
let contacto = document.getElementsByClassName("contacto");
let btnDelete = document.getElementsByClassName("delete")[0];
let btnCajaAggContacto = document.getElementById("aggContacto");
let btnGuardarUsuario = document.getElementById("btnGuardarUsuario");
let btnEditarUsuario = document.getElementById("btnEditarUsuario");
let btnDeleteUsuario =document.getElementById("btnBorrar");
let cajaAggContacto = document.getElementById("cajaAggContacto");
let key;
let id;
let barraBusquedad = document.getElementById("barraBusquedad");
let lupa = document.getElementById("lupita")
if (storageLocal == null) {
  cajaLogin.classList.remove("display-none")
  container1.classList.add("display-none")
  container2.classList.add("display-none")
  header.classList.add("blur");
}else{
  key = storageLocal;
}

key = storageLocal;

console.log(lupa);


const primeraLetraMayuscula = (cadena) => {
  const primerCaracter = cadena.charAt(0).toUpperCase();
  const restoDeLaCadena = cadena.substring(1, cadena.length);
  return primerCaracter.concat(restoDeLaCadena);
}

async function BuscarContactos(palabraBuscar){
  let palabra = palabraBuscar.toLowerCase();
  console.log(palabra);
  let idCiudadEncontrado = 0;
  let idCompaniaEncontrado = 0;

  let companias  = await fetchCompanias();
   for(let i = 0 ; i<companias.length; i++){
     console.log(palabra, "ey mi loco soy la palabra");
     console.log(companias[i].nombre, "ey mi loco soy la comp")
     if(palabra == companias[i].nombre){
       console.log("ey mi loco soy el id que buscas", companias[i].id);
       idCompaniaEncontrado = companias[i].id;
     }
   }
   let paises = await fetchPaises();
   for(let i = 0 ; i<paises.length; i++){
    console.log(palabra, "ey mi loco soy la palabra");
    console.log(companias[i].nombre, "ey mi loco soy la comp")
    if(palabra == paises[i].nombre){
      console.log("ey mi loco soy el id que buscas", paises[i].id);
      idCompaniaEncontrado = companias[i].id;
    }
  }
   fetchContactosParams('a', "as", "asdd" , idCompaniaEncontrado,"asdd", [])
}
lupa.addEventListener("click", function(){
  console.log("oeoeoe")
  BuscarContactos(barraBusquedad.value)
})


btnGuardarUsuario.addEventListener("click",async function(){
  let validacion = await validarCampos(); 
  console.log(iptCiudad.value)
  console.log(validacion);
  if(validacion){
    console.log(key, "soy key");
    guardarContactoDB(iptNombreCont.value, iptEmail.value, iptCiudad.value, iptCompania.value, iptCargo.value, iptInteres.value, key)
  }
})

btnDeleteUsuario.addEventListener("click", function(){
  for(let i = 0 ; i<contactosSeleccionados.length; i++){
    console.log(contactosSeleccionados[i]);
    deleteContactos(contactosSeleccionados[i], key);
  }
})


xCajaAzul.addEventListener("click", function () {
  cajaAggContacto.classList.add("display-none")
  container1.classList.remove("blur");
  container2.classList.remove("blur");
  header.classList.remove("blur")
});

(async function agregarInfoSelect() {
  let optDefectoComp = document.createElement("option");
  optDefectoComp.innerHTML = "Selecciona una Compania";
  optDefectoComp.setAttribute("selected", "");
  optDefectoComp.setAttribute("disable", "");
  optDefectoComp.setAttribute("hidden", "")
  iptCompania.appendChild(optDefectoComp);
let companias = await fetchCompanias();
for(let j = 0 ; j < companias.length; j++){
  iptCompania.setAttribute("data", companias[j].id)
    let optCompania = document.createElement("option");
    optCompania.setAttribute("value", companias[j].id);
    optCompania.innerHTML = companias[j].nombre;
    iptCompania.appendChild(optCompania);
    console.log("hola")
}

  let Regiones = await fetchRegiones();
  for (let i = 0; i < Regiones.length; i++) {
    iptRegion.setAttribute("data", Regiones[i].id)
    let optRegion = document.createElement("option");
    optRegion.setAttribute("value", Regiones[i].id);
    optRegion.innerHTML = Regiones[i].nombre;
    iptRegion.appendChild(optRegion);
  }
  let optDefectoR = document.createElement("option");
  optDefectoR.innerHTML = "Selecciona una region";
  optDefectoR.setAttribute("selected", "");
  optDefectoR.setAttribute("disable", "");
  optDefectoR.setAttribute("hidden", "")
  iptRegion.appendChild(optDefectoR);
  let optDefectoP = document.createElement("option");
  optDefectoP.innerHTML = "Selecciona un Pais";
  optDefectoP.setAttribute("selected", "");
  optDefectoP.setAttribute("disable", "");
  optDefectoP.setAttribute("hidden", "")
  iptPais.appendChild(optDefectoP);
  let optDefectoC = document.createElement("option");
  optDefectoC.innerHTML = "Selecciona una Ciudad";
  optDefectoC.setAttribute("selected", "");
  optDefectoC.setAttribute("disable", "");
  optDefectoC.setAttribute("hidden", "")
  iptCiudad.appendChild(optDefectoC);
  iptRegion.addEventListener("change", async function () {
    //console.log(iptRegion.value, "soy value iptregion")
    let paises = await fetchPaises(iptRegion.value);

    console.log(iptPais.options)
    for (let e = -1; e <= iptPais.options.length; e++) {
      console.log(iptPais.options[e], "borrando en la posicion ", e)
      iptPais.options[0] = null;
    }
    for (let i = 0; i < paises.length; i++) {
      let optPais = document.createElement("option");
      optPais.setAttribute("value", paises[i].id);
      optPais.setAttribute("class", "pais");
      optPais.innerHTML = paises[i].nombre;
      iptPais.appendChild(optPais);
    }
  });
  iptPais.addEventListener("change", async function () {
    let ciudad = await fetchCiudades(iptPais.value);
    for (let e = -1; e <= iptCiudad.options.length; e++) {
      iptCiudad.options[0] = null;
    }
    for (let i = 0; i < ciudad.length; i++) {
      let optCiudad = document.createElement("option");
      optCiudad.setAttribute("value", ciudad[i].id);
      optCiudad.setAttribute("class", "ciudad");
      optCiudad.innerHTML = ciudad[i].nombre;
      iptCiudad.appendChild(optCiudad);
    }
  })
})();



function validarCampos() {
  if (iptNombreCont.value.length == 0 || iptEmail.value.length == 0 ||
    iptCiudad.value.length == 0 || iptCompania.value.length == 0 ||
    iptCargo.value.length == 0 || iptInteres.value.length == 0) {
      console.log("holaa", iptNombreCont.value)
    console.log(iptNombreCont.value.length, iptEmail.value.length, iptCiudad.value.length,iptCompania.value.length, iptCargo.value.length, iptInteres.value.length )
    alertify
      .alert("Debe rellenar todos los campos", function () {});
    let alerta = document.getElementsByClassName('ajs-header')[0];
    alerta.innerHTML = ""
    return false;
  }
  
  return true;
};


(function checkBoxPrincipal() {
  checkBoxpp.addEventListener("change", function validaCheckbox() {
    let checked = checkBoxpp.checked;
    console.log(checkbox)
    console.log(btnDelete)
    if (checked) {
      for (j = -20; j <= contactosSeleccionados.length; j++) {
        contactosSeleccionados.shift();
      }
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
        //let e = contactosSeleccionados.indexOf(contacto[i].getAttribute('data'))
        for (j = 0; j < contactosSeleccionados.length; j++) {
          contactosSeleccionados.shift();
        }
        checkbox[i].parentNode.parentNode.classList.remove("checked")
      }
      if (contactosSeleccionados.length === 0) {
        btnDelete.classList.add("display-none")
      }
    }
    console.log(contactosSeleccionados);
  }, false);
})();



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
        header.classList.remove("blur")
      }, 2000);
      if (data.admin == 0) {
        usuariosHeader.classList.add("display-none")
      }
    })
    .catch(error => {
      console.log(error)
    })
}


async function agregarContactos() {
  let contactos = await fetchContactos();
  for (let i = 0; i < contactos.length; i++) {
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
        console.log(checkBox.parentNode.parentNode.getAttribute("data"), "aaaaaaaaaaaa")
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
    let tdContacto = document.createElement("td")
    tdContacto.setAttribute("id", "Contacto");
    let pNombre = document.createElement("p");
    pNombre.innerText = contactos[i].nombre;
    pNombre.setAttribute("id", "nombre");
    tdContacto.appendChild(pNombre)
    trContacto.appendChild(tdContacto);
    let pEmail = document.createElement("p");
    pEmail.innerText = contactos[i].email;
    pEmail.setAttribute("id", "email");
    tdContacto.appendChild(pEmail)
    trContacto.appendChild(tdContacto)
    let tdPais = document.createElement("td");
    tdPais.setAttribute("id", "pais");
    let ciudad = await fetchCiudad(contactos[i].id_ciudad);
    for (let e = 0; e < ciudad.length; e++) {
      let pais = await fetchPais(ciudad[e].pais_id)
      tdPais.innerHTML = pais[e].nombre;
      trContacto.appendChild(tdPais);
    }
    let tdCompania = document.createElement("td");
    tdCompania.setAttribute("id", "compania");
    let compania = await fetchCompania(contactos[i].id_compania)
    for (let e = 0; e < compania.length; e++) {
      tdCompania.innerHTML = primeraLetraMayuscula(compania[e].nombre);
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
    btnEditar.addEventListener("click", async function(){
      id = btnEditar.parentElement.parentElement.getAttribute("data")
      btnGuardarUsuario.classList.add("display-none");
      btnEditarUsuario.classList.remove("display-none")
      cajaAggContacto.classList.remove("display-none");
      cajaAzul.firstElementChild.innerHTML = "Editar Contacto";
      container1.classList.add("blur");
      container2.classList.add("blur");
      header.classList.add("blur");
      let contacto = await fetchContacto(id);
      console.log(trContacto.getAttribute("data"), "soy data")
      iptNombreCont.value = contacto[0].nombre;
      iptEmail.value = contacto[0].email;
      console.log(contacto[0], "soy el contacto de id ciudad")
      let ciudad = await fetchCiudad(contacto[0].id_ciudad)
      let optC = document.createElement("option");
      optC.innerHTML = ciudad[0].nombre;
      optC.setAttribute("selected", "");
      optC.setAttribute("hidden", "");
      optC.setAttribute("value", ciudad[0].id);
      iptCiudad.appendChild(optC);
      let pais = await fetchPais(ciudad[0].pais_id);
      let optP = document.createElement("option");
      optP.innerHTML = pais[0].nombre;
      console.log(pais[0].nombre,"xd")
      optP.setAttribute("selected", "");
      optP.setAttribute("hidden", "")
      //optP.setAttribute("value", pais[0].id)
      iptPais.appendChild(optP);
      iptPais.value = pais[0].nombre;
      let region = await fetchRegion(pais[0].region_id);
      for(let i = 0 ; i<iptRegion.options.length; i++){
        if(iptRegion.options[i].value == region[0].id){
          iptRegion.options[i].setAttribute("selected", "");
        }
      }
      let compania = await fetchCompania(contacto[0].id_compania);
      for(let i = 0 ; i<iptCompania.options.length; i++){
        
        if(iptCompania.options[i].value == compania[0].id){
          iptCompania.options[i].setAttribute("selected", "");
        }
      }
      iptCargo.value = contacto[0].cargo;
      for(let i = 0 ; i<iptInteres.list.options.length; i++){
        console.log(parseInt(iptInteres.list.options[i].value), "xd1")
        console.log(contacto[0].interes, "xd2")
        if(parseInt(iptInteres.list.options[i].value) == contacto[0].interes){
          iptInteres.list.options[i].setAttribute("selected", "");
          //iptInteres.setAttribute("value",contacto[0].interes)
        }
      }
      
    })
    btnEditar.innerHTML = "Editar"
    tdAcciones.appendChild(btnEditar);
  }
}

btnEditarUsuario.addEventListener("click", function(){
  console.log(id, "soy id")
  updateContactos(iptNombreCont.value, iptEmail.value, iptCiudad.value, iptCompania.value, iptCargo.value, iptInteres.value, key, id)
})





agregarContactos();

btnCajaAggContacto.addEventListener("click", function () {
  cajaAggContacto.classList.remove("display-none")
  container1.classList.add("blur");
  container2.classList.add("blur");
  header.classList.add("blur")
})


for (let i = 0; i < checkbox.length; i++) {
  checkbox[i].addEventListener("change", function () {
    if (contactosSeleccionados.length > 0) {
      btnDelete.classList.toggle("display-none")
    } else if (contactosSeleccionados.length = 0) {
      btnDelete.classList.remove("display-none")
    }
    console.log(contactosSeleccionados.length);
  })
}

//BARRA DE INTERES

document.querySelectorAll(".__range-step").forEach(function (ctrl) {
  var el = ctrl.querySelector('input');
  el.oninput = function () {
    // colorize step options
    ctrl.querySelectorAll("option").forEach(function (opt) {
      if (parseInt(opt.value) <= parseInt(iptInteres.value)) {
        opt.style.backgroundColor = 'green';
      } else {
        opt.style.backgroundColor = '#aaa';
      }
    });
    // colorize before and after
    var valPercent = (el.valueAsNumber - parseInt(el.min)) / (parseInt(el.max) - parseInt(el.min));
    var style = 'background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(' +
      valPercent + ', green), color-stop(' +
      valPercent + ', #aaa));';
    el.style = style;

  }

  el.oninput();
});
window.onresize = function () {
  document.querySelectorAll(".__range").forEach(function (ctrl) {
    var el = ctrl.querySelector('input');
    el.oninput();
  });
};


btnIngresar.addEventListener("click", function () {
  Login(iptNombre.value, iptPassword.value)
})