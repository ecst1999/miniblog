const { Router } = require('express');
const { obtenerComentarios, crearComentario } = require('../controllers/comentarios.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', obtenerComentarios);

router.post('/', [
    validarJWT,
    check('contenido', 'El contenido es obligatorio').not().isEmpty(),    
    check('publicacion', 'La publicación es obligatoria').not().isEmpty(),
    validarCampos
], crearComentario);

module.exports = router;