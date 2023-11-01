const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})

sequelize.authenticate().then(function(){
	console.log(`Banco de dados conectado: ${process.env.DB_NAME}`)
}).catch(function(erro){
	console.log("Erro ao conectar: "+erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}