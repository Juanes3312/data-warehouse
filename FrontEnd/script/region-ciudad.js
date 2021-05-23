let region = document.getElementById("region")
let btnaggpais = document.getElementsByClassName("aggPais");
let btnAggRegion = document.getElementById('cajaAggRegion');
let btnAggCiudad = document.getElementById('aggCiudad')
let paises = document.getElementsByClassName('paises')
let cajaAgg = document.getElementById('crearX');
let arbolDeRegiones = document.getElementById('arbolDeRegiones')
const header = document.getElementById('header');
const btnAggX = document.getElementById('btnCrearX')
const resAggX = document.getElementById('resCrearX');

//funcion que guarda el pais agregado en la base de datos
function guardarPais(region_id, nombre) {
  const nuevoPais = {
    "region_id": region_id,
    "nombre": nombre,
  }
  const parametros = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoPais),
    json: true,
  }
  console.log(parametros.body);
  fetch(`http://localhost:4000/paises`, parametros)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      document.location.reload();
    })
    .catch(error => {
      console.log(error)
    })
}

function guardarCiudad(pais_id, nombre) {
  const nuevoCiudad = {
    "pais_id": pais_id,
    "nombre": nombre,
  }
  const parametros = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoCiudad),
    json: true,
  }
  console.log(parametros.body);
  fetch(`http://localhost:4000/ciudades`, parametros)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      document.location.reload();
    })
    .catch(error => {
      console.log(error)
    })
}



function guardarRegion(nombre) {
  const nuevoPais = {
    "nombre": nombre,
  }
  const parametros = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoPais),
    json: true,
  }
  console.log(parametros.body);
  fetch(`http://localhost:4000/regiones`, parametros)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      document.location.reload();
    })
    .catch(error => {
      console.log(error)
    })
}


//funcion que trae las regiones
async function fetchRegiones() {
  let url = 'http://localhost:4000/regiones';
  let response = await fetch(url);
  let json = await response.json();
  console.log(json)
  return json;
}

async function deletePaises(num) {
  const parametros = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    json: true,
  }
  let url = 'http://localhost:4000/paises/' + num;
  let response = await fetch(url, parametros);
  document.location.reload();
}

async function deleteCiudades(num) {
  const parametros = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    json: true,
  }
  let url = 'http://localhost:4000/ciudades/' + num;
  let response = await fetch(url, parametros);
  //document.location.reload();
}

async function updatePaises(id, name) {
  const paisEditar = {
    "name": name,
  }
  const parametros = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paisEditar),
    json: true,
  }
  console.log(parametros.body);
  fetch(`http://localhost:4000/paises/` + id, parametros)
    .then(response => {
      response.json()
      document.location.reload();
    })
    .catch(error => {
      console.log(error)
    })
}

async function updateCiudades(id, name) {
  const paisEditar = {
    "name": name,
  }
  const parametros = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paisEditar),
    json: true,
  }
  console.log(parametros.body);
  fetch(`http://localhost:4000/ciudades/` + id, parametros)
    .then(response => {
      response.json()
      document.location.reload();
    })
    .catch(error => {
      console.log(error)
    })
}

//funcion que trae los paises segun la region
async function fetchPaises(num) {
  let url = 'http://localhost:4000/paises/' + num;
  let response = await fetch(url, );
  let json = await response.json();
  //console.log(json);
  return json;
}

//funciones que trae las ciudad de la base datos segun la paises
async function fetchCiudades(num) {
  let url = 'http://localhost:4000/ciudades/' + num;
  let response = await fetch(url, );
  let json = await response.json();
  //console.log(json);
  return json;
}

