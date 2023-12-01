const { request, response } = require('express');
const { validationResult } = require('express-validator');

/** 
 * @param {request} req 
 * @param {response} res 
 */
const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validarCampos
}
