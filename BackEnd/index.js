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

server.listen(4000, function () {
    console.log('ya estoy corriendo mi bro en el 4000')
});