var express = require('express');

const listPersonas = (req, res, next) => {
    const db = req.app.get("db");
    const query = "SELECT persona.nombre,persona.id, persona.email, oficina.denominacion AS nombre_oficina FROM persona JOIN oficina ON persona.oficina_id = oficina.id";
    db.query(query, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        res.render("personas", { personas: rows, title: "Lista" });
    });
};

const agregarPersona = function(req, res, next) {
    res.render('agregar', { title: "Agregar" });
}

const postAgregarPersona = function(req, res, next) {
    const db = req.app.get("db");
    const { nombre, email, oficina } = req.body; // Asumiendo que el campo de selección de oficina se llama 'oficina' en el formulario

    const query = "INSERT INTO persona (nombre, email, oficina_id) VALUES (?, ?, ?)";
    db.query(query, [nombre, email, oficina], function(err) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/personas");
    });
};


const getEditarPersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;

    db.query("SELECT * FROM persona WHERE id = (?)", [id], function(err, persona) {
        if (err) {
            console.error(err);
            return;
        }

        db.query("SELECT id, denominacion FROM oficina", function(err, oficinas) {
            if (err) {
                console.error(err);
                return;
            }

            res.render('edit', { 
                item: persona[0], 
                oficinas: oficinas,
                title: "Editar Persona" 
            });
        });
    });
};


const postUpdatePersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    var nombre = req.body.nombre;
    var email = req.body.email;
    var oficina_id = req.body.oficina_id;

    db.query("UPDATE persona SET nombre=?, email=?, oficina_id=? WHERE id=?", [nombre, email, oficina_id, id], function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/personas');
    });
};


const getDeletePersona = (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM persona WHERE id=?", id, function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('borrar', { item: rows[0], title: "Borrar" });
    });
}

const postDeletePersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("DELETE FROM persona WHERE id=?", id, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/personas');
    });
}

const buscarPersona = (req, res, next) => {
    res.render('busqueda', { title: "Buscar" });
}

const buscarPersonaResultados = (req, res, next) => {
    const db = req.app.get("db");
    const keyword = req.body.keyword;
    const query = 'SELECT * FROM persona WHERE nombre LIKE ?';
    db.query(query, [`%${keyword}%`], (err, rows) => {
        if (err) throw err;
        res.render('resultados', { personas: rows, title: "Resultados" })
    });
}

//OFICINAS

const listOficinas = (req, res, next) => {
    const db = req.app.get("db");
    const query = "SELECT * from oficina";
    db.query(query, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        res.render("oficinas", { oficinas: rows, title: "Lista de Oficinas" });
    })
}

const agregarOficina = function(req, res, next) {
    res.render('agregar_oficina', { title: "Agregar Oficina" });
}

const postAgregarOficina = function(req, res, next) {
    const db = req.app.get("db");
    const denominacion = req.body.Denominacion;
    const query = "INSERT into oficina (denominacion) VALUES (?)";
    db.query(query, [denominacion], function(err) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/oficinas");
    })
}

const getEditarOficina = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM oficina WHERE id=(?)", [id], function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('edit_oficina', { item: rows[0], title: "Editar Oficina" });
    });
}

const postUpdateOficina = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    var denominacion = req.body.Denominacion;
    console.log("Valor de denominacion:", denominacion); // Agregar esta línea para verificar el valor
    db.query("UPDATE oficina SET denominacion=? WHERE id=?", [denominacion, id], function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/oficinas');
    });
}

const getDeleteOficina = (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM oficina WHERE id=?", id, function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('borrar_oficina', { item: rows[0], title: "Borrar Oficina" });
    });
}

const postDeleteOficina = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("DELETE FROM oficina WHERE id=?", id, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/oficinas');
    });
}

const buscarOficina = (req, res, next) => {
    res.render('busqueda_oficinas', { title: "Buscar Oficina" });
}

const buscarOficinaResultados = (req, res, next) => {
    const db = req.app.get("db");
    const keyword = req.body.keyword;
    const query = 'SELECT * FROM oficina WHERE denominacion LIKE ?';
    db.query(query, [`%${keyword}%`], (err, rows) => {
        if (err) throw err;
        res.render('resultados_oficinas', { oficinas: rows, title: "Resultados de Oficinas" })
    });
}


module.exports = {
    listPersonas,
    agregarPersona,
    postAgregarPersona,
    getEditarPersona,
    postUpdatePersona,
    getDeletePersona,
    postDeletePersona,
    buscarPersona,
    buscarPersonaResultados,
    listOficinas,
    agregarOficina,
    postAgregarOficina,
    getEditarOficina,
    postUpdateOficina,
    getDeleteOficina,
    postDeleteOficina,
    buscarOficina,
    buscarOficinaResultados
};