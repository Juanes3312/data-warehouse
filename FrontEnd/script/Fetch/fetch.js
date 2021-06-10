export async function fetchRegiones() {
    let url = 'http://localhost:4000/regiones';
    let response = await fetch(url);
    let json = await response.json();
    console.log(json)
    return json;
}

export async function fetchPaises(num) {
    let url = 'http://localhost:4000/paises/' + num;
    let response = await fetch(url, );
    let json = await response.json();
    //console.log(json);
    return json;
}

export async function fetchCiudades(num) {
    let url = 'http://localhost:4000/ciudades/' + num;
    let response = await fetch(url, );
    let json = await response.json();
    //console.log(json);
    return json;
}

export async function fetchCompanias(num) {
    let url = 'http://localhost:4000/companias/';
    let response = await fetch(url);
    let json = await response.json();
    //console.log(json);
    return json;
}

export function guardarContactoDB(nombre, email, id_ciudad, id_compania, cargo, interes, key) {
    const nuevoContacto = {
      "name": nombre,
      "email": email,
      "id_ciudad": id_ciudad,
      "id_compania": id_compania,
      "cargo": cargo,
      "interes": interes
    }
    const parametros = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'token': key
      },
      body: JSON.stringify(nuevoContacto),
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
          alertify.message('Contacto creado')
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
