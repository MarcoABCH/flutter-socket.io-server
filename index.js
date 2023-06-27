const express = require('express');
const path = require('path');
//Es para utilizar variables de entorno [Similar al webConfig IIS]
require('dotenv').config();//Debe haber un archivo .env

//App de express
const app = express();

//Node server
const server = require('http').createServer(app);
//Lo exportamos para los archivos que consumen este index.js y que lo requieran
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

//Definamos nuestra url propia y la carpeta principal donde se cargara nuestro proyecto
//Equivale al wwwroot en asp.net con IIS
const publicPath = path.resolve( __dirname, 'public');

//usamos el path en nuestra app
app.use( express.static( publicPath ) );

server.listen( process.env.PORT, (err) => {
    if ( err ) throw new Error(err);

    console.log('Servidor ejecutandose en puerto con nodemon!!', process.env.PORT );
});

