const { request, response } = require('express');
const { Usuario } = require('../src/models')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

/**
 * @param {request} req 
 * @param {response} res 
 */
const register = async(req, res) => {    

    const { username, email, password } = req.body;

    const salt = bcryptjs.genSaltSync();
    const clave = bcryptjs.hashSync(password, salt);
    
    const usuario = await Usuario.create({username, email, password: clave});

    res.json({
        msg: 'Usuario creado exitosamente',
        usuario
    });
}

/** 
 * @param {request} req 
 * @param {response} res 
 */
const login = async(req, res) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({where: {email}});        
        

        //Validación de existencia de correo
        if(!usuario){
            return res.status(400).json({
                msg: 'El correo o clave no son correctos'
            });
        }

        //Validación de usuario valido
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El usuario esta deshabilitado se recomienda contactarse con el administrador del sistema'
            });
        }

        //Verificación de clave
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'El correo o clave no son correctos'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario);

        res.json({
            token
        });


    } catch (error) {

        res.status(500).json({
            msg: 'Hable con el administrador del API'
        });
        
    }

}

module.exports = {
    register,
    login
}