let container = document.getElementById("container2");
let cajaPrincipal = document.getElementById("cajaCompanias")
let cajaHeader = document.getElementsByTagName("header")[0];
let cajaCompania = document.getElementById("editarCrearCompania");
let btnAggCompania = document.getElementById("btnAggCompania")
let listaPaises = document.getElementById("paises");
let btnEnviarCompania = document.getElementById('btnCompania');
let tituloCajaCompania = document.getElementById("titutloCajaCompania");
let inputNombre = document.getElementById("inputNombre")
let inputDireccion = document.getElementById("inputDireccion")
let key = JSON.parse(sessionStorage.getItem("key"));

function guardarCompaniaDB(nombre, pais, direccion) {
    const nuevaCompania = {
        "nombre": nombre,
        "pais": pais,
        "direccion": direccion
    }
    const parametros = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'token': key
        },
        body: JSON.stringify(nuevaCompania),
        json: true,
    }
    console.log(parametros.body);

    fetch(`http://localhost:4000/companias`, parametros)
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
                alertify.message(data.mensaje);
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

function updateCompania(nombre, pais, direccion, id){
    const editarCompania = {
        "nombre": nombre,
        "pais": pais,
        "direccion": direccion
    }
    const parametros = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'token': key
        },
        body: JSON.stringify(editarCompania),
        json: true,
    }
    console.log(parametros.body);

    fetch(`http://localhost:4000/companias/` + id, parametros)
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
                alertify.message(data.mensaje);
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


async function fetchCompania(id) {
    let url = 'http://localhost:4000/compania/' + id;
    let response = await fetch(url);
    let json = await response.json();
    console.log(json)
    return json;
}

async function fetchCompanias() {
    let url = 'http://localhost:4000/companias';
    let response = await fetch(url);
    let json = await response.json();
    console.log(json)
    return json;
}


async function fetchPais(id) {
    let url = 'http://localhost:4000/pais/' + id;
    let response = await fetch(url);
    let json = await response.json();
    console.log(json)
    return json;
}


async function fetchPaises() {
    let url = 'http://localhost:4000/paises';
    let response = await fetch(url);
    let json = await response.json();
    console.log(json)
    return json;
}

async function deleteCompanias(num) {
    const parametros = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'token': key
      },
      json: true,
    }
    let url = 'http://localhost:4000/companias/' + num;
    await fetch(url, parametros);
    document.location.reload();
  }

  const primeraLetraMayuscula = (cadena) => {
    const primerCaracter = cadena.charAt(0).toUpperCase();
    const restoDeLaCadena = cadena.substring(1, cadena.length);
    return primerCaracter.concat(restoDeLaCadena);
  }

btnAggCompania.addEventListener("click", async function () {
    cajaCompania.classList.remove("display-none");
    cajaHeader.classList.add("blur")
    cajaPrincipal.classList.add("blur");
    titutloCajaCompania.innerHTML = "Crear nueva Compañia";
    btnEnviarCompania.innerHTML = "Guardar Compañia";
    let paises = await fetchPaises();
    for (i = 0; i < paises.length; i++) {
        let optPais = document.createElement("option");
        optPais.setAttribute("value", paises[i].id);
        optPais.innerHTML = paises[i].nombre;
        listaPaises.appendChild(optPais);
    }
    let optDefecto = document.createElement("option");
    optDefecto.innerHTML = "Selecciona un pais";
    optDefecto.setAttribute("selected", "");
    optDefecto.setAttribute("disable", "");
    optDefecto.setAttribute("hidden", "")
    listaPaises.appendChild(optDefecto);
});

btnEnviarCompania.addEventListener("click", function () {
    console.log(paises.value)
    guardarCompaniaDB(inputNombre.value, paises.value, inputDireccion.value)
})


async function agregarCompanias() {
    let companias = await fetchCompanias();
    for (i = 0; i < companias.length; i++) {
        let trCompania = document.createElement("tr");
        container.appendChild(trCompania);
        trCompania.setAttribute("data", companias[i].id);
        let tdNombre = document.createElement("td");
        tdNombre.setAttribute("id", "nombre");
        tdNombre.innerHTML = primeraLetraMayuscula(companias[i].nombre);
        trCompania.appendChild(tdNombre);
        let tdPais = document.createElement("td");
        tdPais.setAttribute("id", "Pais");
        let pais = await fetchPais(companias[i].pais);
        for (e = 0; e < pais.length; e++) {
            tdPais.innerHTML = primeraLetraMayuscula( pais[e].nombre);
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
        btnEditar.setAttribute("id", "btnEditar");
        tdAcciones.appendChild(btnEditar);
        btnEditar.innerHTML = "Editar";
        // funcion del boton editar
        btnEditar.addEventListener("click", async function () {
            cajaHeader.classList.add("blur")
            cajaPrincipal.classList.add("blur");
            cajaCompania.classList.remove("display-none");
            btnEnviarCompania.classList.add("display-none");
            let btnUpdate = document.createElement("button");
            cajaCompania.appendChild(btnUpdate);
            btnUpdate.setAttribute("id", "btnUCompania");
            btnUpdate.innerHTML = "Actualizar Compañia";
            let compania = await fetchCompania(trCompania.getAttribute("data"));
            inputNombre.value = compania[0].nombre;
            let fetchpaises = await fetchPaises();
            for (i = 0; i < fetchpaises.length; i++) {
                let optPais = document.createElement("option");
                optPais.setAttribute("value", fetchpaises[i].id);
                optPais.innerHTML = fetchpaises[i].nombre;
                listaPaises.appendChild(optPais);
                if(compania[0].pais === fetchpaises[i].id){
                    optPais.setAttribute("selected","");
                }
            }
            
            inputDireccion.value = compania[0].direccion;
            btnUpdate.addEventListener("click", function(){
                console.log(inputNombre.value, "hola")
                updateCompania(inputNombre.value, paises.value, inputDireccion.value, trCompania.getAttribute("data"))              
            })  
        });

        let btnEliminar = document.createElement("button");
        btnEliminar.setAttribute("id", "btnEliminar");
        btnEliminar.innerHTML = "Eliminar";
        btnEliminar.addEventListener("click", function(){
            deleteCompanias(trCompania.getAttribute("data"));
        });
        tdAcciones.appendChild(btnEliminar);

    }
}

agregarCompanias();