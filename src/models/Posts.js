const db = require('./db')

const Posts = db.sequelize.define('Posts', {
    id: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    categoria: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    titulo: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    subtitulo: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    conteudo: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    usuario_id: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },
    post_image: {
        type: db.Sequelize.STRING
    }
})

Posts.sync()
module.exports = Posts