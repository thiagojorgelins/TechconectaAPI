const Comentarios = require('../models/Comentarios')

const exibirTodosComentarios = async (req, res) => {
    try {
        const comentarios = await Comentarios.findAll();
        res.status(200).json(comentarios);
    } catch (erro) {
        res.status(500).json({ erro: "Ocorreu um erro interno." });
    }
}

const criarComentario = async (req, res) => {
    try {
        const { comentario, UsuarioId, PostId } = req.body;
        const novoComentario = await Comentarios.create({
            comentario,
            PostId,
            UsuarioId
        });
        res.status(201).json(novoComentario);
    } catch (error) {
        console.error("Erro ao criar um comentário:", error);
        res.status(500).json({ error: "Ocorreu um erro interno." });
    }
}

const exibirComentarios = async (req, res) => {
    const PostId = req.params.PostId;
    try {
        const comentarios = await Comentarios.findAll({
            where: {
                PostId
            }
        });
        res.json(comentarios);
    } catch (erro) {
        res.status(500).json({ erro: "Ocorreu um erro interno." });
    }
}

const deletarComentario = async (req, res) => {
    const id = req.params.id;
    try {
        await Comentarios.destroy({
            where: {
                id
            }
        });
        const comentariosRestantes = await Comentarios.findAll();
        res.json(comentariosRestantes);
    } catch (erro) {
        res.status(500).json({ erro: "Ocorreu um erro interno." });
    }
}


const editarComentario = async (req, res) => {
    const { comentario } = req.body;
    try {
        const comment = await Comentarios.findByPk(req.params.id)
        if (!comment){
            return res.status(404).json({ erro: 'Comentário não encontrado.'})
        }
        await comment.update({
            comentario: comentario,
        })
        res.status(200).json(comment)
    } catch (erro) {
        res.status(500).json({ msg: "Erro ao atualizar o comentário." });
    }
}

module.exports = {
    exibirTodosComentarios,
    criarComentario,
    exibirComentarios,
    editarComentario,
    deletarComentario
}