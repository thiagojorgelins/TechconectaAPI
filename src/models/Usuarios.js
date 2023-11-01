const db = require('./db')

const Usuario = db.sequelize.define('Usuario', {
    id: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull: false
    }

})

Usuario.sync()
module.exports = Usuario