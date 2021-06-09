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
