const mysql =require('mysql');

const conection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"usuario"

})

conection.connect( (err)=>{
    if(err) throw err
    console.log("La conexion funciona correctamente")
}) 

// conection.query("SELECT * FROM personas", (err, rows) =>{
//     if(err) throw err
//     console.log(rows)
// })

function update(){
    conection.query("INSERT INTO `personas`(`id`, `identificacion`, `nombres`, `direccion`, `ciudad`, `codigo_postal`, `telefono`, `email`) VALUES ('$identificacion','$nombre','$direccion','$ciudad','$codigo','$telefono','$correo')"
    , (err, rows) =>{
        if(err) throw err
        console.log(rows)
    })
}


// 
//conection.query("INSERT INTO `personas`(`identificacion`, `nombres`, `direccion`, `ciudad`, `codigo_postal`, `telefono`, `email`) VALUES ('$identificacion','$nombre','$direccion','$ciudad','$codigo','$telefono','$correo')")

conection.end();