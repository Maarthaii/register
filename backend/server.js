const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: "localhost:3306",
  user: "root",
  password: "",
  database: "facturacion",
});

app.post("/", (req, res) => {

  app.get("/", (req, res) => {
    res.send("¡Hola, mundo!"); 
  });
  

  const datos = req.body;

  connection.query(
    "INSERT INTO facturacion (identificacion, nombre, direccion, ciudad, codigo_postal, telefono, correo) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [datos.identificacion, datos.nombre, datos.direccion, datos.ciudad, datos.codigo_postal, datos.telefono, datos.correo],
    (error, results) => {
      if (error) {
        res.json({ message: "Error al guardar en la base de datos" });
      } else {
        res.json({ message: "Datos guardados con éxito" });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3008");
});
