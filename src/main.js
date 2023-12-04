/* // Sistemas de modulos ESModules (ESM)
import mysql from 'mysql';
import express  from 'express';
import morgan from 'morgan';
import path from 'path';
*/

//Sistema de modulos CommonJS
const mysql =require('mysql');
const express =require('express'); 
const morgan =require('morgan');
const path =require('path');
const cors =require('cors');
const {engine} =require('express-handlebars');
const bodyParser = require('body-parser');

//Declarar la variable y el puerto del servidor
const server=express();
const port=3000;

//CONFIGURACIONES

//Morgan lleva el registro de las solicitudes
server.use(morgan('dev'));
//Ruta para los archivos estaticos
server.use('/', express.static(path.join(__dirname, './public')));
//Interpreta las solicitudes en formato JSON
server.use(express.json());
//Parsear datos- tomar datos del formulario y convertilos en un lenguaje mas sencillo de interpretar del lado del servidor.
server.use(express.urlencoded({extended: false}));
server.use(cors());
//configuramos handlebars
server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
//localizacion de la plantilla
server.set('views', path.join(__dirname, './views'));

//Creamos las rutas 
server.get('/registro', (req, res)=>{
  // Renderizar la plantilla 'home' y pasar datos
res.render('registro',{
    title: 'Registro',
    style: [
    'style',
    'registro'
    ]
});
})


//CONEXION A LA BASE DE DATOS
const entity = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '30888898Liyi',
    port: '3306',
    database: 'usuario'
})

//RUTAS Y MANEJO DE SOLICITUDES
server.post('/persona', (req, res) => {
    //primero descomponemos el objeto body
    const { identificacion,nombre, direccion, ciudad, codigo, telefono, correo } = req.body;
    entity.query(
        "INSERT INTO persona ( identificacion,nombre, direccion, ciudad, codigo, telefono, correo) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [ identificacion,nombre, direccion, ciudad, codigo, telefono, correo],
        (err, result) => {
        if (err) {
              //console.error('Error al ejecutar la consulta SQL:', err);
            res.status(500).send('Error al insertar en la base de datos');
        } else {
            res.render('registro',{ mensaje:'Registro exitoso, ahora puedes iniciar sesion'})
            console.log('Datos insertados correctamente:', result);
              // res.json(result);
        }
}
      )
})

//ESCUCHA DEL SERVIDOR  
server.listen(port, ()=> {
    console.log(`\n Server is running on port ${port}`)
    console.log(`click here: http://localhost:${port}/registro`)
})
