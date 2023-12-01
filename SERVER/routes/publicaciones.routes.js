const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerPublicaciones, crearPublicacion } = require('../controllers/publicaciones.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', obtenerPublicaciones);

router.post('/', [
    validarJWT,
    check('titulo', 'El título es obligatorio').not().isEmpty(),
    check('contenido', 'El contenido es obligatorio').not().isEmpty(),    
    validarCampos
], crearPublicacion);

module.exports = router;