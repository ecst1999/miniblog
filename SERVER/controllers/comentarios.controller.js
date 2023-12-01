const { request, response } = require('express')
const { Comentario } = require('../src/models');

/**
 * @param {request} req 
 * @param {response} res 
 */
const obtenerComentarios = async(req, res) => {    

    const comentarios = await Comentario.findAll({where: {estado: true}});

    res.json(comentarios);
}

/** 
 * @param {request} req 
 * @param {response} res 
 */
const crearComentario = async(req, res) => {

    const {id} = req.usuario;        

    const { contenido, publicacion } = req.body;
    const comentario = await Comentario.create({contenido, usuarioId: id, publicacioneId: publicacion});

    res.json(comentario);
}

module.exports = {
    obtenerComentarios,
    crearComentario
}