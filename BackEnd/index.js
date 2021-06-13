const express = require('express');
const compression = require('compression');
const server = express();
const sequelize = require('./conexionDB');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const signature = 'ju4n3s'
server.use(cors());
server.use(express.json());
server.use(compression());

async function validarSiExiste(req, res, next) {
  const usuarios = await traerUsuarios();
  const {
    email
  } = req.body;
  console.log("si verifico")
  const i = usuarios.findIndex(c => {
    return c.email == email;
  })
  //console.log(i)
  if (i >= 0) {
    return res.status(409)
      .json({
        status: 'Error',
        mensaje: 'El contacto ya existe'
      });
  }
  return next();
}

async function isAdmin(req, res, next) {
  const token = req.headers['token']
  const decoded = jwt.verify(token, signature);
  console.log(decoded, " soy decoded");
  let j;
  const usuarios = await traerUsuarios();
  const i = usuarios.findIndex(c => {
    return c.nombre == decoded.nombre;
  })
  if (i > -1) {
    let e = usuarios[i];
    if (e.password == decoded.password) {
      j = usuarios[i];
    }
  }
  if (j.admin == 1) {
    return next();
  } else {
    res.status(403).json({
      auth: false,
      message: 'No tienes permisos para esta accion'
    })
  }
}

function validartoken(req, res, next) {
  const {
    token
  } = req.headers;
  try {
    
    console.log(token, "si valido");
    const validData = jwt.verify(token, signature);
    if (validData) {
      req.userData = validData.userData;
      next();
    }
  } catch (err) {
    // res.statusMessage = ' xd ';
    res.status(401).json({
      success: false,
      mensaje: "Error al validar usuario. Prueba un token válido."
    });
  }
}


function getToken(data) {
  const resp = jwt.sign(data, signature);
  return resp;
}


//SECCION DEL LOGIN
async function validarLogin(req, res, next) {
  const usuarios = await traerUsuarios();
  let {
    nombre,
    password
  } = req.body;
  nombre = nombre.trim();
  password = password.trim()
  const i = usuarios.findIndex(c => {
    return c.nombre == nombre;
  })
  console.log(i, "soy i")
  if (i > -1) {
    let e = usuarios[i];
    if (e.password == password) {
      req.Objeto = usuarios[i];
      next();
    } else {
      return res.status(409)
        .send({
          status: 'Error',
          mensaje: 'El contacto no existe o los datos son incorrectos'
        });
    }
  }
  //console.log(usuarios)
  if (i == -1) {
    return res.status(409)
      .send({
        status: 'Error',
        mensaje: 'El contacto no existe'
      });
  }
}

server.post("/login", validarLogin, function (req, res) {
  const x = req.Objeto
  console.log(x);
  let token;
  const usuario = req.body;
  token = getToken(usuario);
  res.status(200).json({
    status: "Ok",
    mensaje: "Sesion iniciada",
    token: token,
    admin: x.admin
  })
})



//SECCION DE COMPAÑIAS
server.get("/companias", (req, res) => {
  sequelize
    .query("SELECT * FROM companias", {
      type: sequelize.QueryTypes.SELECT
    })
    .then(results => {
      res.json(results);
    });
})

server.post('/companias', validartoken, (req, res) => {
  const {
    nombre,
    pais,
    direccion
  } = req.body;
  sequelize.query("INSERT INTO companias (nombre, pais, direccion) VALUE(?,?,?)", {
      replacements: [nombre, pais, direccion],
      type: sequelize.QueryTypes.INSERT
    })
    .then(() => {
      res.status(200).json({
        mensaje: "todo correcto compañia ingresada"
      })
    })
})

server.get("/compania/:id", async function (req, res) {
  const {
    id
  } = req.params;
  console.log(id, 'xd')
  const respuesta = await sequelize.query('SELECT * FROM companias WHERE companias.id = ?', {
    replacements: [id],
    type: sequelize.QueryTypes.SELECT
  });
  res.status(200).json(respuesta)
})

async function traerCompania(id) {
  const res = await sequelize.query('SELECT * FROM companias WHERE companias.id = ?', {
    replacements: [id],
    type: sequelize.QueryTypes.SELECT
  });
  return res;
}


