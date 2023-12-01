const express = require('express');
var cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.pathRoutes = {
            auth: '/api/auth',
            publicaciones: '/api/publicaciones',
            comentarios: '/api/comentarios'
        }

        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();
    }

    middlewares(){

        this.app.use(cors());

        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.pathRoutes.comentarios, require('../routes/comentarios.routes'));
        this.app.use(this.pathRoutes.auth, require('../routes/auth.routes'));
        this.app.use(this.pathRoutes.publicaciones, require('../routes/publicaciones.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        });
    }
    
}

module.exports = Server;