async function agregarArbol() {
  let regiones = await fetchRegiones();
  console.log(regiones);
  let ulRegiones = document.createElement('ul');
  ulRegiones.setAttribute('id', 'regiones');
  arbolDeRegiones.appendChild(ulRegiones);
  for (let i = 0; i < regiones.length; i++) {
    const currentRegion = regiones[i];
    let liRegion = document.createElement("details")
    liRegion.setAttribute('id', 'region');
    ulRegiones.appendChild(liRegion);
    let spanRegion = document.createElement('summary');
    spanRegion.classList.add("care");
    spanRegion.innerHTML = currentRegion.nombre;
    liRegion.appendChild(spanRegion);
    liRegion.setAttribute('data', currentRegion.id)
    let buttonAggP = document.createElement("button");
    buttonAggP.setAttribute('id', "cajaAggPais");
    buttonAggP.classList.add("aggPais");
    buttonAggP.setAttribute('data', currentRegion.id)
    liRegion.appendChild(buttonAggP);
    let pAggP = document.createElement("p");
    pAggP.innerHTML = 'Agrega un pais';
    buttonAggP.appendChild(pAggP);
    let ulPaises = document.createElement("ul");
    ulPaises.classList.add('display-non', 'paises');
    ulPaises.setAttribute('id', 'paises');
    liRegion.appendChild(ulPaises);
    let pais = await fetchPaises(currentRegion.id);
    for (let e = 0; e < pais.length; e++) {
      const currentPais = pais[e];
      let liPaises = document.createElement('details');
      liPaises.setAttribute("id", "pais");
      liPaises.setAttribute("data", currentPais.id);
      let buttonAggC = document.createElement("button");
      buttonAggC.setAttribute('id', "cajaAggCiudad");
      buttonAggC.classList.add("aggCiudad");
      buttonAggC.setAttribute('data', currentPais.id)
      liPaises.appendChild(buttonAggC);
      buttonAggC.addEventListener("click", function(){
      console.log(btnaggpais[i].getAttribute('data'), "hola")
      cajaAgg.classList.toggle('display-none');
      cajaAgg.classList.toggle('display-flex');
      cajaAgg.children[0].innerHTML = "Que ciudad desea agregar?"
      header.classList.add('blur');
      arbolDeRegiones.classList.add('blur');
      // funcion que guarda el pais en la base datos
      btnAggX.addEventListener("click", function () {
        nombre = resAggX.value;
        guardarCiudad(buttonAggC.getAttribute('data'), nombre);

      })
      })
      let pAggC = document.createElement("p");
      pAggC.innerHTML = 'Agrega una ciudad';
      buttonAggC.appendChild(pAggC);
      ulPaises.appendChild(liPaises);
      let spanPais = document.createElement("summary");
      spanPais.classList.add('care')
      spanPais.setAttribute("id", "paisNombre");
      liPaises.appendChild(spanPais);
      spanPais.innerHTML = currentPais.nombre;
      let pEditar = document.createElement("button");
      pEditar.setAttribute("id", "editar");
      pEditar.innerHTML = "Editar";
      pEditar.addEventListener("click", function () {
        cajaAgg.classList.toggle('display-none');
        cajaAgg.classList.toggle('display-flex');
        cajaAgg.children[0].innerHTML = "Que nombre le desea poner?"
        header.classList.add('blur');
        arbolDeRegiones.classList.add('blur');
        console.log("hols")
        btnAggX.addEventListener("click", function () {
          nombre = resAggX.value;
          updatePaises(liPaises.getAttribute("data"), nombre)
        })
      })
      spanPais.appendChild(pEditar);
      let btnEliminar = document.createElement("button");
      btnEliminar.setAttribute("id", "eliminar");
      btnEliminar.innerHTML = "Eliminar";
      spanPais.appendChild(btnEliminar);
      btnEliminar.addEventListener("click", function () {
        deletePaises(liPaises.getAttribute("data"))
      })

      let ulCiudades = document.createElement("ul");
      ulCiudades.classList.add('display-non', 'ciudades');
      ulCiudades.setAttribute('id', 'ciudades');
      let ciudad = await fetchCiudades(currentPais.id);
      for (let j = 0; j < ciudad.length; j++) {
        console.log("estoy poniendo las ciudades de", pais[e].nombre);
        //console.log('entre2')
        let liCiudades = document.createElement('ul');
        liCiudades.setAttribute("data", ciudad[j].id)
        liCiudades.setAttribute("id", "ciudad");
        ulCiudades.appendChild(liCiudades);
        liPaises.appendChild(ulCiudades);
        let spanCiudad = document.createElement("span");
        spanCiudad.classList.add('care')
        spanCiudad.setAttribute("id", "paisNombre");
        liCiudades.appendChild(spanCiudad);
        if (ciudad[j]) {
          spanCiudad.innerHTML = ciudad[j].nombre;
        }
        let pEditar = document.createElement("button");
        pEditar.setAttribute("id", "editar");
        pEditar.innerHTML = "Editar";
        spanCiudad.appendChild(pEditar);
        pEditar.addEventListener("click", function () {
          cajaAgg.classList.toggle('display-none');
          cajaAgg.classList.toggle('display-flex');
          cajaAgg.children[0].innerHTML = "Que nombre le desea poner?"
          header.classList.add('blur');
          arbolDeRegiones.classList.add('blur');
          console.log("hols")
          btnAggX.addEventListener("click", function () {
            nombre = resAggX.value;
            updateCiudades(liCiudades.getAttribute("data"), nombre)
          })
        })
        let pEliminar = document.createElement("button");
        pEliminar.setAttribute("id", "eliminar");
        pEliminar.innerHTML = "Eliminar";
        spanCiudad.appendChild(pEliminar);
        pEliminar.addEventListener("click", function () {
          deleteCiudades(liCiudades.getAttribute("data"))
        })
      }

    }
  }
  crearListenerAggPais();
}

agregarArbol();

//for que crea la caja donde se va agregar el pais
function crearListenerAggPais() {
  for (let i = 0; i < btnaggpais.length; i++) {
    btnaggpais[i].addEventListener("click", function () {
      console.log(btnaggpais[i].getAttribute('data'), "hola")
      cajaAgg.classList.toggle('display-none');
      cajaAgg.classList.toggle('display-flex');
      header.classList.add('blur');
      arbolDeRegiones.classList.add('blur');
      // funcion que guarda el pais en la base datos
      btnAggX.addEventListener("click", function () {
        nombre = resAggX.value;
        guardarPais(btnaggpais[i].getAttribute('data'), nombre);

      })
    })
  }
}

console.log(btnAggRegion)

function crearListenerAggRegion() {
  btnAggRegion.addEventListener("click", function () {
    cajaAgg.classList.toggle('display-none');
    cajaAgg.classList.toggle('display-flex');
    cajaAgg.children[0].innerHTML = "Que region desea agregar?"
    header.classList.add('blur');
    arbolDeRegiones.classList.add('blur');
    console.log("hols")
    // funcion que guarda el pais en la base datos
    btnAggX.addEventListener("click", function () {
      nombre = resAggX.value;
      guardarRegion(nombre);

    })
  })

}

crearListenerAggRegion();