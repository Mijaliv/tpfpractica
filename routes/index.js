var express = require('express');
var router = express.Router();
const controllers = require('../controllers/controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
const obtenerNombresOficinas = (req, res, next) => {
    const db = req.app.get("db");
    const query = "SELECT id, denominacion FROM oficina";
    db.query(query, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        res.locals.oficinas = rows;
        next();
    });
};

router.get('/personas', controllers.listPersonas);
router.get('/agregar', obtenerNombresOficinas, controllers.agregarPersona); 
router.post("/agregar", controllers.postAgregarPersona);
router.get('/edit/:id', obtenerNombresOficinas,controllers.getEditarPersona);
router.post('/update/:id', controllers.postUpdatePersona);
router.get('/delete/:id', controllers.getDeletePersona);
router.post('/delete/:id', controllers.postDeletePersona);
router.get('/buscar', controllers.buscarPersona);
router.post('/resultados', controllers.buscarPersonaResultados);

router.get('/oficinas', controllers.listOficinas);
router.get('/agregar_oficina', controllers.agregarOficina);
router.post("/agregar_oficina", controllers.postAgregarOficina);
router.get('/edit_oficina/:id', controllers.getEditarOficina);
router.post('/update_oficina/:id', controllers.postUpdateOficina);
router.get('/delete_oficina/:id', controllers.getDeleteOficina);
router.post('/delete_oficina/:id', controllers.postDeleteOficina);
router.get('/buscar_oficina', controllers.buscarOficina);
router.post('/resultados_oficina', controllers.buscarOficinaResultados);



module.exports = router;