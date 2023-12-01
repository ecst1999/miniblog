const jwt = require('jsonwebtoken');

const generarJWT = (usuario) => {

    return new Promise((resolve, reject) => {

        const payload = {username: usuario.username, email: usuario.email, uid: usuario.id};

        jwt.sign(payload, process.env.SECRET_TOKEN_APP, {
            expiresIn: '2H'
        }, (err, token) => {
            
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }

        })
    });

}

module.exports = {
    generarJWT
}