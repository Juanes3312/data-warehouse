let container = document.getElementById("container2");

async function fetchCompanias() {
    let url = 'http://localhost:4000/companias';
    let response = await fetch(url);
    let json = await response.json();
    console.log(json)
    return json;
  }

async function fetchPais(id){
    let url = 'http://localhost:4000/pais/' + id;
    let response = await fetch(url);
    let json = await response.json();
    console.log(json)
    return json;
}

async function agregarCompanias(){
    let companias = await fetchCompanias();
    for(i=0; i<companias.length; i++){
        let trCompania = document.createElement("tr");
        container.appendChild(trCompania);
        trCompania.setAttribute("data", companias[i].id);
        let tdNombre = document.createElement("td");
        tdNombre.setAttribute("id", "nombre");
        tdNombre.innerHTML = companias[i].nombre;
        trCompania.appendChild(tdNombre);
        let tdPais = document.createElement("td");
        tdPais.setAttribute("id", "Pais");
        let pais = await fetchPais(companias[i].pais);
        for(e=0; e<pais.length; e++ ){
            tdPais.innerHTML = pais[e].nombre;
            trCompania.appendChild(tdPais);
        }
        let tdDireccion = document.createElement("td");
        tdDireccion.setAttribute("id", "direccion");
        tdDireccion.innerHTML = companias[i].direccion;
        trCompania.appendChild(tdDireccion);
        let tdAcciones = document.createElement("td");
        tdAcciones.setAttribute("id", "acciones");
        trCompania.appendChild(tdAcciones);
        let btnEditar = document.createElement("button");
        btnEditar.setAttribute("id","btnEditar");
        tdAcciones.appendChild(btnEditar);
        btnEditar.innerHTML = "Editar";
        let btnEliminar = document.createElement("button");
        btnEliminar.setAttribute("id","btnEliminar");
        btnEliminar.innerHTML = "Eliminar";
        tdAcciones.appendChild(btnEliminar);
        
    }
}

agregarCompanias();