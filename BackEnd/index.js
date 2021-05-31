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

async function validarSiExiste(req, res, next){
  const usuarios = await traerUsuarios();
  const {email} = req.body;

  const i = usuarios.findIndex(c => {
      return c.email == email; ``
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

function isAdmin(req,res,next){
  const token = req.headers['access_token']
  let usuario = traerUsuario();
  console.log(usuario +' '+password); //este es admin
  const decoded = jwt.verify(token, signature);
  console.log(decoded);
  if(decoded.usuario == usuario && decoded.password == password){
      return next();
  }else{
      res.status(403).json({
          auth:false,
          message: 'no tienes permisos para esta accion'
      })
  }
}

function validartoken(req,res,next){
  try {
      const token = req.headers.token;
      console.log(token);
      const validData = jwt.verify(token, signature);
      console.log(validData);
      if (validData) {
        req.userData = validData.userData;
        next();
      }
    } catch (err) {
      // res.statusMessage = ' xd ';
      res.status(401).json({success: false, mensaje: "Error al validar usuario. Prueba un token válido."});
    }
}

function getToken(data){
  const resp = jwt.sign(data, signature);
  return resp;
}

//SECCION DEL LOGIN
async function validarLogin(req, res, next) {
  const usuarios = await traerUsuarios();
  let {nombre, password} = req.body;
  nombre = nombre.trim();
  password = password.trim()
  const i = usuarios.findIndex(c => {
      return c.nombre == nombre; 
  })
  console.log(i, "soy i")
  if( i > -1){
      let e = usuarios[i];
      if(e.password == password){
          next();
      }
      else{
          return res.status(409)
          .send({
              status: 'Error',
              mensaje: 'el contacto no existe o los datos son incorrectos'
          });
      }
  }
  //console.log(usuarios)
  if (i == -1) {
      return res.status(409)
          .send({
              status: 'Error',
              mensaje: 'el contacto no existe'
          });
  }
  return next();
}

server.post("/login", validarLogin, (req,res) =>{
  const usuario = req.body;
  res.status(200).json({
    status: "Ok",
    mensaje: "Sesion iniciada",
    token: getToken(usuario)
  })
})



//SECCION DE COMPAÑIAS
server.get("/companias", (req,res)=>{
  sequelize
    .query("SELECT * FROM companias", {
      type: sequelize.QueryTypes.SELECT
    })
    .then(results => {
      res.json(results);
    });
})

server.post('/companias', (req, res) => {
  const {
nombre, pais, direccion
  } = req.body;
  sequelize.query("INSERT INTO companias (nombre, pais, direccion) VALUE(?,?,?)", {
      replacements: [nombre, pais , direccion],
      type: sequelize.QueryTypes.INSERT
    })
    .then(() => {
      res.status(200).json({
        mensaje: "todo correcto compañia ingresada"
      })
    })
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
server.delete("/paises/:id",(req, res) => {
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

server.get("/usuario/:id", async function (req,res){
  const {id} = req.params;
  console.log(id, 'xd')
  const respuesta = await sequelize.query('SELECT * FROM usuarios WHERE usuarios.id = ?', {
    replacements: [id],
    type: sequelize.QueryTypes.SELECT
  });
  res.status(200).json(respuesta)
})

server.put("/usuarios/admin/:id", (req,res)=>{
  const {id} = req.params;
  sequelize.query("UPDATE `usuarios` SET `admin` = 1 WHERE `usuarios`.`id` = ?",
          {
              replacements:[
                  id
              ],
              type: sequelize.QueryTypes.UPDATE
          }
      )
      .then(()=>{
          res.status(200).json({
              "status" : "ok",
              "mensaje": "el usuario ha sido admin"
          })
      })
}) 

server.put('/usuarios/:id', validartoken, function(req,res){
  const {id} = req.params;
  const {nombre,apellido,email,direccion} = req.body;
      sequelize.query("UPDATE `usuarios` SET `nombre` = ?, `apellido` = ?, `email` = ?, `direccion` = ? WHERE `usuarios`.`id` = ?",
          {
              replacements:[
                  nombre,
                  apellido,
                  email,
                  direccion,
                  id
              ],
              type: sequelize.QueryTypes.UPDATE
          }
      )
      .then(()=>{
          res.status(200).json({
              "status" : "ok",
              "mensaje": "el usuario ha sido actualizado"
          })
      })
})

server.get('/usuarios', (req,res) =>{
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

server.delete("/usuarios/:id", (req, res) => {
  let {
    id
  } = req.params
  sequelize
    .query("DELETE  FROM `usuarios` WHERE `id` = ? ", {
      replacements: [id],
      type: sequelize.QueryTypes.DELETE
    })
    .then(results => {
      res.json(results);
    });
})



server.listen(4000, function () {
  console.log('ya estoy corriendo mi bro en el 4000')
});