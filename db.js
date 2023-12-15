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
        console.log("Error en la conexión al servidor");
        return;
    }

    // Verificar si existe la base de datos
    db.query("CREATE DATABASE IF NOT EXISTS cruddb2", (err) => {
        if (err) {
            console.log("Error al crear la base de datos");
            return;
        }
        console.log("Base de datos creada o ya existente");
    });

    // Seleccionar base de datos
    db.query("USE cruddb2", (err) => {
        if (err) {
            console.log("Error al seleccionar la base de datos");
            return;
        }
        console.log("Conexión exitosa a la base de datos");
    });

    // Verificar si existe la tabla oficina
    const createTableSQLoficina = `
    CREATE TABLE IF NOT EXISTS oficina (
        id_ofi INT AUTO_INCREMENT PRIMARY KEY,
        denominacion VARCHAR(255)
    )`;

    const createTableSQLpersona = `
    CREATE TABLE IF NOT EXISTS persona (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255),
        email VARCHAR(255),
        oficina_id INT,
        FOREIGN KEY (oficina_id) REFERENCES oficina(id_ofi)
    )`;

    db.query(createTableSQLoficina, (err) => {
        if (err) {
            console.log("Error al crear la tabla 'oficina'");
            return;
        }
        console.log("Tabla 'oficina' creada o ya existente");
    });

    db.query(createTableSQLpersona, (err) => {
        if (err) {
            console.log("Error al crear la tabla 'persona'");
            return;
        }
        console.log("Tabla 'persona' creada o ya existente");
    });
});

module.exports = db;
