const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    //host: 'mysql',
    user: 'root',
    password: '1234',
});

//Conectarnos al servidor
db.connect((err) => {
    if (err) {
        console.log("Error en la conexion al server");
        return;
    }

    // Verificar si existe la base de datos
    db.query("CREATE DATABASE IF NOT EXISTS cruddb", (err) => {
        if (err) {
            console.log("Error al crear la db");
            return;
        }
        console.log("DB creada o ya existente");
    });

    // Seleccionar base de datos
    db.query("USE cruddb", (err) => {
        if (err) {
            console.log("Error al seleccionar la db");
            return;
        }
        console.log("Conexion exitosa");
    });

    // Verificar si existe la tabla persona
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS persona (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255),
            email VARCHAR(255)
        ) 
    `;

    db.query(createTableSQL, (err) => {
        if (err) {
            console.log("Error al crear la tabla");
            return;
        }
    });


});

module.exports = db;