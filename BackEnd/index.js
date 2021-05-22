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
server.post('/paises',(req,res) =>{
    const {region_id,nombre} = req.body;
    console.log(region_id, nombre)
    sequelize.query("INSERT INTO paises (region_id, nombre) VALUE(?,?)",{
        replacements:[region_id,nombre],
        type:sequelize.QueryTypes.INSERT
    })
    .then(()=>{
        res.status(200).json({
            mensaje: "todo correcto mi pana"
        })
    })
})

//guardar region nueva
server.post('/regiones',(req,res) =>{
  const {nombre} = req.body;
  sequelize.query("INSERT INTO regiones (nombre) VALUE(?)",{
      replacements:[nombre],
      type:sequelize.QueryTypes.INSERT
  })
  .then(()=>{
      res.status(200).json({
          mensaje: "todo correcto mi pana"
      })
  })
})


//extraer todas las regiones
server.get("/regiones", (req,res) =>{
    sequelize
      .query("SELECT * FROM regiones", {
        type: sequelize.QueryTypes.SELECT
      })
      .then(results => {
        res.json(results);
      });
})

//extraer paises segun la region
server.get("/paises/:id", (req,res) =>{
    let {id} = req.params;
    //console.log(req.params.id, 'soy el id')
    //console.log(id)
    sequelize
      .query("SELECT * FROM `paises` WHERE `region_id` = ? ",{
        replacements : [id],
        type: sequelize.QueryTypes.SELECT
      })
      .then(results => {
        res.json(results);
      });
})

//extraer la ciudad segun el pais
server.get("/ciudades/:id", (req,res) =>{
    let id = req.params.id;
    //console.log(req.params.id, 'soy el id')
    //console.log(id)
    sequelize
      .query("SELECT * FROM `ciudades` WHERE `pais_id` = ? ",{
        replacements : [id],
        type: sequelize.QueryTypes.SELECT
      })
      .then(results => {
        console.log(results, "soy result", id)
        res.json(results);
      });
})



server.listen(4000, function () {
    console.log('ya estoy corriendo mi bro en el 4000')
});