server.put("/companias/:id", validartoken, async function (req, res) {
  const id = req.params.id;
  const {
    nombre,
    pais,
    direccion
  } = req.body
  console.log(nombre, "soy nombre")
  const compania = await traerCompania(id);
  if (compania[0]) {
    sequelize.query("UPDATE `companias` SET `nombre` = ?, pais = ?, direccion = ? WHERE `companias`.`id` = ?", {
        replacements: [
          nombre,
          pais,
          direccion,
          id
        ],
        type: sequelize.QueryTypes.UPDATE
      })
      .then(() => {
        res.status(200).json({
          "status": "ok",
          "mensaje": "la compania ha sido modificada con exito"
        })
      })
  } else {
    res.status(400).json({
      "mensaje": "No existe una compañia con ese id"
    });
  }
});


server.delete("/companias/:id", validartoken, (req, res) => {
  let {
    id
  } = req.params;
  //console.log(req.params.id, 'soy el id')
  //console.log(id)
  sequelize
    .query("DELETE  FROM `companias` WHERE `id` = ? ", {
      replacements: [id],
      type: sequelize.QueryTypes.DELETE
    })
    .then(results => {
      res.json(results);
    });
})



//SECCION DE REGIONES-CIUDADES
server.post('/paises', (req, res) => {
  const {
    region_id,
    nombre
  } = req.body;
  console.log(region_id, nombre)
  sequelize.query("INSERT INTO paises (region_id, nombre) VALUE(?,?)", {
      replacements: [region_id, nombre],
      type: sequelize.QueryTypes.INSERT
    })
    .then(() => {
      res.status(200).json({
        mensaje: "todo correcto mi pana"
      })
    })
})

//eliminar un pais
server.delete("/paises/:id", (req, res) => {
  let {
    id
  } = req.params;
  //console.log(req.params.id, 'soy el id')
  //console.log(id)
  sequelize
    .query("DELETE  FROM `paises` WHERE `id` = ? ", {
      replacements: [id],
      type: sequelize.QueryTypes.DELETE
    })
    .then(results => {
      res.json(results);
    });
})

//eliminar una ciudad
server.delete("/ciudades/:id", (req, res) => {
  let {
    id
  } = req.params
  sequelize
    .query("DELETE  FROM `ciudades` WHERE `id` = ? ", {
      replacements: [id],
      type: sequelize.QueryTypes.DELETE
    })
    .then(results => {
      res.json(results);
    });
})

//editar el nombre de un pais
server.put("/paises/:id", async function (req, res) {
  const a = req.params.id;
  const {
    name
  } = req.body
  console.log(name, "soy nombre")
  const pais = await traerPais(a);
  if (pais[0]) {
    sequelize.query("UPDATE `paises` SET `nombre` = ? WHERE `paises`.`id` = ?", {
        replacements: [
          name,
          a
        ],
        type: sequelize.QueryTypes.UPDATE
      })
      .then(() => {
        res.status(200).json({
          "status": "ok",
          "mensaje": "el pais ha sido modificado con exito"
        })
      })
  } else {
    res.status(400).json({
      "mensaje": "No existe un pais con ese id"
    });
  }
});

//guardar una ciudad nueva
server.post('/ciudades', (req, res) => {
  const {
    pais_id,
    nombre
  } = req.body;
  sequelize.query("INSERT INTO ciudades (pais_id, nombre) VALUE(?,?)", {
      replacements: [pais_id, nombre],
      type: sequelize.QueryTypes.INSERT
    })
    .then(() => {
      res.status(200).json({
        mensaje: "todo correcto mi pana"
      })
    })
})

//editar el nombre de un ciudad
server.put("/ciudades/:id", async function (req, res) {
  const a = req.params.id;
  const {
    name
  } = req.body
  const pais = await traerCiudad(a);
  if (pais[0]) {
    sequelize.query("UPDATE `ciudades` SET `nombre` = ? WHERE `paises`.`id` = ?", {
        replacements: [
          name,
          a
        ],
        type: sequelize.QueryTypes.UPDATE
      })
      .then(() => {
        res.status(200).json({
          "status": "ok",
          "mensaje": "el pais ha sido modificado con exito"
        })
      })
  } else {
    res.status(400).json({
      "mensaje": "No existe un pais con ese id"
    });
  }
});


//guardar region nueva
server.post('/regiones', (req, res) => {
  const {
    nombre
  } = req.body;
  sequelize.query("INSERT INTO regiones (nombre) VALUE(?)", {
      replacements: [nombre],
      type: sequelize.QueryTypes.INSERT
    })
    .then(() => {
      res.status(200).json({
        mensaje: "todo correcto mi pana"
      })
    })
})

server.get("/pais/:id", (req, res) => {
  let {
    id
  } = req.params;
  sequelize
    .query("SELECT * FROM `paises` WHERE `id` = ? ", {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT
    })
    .then(results => {
      res.json(results);
    });
})

