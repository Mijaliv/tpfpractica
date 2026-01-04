const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');

db.serialize(() => {
    // Create oficina table
    db.run(`
        CREATE TABLE IF NOT EXISTS oficina (
            id_ofi INTEGER PRIMARY KEY AUTOINCREMENT,
            denominacion TEXT
        )
    `);

    // Create persona table
    db.run(`
        CREATE TABLE IF NOT EXISTS persona (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            email TEXT,
            oficina_id INTEGER,
            FOREIGN KEY (oficina_id) REFERENCES oficina(id_ofi)
        )
    `);

    // Insert sample data into oficina
    db.get("SELECT * FROM oficina", (err, row) => {
        if (!row) {
            const stmt = db.prepare("INSERT INTO oficina (denominacion) VALUES (?)");
            stmt.run("Contabilidad");
            stmt.run("Sistemas");
            stmt.finalize();
        }
    });

    // Insert sample data into persona
    db.get("SELECT * FROM persona", (err, row) => {
        if (!row) {
            const stmt = db.prepare("INSERT INTO persona (nombre, email, oficina_id) VALUES (?, ?, ?)");
            stmt.run("Juan Perez", "juan.perez@example.com", 1);
            stmt.run("Maria Lopez", "maria.lopez@example.com", 2);
            stmt.finalize();
        }
    });
});

module.exports = db;
