const express = require('express')
const usuarioController = require('../controllers/usuarioController')
const router = express.Router()
const validarToken = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.send('Página Inicial')
})
router.post("/login", usuarioController.login)
router.get("/users", usuarioController.buscarUsuarios)
router.get("/users/posts/:id", usuarioController.exibirPostsUsuario)
router.post("/users", usuarioController.cadastrarUsuario)
router.get("/users/:id", usuarioController.buscarUsuarioPeloID)
router.put("/users/:id", usuarioController.atualizarUsuario)
router.delete("/users/:id", usuarioController.removerUsuario)

module.exports = router