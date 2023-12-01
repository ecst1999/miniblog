const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/config');

const Usuario = sequelize.define("usuarios", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

const Publicacione = sequelize.define("publicaciones", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha_publicacion: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

});

const Comentario = sequelize.define("comentarios", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha_publicacion: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

Usuario.hasMany(Publicacione);
Usuario.hasMany(Comentario);

Publicacione.hasMany(Comentario);

sequelize.sync();


module.exports = {
    Usuario,
    Publicacione,
    Comentario
}