server.get("/region/:id", (req, res) => {
  let {
    id
  } = req.params;
  sequelize
    .query("SELECT * FROM `regiones` WHERE `id` = ? ", {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT
    })
    .then(results => {
      res.json(results);
    });
})


server.get("/paises", (req, res) => {
  sequelize
    .query("SELECT * FROM `paises`", {
      type: sequelize.QueryTypes.SELECT
    })
    .then(results => {
      res.json(results);
    });
})

// traer pais en especifico
async function traerPais(id) {
  const res = await sequelize.query('SELECT * FROM paises WHERE paises.id = ?', {
    replacements: [id],
    type: sequelize.QueryTypes.SELECT
  });
  return res;
}

//traer ciudad en especifico
async function traerCiudad(id) {
  const res = await sequelize.query('SELECT * FROM ciudades WHERE paises.id = ?', {
    replacements: [id],
    type: sequelize.QueryTypes.SELECT
  });
  return res;
}



//extraer todas las regiones
server.get("/regiones", (req, res) => {
  sequelize
    .query("SELECT * FROM regiones", {
      type: sequelize.QueryTypes.SELECT
    })
    .then(results => {
      res.json(results);
    });
})

//extraer paises segun la region
server.get("/paises/:id", (req, res) => {
  let {
    id
  } = req.params;
  sequelize
    .query("SELECT * FROM `paises` WHERE `region_id` = ? ", {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT
    })
    .then(results => {
      res.json(results);
    });
})

//extraer la ciudad segun el pais
server.get("/ciudades/:id", (req, res) => {
  let id = req.params.id;
  sequelize
    .query("SELECT * FROM `ciudades` WHERE `pais_id` = ? ", {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT
    })
    .then(results => {
      console.log(results, "soy result", id)
      res.json(results);
    });
})

server.get("/ciudades", (req, res) => {
  sequelize
    .query("SELECT * FROM `ciudades`", {
      type: sequelize.QueryTypes.SELECT
    })
    .then(results => {
      //console.log(results, "soy result", id)
      res.json(results);
    });
})
//traer ciudad en especifico
server.get("/ciudad/:id", (req, res) => {
  let {
    id
  } = req.params;
  sequelize
    .query("SELECT * FROM `ciudades` WHERE `id` = ? ", {
      replacements: [id],
      type: sequelize.QueryTypes.SELECT
    })
    .then(results => {
      res.json(results);
    });
})

//SECCION DE CONTACTOS

server.get("/buscarContactos", (req, res) => {
  //console.log(req.query, "soy queriess ");
  let {
    nombre,
    email,
    ciudad,
    compania,
    cargo,
    ciudadesArray
  } = req.query;
  console.log(ciudadesArray, "ey bueno");
  let ciudadesArrayConvertido = ciudadesArray.split(",");
  let ciudadesArrayInt = ciudadesArrayConvertido.map(x => parseInt(x)) 
  //console.log(ciudadesArrayInt, "ey bueno2");
  sequelize.query("SELECT * FROM `contactos` WHERE `nombre` = :nom OR `email` = :ema OR `id_ciudad` = :ciu OR `id_compania` = :comp OR `cargo` = :car OR id_ciudad IN (:ids)", {
      replacements: {
        nom: nombre,
        ema:email,
        ciu : ciudad,
        comp : compania,
        car : cargo,
        ids: ciudadesArrayInt
      },
      type: sequelize.QueryTypes.SELECT
    })
    .then(results => {
      res.json(results);
    })
})

server.get('/contactos', (req, res) => {
  sequelize
    .query("SELECT * FROM `contactos`", {
      type: sequelize.QueryTypes.SELECT
    })
    .then(results => {
      res.json(results);
    });
})

server.get("/contacto/:id", async function (req, res) {
  const {
    id
  } = req.params;
  console.log(id, 'xd')
  const respuesta = await sequelize.query('SELECT * FROM contactos WHERE contactos.id = ?', {
    replacements: [id],
    type: sequelize.QueryTypes.SELECT
  });
  res.status(200).json(respuesta)
})

server.post("/contactos", validartoken, (req, res) => {
  let {
    name,
    email,
    id_ciudad,
    id_compania,
    cargo,
    interes,
  } = req.body
  sequelize.query("INSERT INTO contactos (nombre, email, id_ciudad, id_compania, cargo, interes) VALUE(?,?,?,?,?,?)", {
      replacements: [name,
        email,
        id_ciudad,
        id_compania,
        cargo,
        interes,
      ],
      type: sequelize.QueryTypes.INSERT
    })
    .then(() => {
      res.status(200).json({
        mensaje: "todo correcto mi pana"
      })
    })

})

