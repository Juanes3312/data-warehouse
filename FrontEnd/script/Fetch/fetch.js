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
    console.log(key, "soy key params")
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
  
    fetch(`http://localhost:4000/contactos`, parametros)
  
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
export async function updateContactos(nombre, email, id_ciudad, id_compania, cargo, interes, key, id) {
    const contactoEditar = {
        "name": nombre,
        "email": email,
        "id_ciudad": id_ciudad,
        "id_compania": id_compania,
        "cargo": cargo,
        "interes": interes
    }
    const parametros = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'token': key
      },
      body: JSON.stringify(contactoEditar),
      json: true,
    }
    console.log(parametros.body);
    console.log(id, "oebien")
    fetch(`http://localhost:4000/contactos/` + id, parametros)
      .then(response => {
        response.json()
        document.location.reload();
      })
      .catch(error => {
        console.log(error)
      })
  }
  export async function fetchContacto(num) {
    console.log(num, 'soy num');
    let url = 'http://localhost:4000/contacto/' + num;
    const parametros = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
        
      },
      json: true,
    }
    let response = await fetch(url, parametros);
    let json = await response.json();
    console.log(json, "soy el usuario a editar")
    return json;
  }

  export function deleteContactos(num, key) {
    const parametros = {
      method: "DELETE",
      headers: {
        'token': key
      },
      json: true,
    }
    let url = 'http://localhost:4000/contactos/' + num;
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
        alertify.message('Contactos borrados')
        let mensaje = document.getElementsByClassName("ajs-message")[0];
        mensaje.style.background = "#1D72C2"
        mensaje.style.color = "white"
        setTimeout(function () {
          document.location.reload();
        }, 2000);
      }
    )
    .catch(error => {
      console.error(error, ' error')
      alertify.alert(error.message);
    })
  }
  

  export async function fetchRegion(id) {
    let url = 'http://localhost:4000/region/' + id;
    let response = await fetch(url);
    let json = await response.json();
    //console.log(json)
    return json;
  }

  export async function fetchPais(id) {
    let url = 'http://localhost:4000/pais/' + id;
    let response = await fetch(url);
    let json = await response.json();
    //console.log(json)
    return json;
  }
  
  export async function fetchCiudad(id) {
    let url = 'http://localhost:4000/ciudad/' + id;
    let response = await fetch(url);
    let json = await response.json();
    //console.log(json)
    return json;
  }
  
  export async function fetchCompania(id) {
    let url = 'http://localhost:4000/compania/' + id;
    let response = await fetch(url);
    let json = await response.json();
    //console.log(json)
    return json;
  }

  export async function fetchContactos() {
    let url = 'http://localhost:4000/contactos';
    let response = await fetch(url);
    let json = await response.json();
    //console.log(json)
    return json;
  }