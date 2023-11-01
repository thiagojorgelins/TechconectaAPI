const express = require('express');
const comentariosController = require('../controllers/comentariosController');
const router = express.Router();

router.get("/comentarios", comentariosController.exibirTodosComentarios);
router.post("/comentarios", comentariosController.criarComentario);
router.get("/comentarios/:PostId", comentariosController.exibirComentarios);
router.put("/comentarios/:id", comentariosController.editarComentario);
router.delete("/comentarios/:id", comentariosController.deletarComentario);

module.exports = router;