server.put("/contactos/:id", validartoken, (req, res) => {
  let {
    name,
    email,
    id_ciudad,
    id_compania,
    cargo,
    interes,
  } = req.body
  const {
    id
  } = req.params;
  sequelize.query("UPDATE `contactos` SET `nombre` = ?, `email` = ?, `id_ciudad` = ?, `id_compania` = ?,`cargo` = ?, `interes` = ? WHERE `contactos`.`id` = ?", {
      replacements: [name,
        email,
        id_ciudad,
        id_compania,
        cargo,
        interes,
        id
      ],
      type: sequelize.QueryTypes.UPDATE
    })
    .then(() => {
      res.status(200).json({
        mensaje: "Contacto actualizado"
      })
    })
})

server.delete("/contactos/:id", validartoken, (req, res) => {
  let {
    id
  } = req.params
  sequelize
    .query("DELETE  FROM `contactos` WHERE `id` = ? ", {
      replacements: [id],
      type: sequelize.QueryTypes.DELETE
    })
    .then(results => {
      res.json({
        mensaje: "contacto borrado"
      });
    });
})




// SECCION DE USUARIOS

async function traerUsuario(id) {
  const res = await sequelize.query('SELECT * FROM usuarios WHERE usuarios.id = ?', {
    replacements: [id],
    type: sequelize.QueryTypes.SELECT
  });
  return res;
}


async function traerUsuarios() {
  const res = await sequelize.query('SELECT * FROM usuarios', {
    type: sequelize.QueryTypes.SELECT
  })
  return res;
}

server.get("/usuario/:id", async function (req, res) {
  const {
    id
  } = req.params;
  console.log(id, 'xd')
  const respuesta = await sequelize.query('SELECT * FROM usuarios WHERE usuarios.id = ?', {
    replacements: [id],
    type: sequelize.QueryTypes.SELECT
  });
  res.status(200).json(respuesta)
})

server.put("/usuarios/admin/:id", validartoken, isAdmin, (req, res) => {
  const {
    id
  } = req.params;
  sequelize.query("UPDATE `usuarios` SET `admin` = 1 WHERE `usuarios`.`id` = ?", {
      replacements: [
        id
      ],
      type: sequelize.QueryTypes.UPDATE
    })
    .then(() => {
      res.status(200).json({
        "status": "ok",
        "mensaje": "el usuario ha sido admin"
      })
    })
})

server.put('/usuarios/:id', validartoken, function (req, res) {
  const {
    id
  } = req.params;
  const {
    nombre,
    apellido,
    email,
    direccion
  } = req.body;
  sequelize.query("UPDATE `usuarios` SET `nombre` = ?, `apellido` = ?, `email` = ?, `direccion` = ? WHERE `usuarios`.`id` = ?", {
      replacements: [
        nombre,
        apellido,
        email,
        direccion,
        id
      ],
      type: sequelize.QueryTypes.UPDATE
    })
    .then(() => {
      res.status(200).json({
        "status": "ok",
        "mensaje": "el usuario ha sido actualizado"
      })
    })
})

server.get('/usuarios', (req, res) => {
  sequelize
    .query("SELECT * FROM `usuarios`", {
      type: sequelize.QueryTypes.SELECT
    })
    .then(results => {
      res.json(results);
    });
})

server.post("/usuarios", validartoken, validarSiExiste, (req, res) => {
  let {
    name,
    apellido,
    email,
    direccion,
    password
  } = req.body
  sequelize.query("INSERT INTO usuarios (nombre, apellido, email, direccion, password) VALUE(?,?,?,?,?)", {
      replacements: [name, apellido, email, direccion, password],
      type: sequelize.QueryTypes.INSERT
    })
    .then(() => {
      res.status(200).json({
        mensaje: "todo correcto mi pana"
      })
    })

})

server.delete("/usuarios/:id", validartoken, isAdmin, (req, res) => {
  let {
    id
  } = req.params
  sequelize
    .query("DELETE  FROM `usuarios` WHERE `id` = ? ", {
      replacements: [id],
      type: sequelize.QueryTypes.DELETE
    })
    .then(results => {
      res.json({
        mensaje: "usuario borrado"
      });
    });
})



server.listen(4000, function () {
  console.log('ya estoy corriendo mi bro en el 4000')
});