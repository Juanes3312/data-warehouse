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

function guardarCompaniaDB(nombre, pais, direccion) {
    const nuevoUsuario = {
        "nombre": nombre,
        "pais": pais,
        "direccion": direccion
    }
    const parametros = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            //'token': key
        },
        body: JSON.stringify(nuevoUsuario),
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

btnAggCompania.addEventListener("click", async function () {
    cajaCompania.classList.remove("display-none");
    cajaHeader.classList.add("blur")
    cajaPrincipal.classList.add("blur");
    titutloCajaCompania.innerHTML = "Crear nueva Compañia";
    btnEnviarCompania.innerHTML = "Enviar Compañia";
    let paises = await fetchPaises();
    for (i = 0; i < paises.length; i++) {
        let optPais = document.createElement("option");
        optPais.setAttribute("value", paises[i].id);
        optPais.innerHTML = paises[i].nombre;
        listaPaises.appendChild(optPais);
    }
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
        tdNombre.innerHTML = companias[i].nombre;
        trCompania.appendChild(tdNombre);
        let tdPais = document.createElement("td");
        tdPais.setAttribute("id", "Pais");
        let pais = await fetchPais(companias[i].pais);
        for (e = 0; e < pais.length; e++) {
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
        btnEditar.setAttribute("id", "btnEditar");
        tdAcciones.appendChild(btnEditar);
        btnEditar.innerHTML = "Editar";
        let btnEliminar = document.createElement("button");
        btnEliminar.setAttribute("id", "btnEliminar");
        btnEliminar.innerHTML = "Eliminar";
        tdAcciones.appendChild(btnEliminar);

    }
}

agregarCompanias();