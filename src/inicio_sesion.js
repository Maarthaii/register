const express = require('express');
const mysql = require('mysql');
const path = require('path');
const {engine} =require('express-handlebars');
const bodyParser = require('body-parser');

const server = express();
const port = 3000;

server.use(bodyParser.urlencoded({ extended: true }));
server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', path.join(__dirname, './views'));
server.use('/', express.static(path.join(__dirname, './public')));

const entity = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '30888898Liyi',
    port: '3306',
    database: 'usuario'
});

server.get('/inicio_sesion', (req, res) => {
    res.render('inicio_sesion', {
        title: 'Login',
        style: [
            'inicio_sesion',
        'style'
    ]
    });
});

server.post('/login', (req, res) => {
    const { nombre, identificacion } = req.body;
    // Consulta la base de datos para verificar las credenciales del usuario
    entity.query(
        "SELECT * FROM persona WHERE nombre = ? AND identificacion = ?",
        [nombre, identificacion],
        (err, result) => {
            if (err) {
                console.error('Error al ejecutar la consulta SQL:', err);
                res.status(500).send('Error al autenticar al usuario');
            } else {
                // Verifica si se encontraron resultados en la base de datos
                if (result.length > 0) {
                    const userData = {
                        //id: result[0].id,
                        nombre: result[0].nombre,
                        identificacion: result[0].identificacion,
                        direccion: result[0].direccion,
                        ciudad: result[0].ciudad,
                        codigo: result[0].codigo,
                        telefono: result[0].telefono,
                        correo: result[0].correo
                    };
                    // Renderiza la plantilla 'usuario' con los datos del usuario
                    res.render('usuario', { user: userData });
                } else {
                    // Usuario no encontrado en la base de datos
                    res.status(404).send('Usuario no encontrado');
                }
            }
        }
    );
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`click here: http://localhost:${port}/inicio_sesion`)

});