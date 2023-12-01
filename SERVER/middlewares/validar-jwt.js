const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const { Usuario } = require('../src/models');

/** 
 * @param {request} req 
 * @param {response} res  
 */
const validarJWT = async (req, res, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRET_TOKEN_APP);

        //Leer el usuario 
        const usuario = await Usuario.findByPk(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido'
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido'
            })
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);        

        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}