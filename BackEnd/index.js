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
//guardar un pais nuevo
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


server.put("/ciudades/:id", async function (req, res) {
  const a = req.params.id;
  const {
    name
  } = req.body
  console.log(name, "soy nombre")
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

async function traerPais(id) {
  const res = await sequelize.query('SELECT * FROM paises WHERE paises.id = ?', {
    replacements: [id],
    type: sequelize.QueryTypes.SELECT
  });
  return res;
}

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
  //console.log(req.params.id, 'soy el id')
  //console.log(id)
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
  //console.log(req.params.id, 'soy el id')
  //console.log(id)
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

server.get('/usuarios', (req,res) =>{
  sequelize
  .query("SELECT * FROM `usuarios`", {
    type: sequelize.QueryTypes.SELECT
  })
  .then(results => {
    res.json(results);
  });
})

server.post("/usuarios", (req, res) => {
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



server.listen(4000, function () {
  console.log('ya estoy corriendo mi bro en el 4000')
});