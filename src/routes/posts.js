const express = require('express')
const postsController = require('../controllers/postsController')
const router = express.Router()
const validarToken = require('../middlewares/auth')
const upload = require('../middlewares/uploads')

router.post("/posts", validarToken, upload.single('post_image'), postsController.criarPost)
router.get("/posts", postsController.exibirTodosPosts)
router.get("/posts/:id", postsController.exibirPost)
router.put("/posts/:id", postsController.editarPost)
router.delete("/posts/:id", postsController.deletarPost)
module.exports = router