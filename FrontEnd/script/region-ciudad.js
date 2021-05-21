let region = document.getElementById("region")
let btnaggpais = document.getElementsByClassName("aggPais");
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
  //console.log(regiones);
  let ulRegiones = document.createElement('ul');
  ulRegiones.setAttribute('id', 'regiones');
  arbolDeRegiones.appendChild(ulRegiones);
  for (let i = 0; i < regiones.length; i++) {
    let liRegion = document.createElement("li")
    liRegion.setAttribute('id', 'region');
    ulRegiones.appendChild(liRegion);
    let spanRegion = document.createElement('span');
    spanRegion.classList.add("caret");
    spanRegion.innerHTML = regiones[i].nombre;
    liRegion.appendChild(spanRegion);
    let divAggP = document.createElement("div");
    divAggP.setAttribute('id', "cajaAggPais");
    divAggP.classList.add("aggPais");
    liRegion.appendChild(divAggP);
    let pAggP = document.createElement("p");
    pAggP.innerHTML = 'Agrega un pais';
    divAggP.appendChild(pAggP);
    let ulPaises = document.createElement("ul");
    ulPaises.classList.add('display-none', 'paises');
    ulPaises.setAttribute('id', 'paises');
    liRegion.appendChild(ulPaises);
    let pais = await fetchPaises(i+1);
    console.log(regiones[i])
    for (let e = 0; e < pais.length; e++) {
        let liPaises = document.createElement('li');
        liPaises.setAttribute("id", "pais");
        liPaises.setAttribute("data", pais[e].id)
        ulPaises.appendChild(liPaises);
        let spanPais = document.createElement("span");
        spanPais.classList.add('caret')
        spanPais.setAttribute("id", "paisNombre");
        liPaises.appendChild(spanPais);
        spanPais.innerHTML = pais[e].nombre;
        let pEditar = document.createElement("p");
        pEditar.setAttribute("id", "editar");
        pEditar.innerHTML = "Editar";
        spanPais.appendChild(pEditar);
        let pEliminar = document.createElement("p");
        pEliminar.setAttribute("id", "eliminar");
        pEliminar.innerHTML = "Eliminar";
        spanPais.appendChild(pEliminar);
        let ulCiudades = document.createElement("ul");
        ulCiudades.classList.add('display-none', 'ciudades');
        ulCiudades.setAttribute('id', 'ciudades');
        console.log("argentinaaaaaaaaaaaaaaaaa", pais[e].nombre)
        let ciudad = await fetchCiudades(e);
        console.log(pais[e],"soy pais e arriba")
        for (let j = 0; j < ciudad.length; j++) {
          console.log("estoy poniendo las ciudades de", pais[e].nombre);
          //console.log('entre2')
          let liCiudades = document.createElement('li');
          liCiudades.setAttribute("data", ciudad[j].id)
          liCiudades.setAttribute("id", "ciudad");
          ulCiudades.appendChild(liCiudades);
          liPaises.appendChild(ulCiudades);
          let spanCiudad = document.createElement("span");
            spanCiudad.classList.add('caret')
            spanCiudad.setAttribute("id", "paisNombre");
            liCiudades.appendChild(spanCiudad);
            if(ciudad[j]){
              spanCiudad.innerHTML = ciudad[j].nombre;
              //console.log(pais[e], "soy pais[e]");
              //console.log(ciudad[j], "soy ciudades[j].pais_id")
            }
            let pEditar = document.createElement("p");
            pEditar.setAttribute("id", "editar");
            pEditar.innerHTML = "Editar";
            spanCiudad.appendChild(pEditar);
            let pEliminar = document.createElement("p");
            pEliminar.setAttribute("id", "eliminar");
            pEliminar.innerHTML = "Eliminar";
            spanCiudad.appendChild(pEliminar);
          
        }
      
    }
  }
  for (let i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function clickArbol() {
      console.log("oe")
      this.parentElement.querySelector(".display-none").classList.toggle("display-block");
      this.classList.toggle("caret-down");
    });
  }
}

agregarArbol();

//for que crea la caja donde se va agregar el pais
for (let i = 0; i < btnaggpais.length; i++) {
  btnaggpais[i].addEventListener("click", function () {
    //let li = document.createElement('li');
    //let span = document.createElement('span');
    //span.classList.add('caret');
    cajaAgg.classList.toggle('display-none');
    cajaAgg.classList.toggle('display-flex');
    header.classList.add('blur');
    arbolDeRegiones.classList.add('blur');
    // funcion que guarda el pais en la base datos
    btnAggX.addEventListener("click", function () {
      nombre = resAggX.value;
      guardarPais(i + 1, nombre);
    })
  })
}
let toggler = document.getElementsByClassName("caret");
// funcion que hace funcionar las flechitas
//console.log(toggler);
for (let i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function clickArbol() {
    console.log("oe")
    this.parentElement.querySelector(".display-none").classList.toggle("display-block");
    this.classList.toggle("caret-down");
  });
}