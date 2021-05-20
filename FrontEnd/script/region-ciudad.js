let toggler = document.getElementsByClassName("caret");
let region = document.getElementById("region")
let btnaggpais = document.getElementsByClassName("aggPais");
let paises = document.getElementsByClassName('paises')
let cajaAgg = document.getElementById('crearX');
let arbolDeRegiones = document.getElementById('arbolDeRegiones')
const header = document.getElementById('header');
const btnAggX = document.getElementById('btnCrearX')
const resAggX = document.getElementById('resCrearX');
for (let i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".display-none").classList.toggle("display-block");
    this.classList.toggle("caret-down");
  });
}
//console.log(btnaggpais)
function guardarPais(region_id, nombre){
  const nuevoPais = {
    "region_id": region_id,
    "nombre": nombre,
  }
  const parametros = {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoPais),
    json: true,
  }
  console.log(parametros.body);
  fetch(`http://localhost:4000/paises`, parametros)
  .then(response => response.json())
  .then((data)=>{
    console.log(data);
  })
}

async function fetchRegiones(){
  let url = 'http://localhost:4000/regiones';
    let response = await fetch(url);
    let json = await response.json();
    return json;
}

async function fetchCiudades(num){
  const paramsFetch = {
    method: "GET",
    headers:{
      'Content-Type': 'application/json'
    },
    json: true, 
  }
  let url = 'http://localhost:4000/paises/' + num;
    let response = await fetch(url, paramsFetch);
    let json = await response.json();
    console.log(json);
    return json;
}

async function agregarArbol(){
  let regiones = await fetchRegiones();
  console.log(regiones);
  let ulRegiones = document.createElement('ul');
  ulRegiones.setAttribute('id', 'regiones');
  for(i=0; i < regiones.length; i++){
    let liRegion = document.createElement("li")
    fetchCiudades(i+1);
  }
}

agregarArbol();


for(let i = 0 ; i < btnaggpais.length; i++){
  btnaggpais[i].addEventListener("click", function(){
    //console.log(this.nextElementSibling, " hey");
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.innerHTML = 'Panama';
    li.appendChild(span);
    this.nextElementSibling.appendChild(li);// agrega el pais donde lo pones
    span.classList.add('caret');
    cajaAgg.classList.toggle('display-none');
    cajaAgg.classList.toggle('display-flex');
    header.classList.add('blur');
    arbolDeRegiones.classList.add('blur');
    btnAggX.addEventListener("click", function(){
      nombre = resAggX.value;
      guardarPais(i+1,nombre);
    })
  })
}