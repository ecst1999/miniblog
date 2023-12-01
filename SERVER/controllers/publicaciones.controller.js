const { request, response } = require('express')
const { Publicacione } = require('../src/models');

/** 
 * @param {request} req 
 * @param {response} res 
 */
const obtenerPublicaciones = async(req, res) => {
    const publicaciones = await Publicacione.findAll({where: {estado: true}});

    res.json(publicaciones);
}

/** 
 * @param {request} req 
 * @param {response} res 
 */
const crearPublicacion = async(req, res) => {

    const {id} = req.usuario;

    const { titulo, contenido } = req.body;

    const publicaciones = await Publicacione.create({titulo, contenido, usuarioId: id });

    res.json(publicaciones);
}

module.exports = {
    obtenerPublicaciones,
    crearPublicacion
}