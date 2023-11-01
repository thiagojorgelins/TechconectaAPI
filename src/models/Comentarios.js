const db = require('./db')
const Posts = require('./Posts')
const Comentarios = db.sequelize.define('Comentarios', {
    id: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    comentario: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    PostId: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },
    UsuarioId: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    }
})

Posts.hasMany(Comentarios)
Comentarios.belongsTo(Posts)
Comentarios.sync()
module.exports = Comentarios