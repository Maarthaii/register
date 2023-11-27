// import mysql from 'mysql';
// import express  from 'express';
// import morgan from 'morgan';
// import path from 'path';
const mysql =require('mysql');
const express =require('express'); 
const morgan =require('morgan');
const path =require('path');
const cors =require('cors');


const server=express();
const port=3000;

server.use(morgan('dev'));

// Ruta estática para archivos publicos
// https://localhost:3000/
// server.use('/', express.static(path.join('./public')));

server.use('/', express.static(path.join(__dirname, './public')));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors());

const entity = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '30888898Liyi',
    port: '3306',
    database: 'usuario'
  })

  // server.post('/persona', (req, res) => {
  //   //primero descomponemos el objeto body
  //   const { identificacion,nombre, direccion, ciudad, codigo, telefono, correo } = req.body;

  //   entity.query(
  //       'INSERT INTO persona ( identificacion,nombre, direccion, ciudad, codigo, telefono, correo) VALUES (?, ?, ?, ?, ?, ?, ?)', 
  //       [ identificacion,nombre, direccion, ciudad, codigo, telefono, correo],
  //       (err, result) => {
  //         console.log(err, result)
  //         res.json(result)
  //       }
  //     )
  // })

  server.post('/persona', (req, res) => {
    //primero descomponemos el objeto body
    const { identificacion,nombre, direccion, ciudad, codigo, telefono, correo } = req.body;

    entity.query(
        "INSERT INTO persona ( identificacion,nombre, direccion, ciudad, codigo, telefono, correo) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [ identificacion,nombre, direccion, ciudad, codigo, telefono, correo],
        (err, result) => {
          if (err) {
              console.error('Error al ejecutar la consulta SQL:', err);
              res.status(500).send('Error al insertar en la base de datos');
          } else {
              console.log('Datos insertados correctamente:', result);
              res.json(result);
          }
      }
      )
  })

  
server.listen(port, ()=> {
    console.log(`\n Server is running on port ${port}`)
    console.log(`click here: http://localhost:${port}\n`)
})

// const conection=mysql.createConnection({
//     host:'localhost',
//     user:'Liyimar',
//     password:'',
//     port:3306,
//     database:'usuario'
// })

// conection.connect( (err)=>{
//     if(err) throw err
//     console.log("La conexion funciona correctamente")
// }) 



// server.post('/persona', (req, res) => {

// })
// req es un objeto con la petición, res es un objeto que maneja lo que se responde de esa ruta
// son configuracioens, recuerda que todo lo que usa use son configuraciones
//para qué es cors?? es para evitar el error de Cross Origin. no me voy a detener a explicarlo porque es muy técnica y capaz me enredo yo mismo. solo sigue las instrucciones y cuando termines me mandas foto






// // conection.query("SELECT * FROM personas", (err, rows) =>{
// //     if(err) throw err
// //     console.log(rows)
// // })
// function update(){
//     conection.query("INSERT INTO `personas`(`id`, `identificacion`, `nombres`, `direccion`, `ciudad`, `codigo_postal`, `telefono`, `email`) VALUES ('$identificacion','$nombre','$direccion','$ciudad','$codigo','$telefono','$correo')"
//     , (err, rows) =>{
//         if(err) throw err
//         console.log(rows)
//     })
// }
// conection.end();